/**
 * TechSteps Unified Navigation Dropdown Controller
 * 
 * Manages all 4 header mega menus:
 * 1. Free Collection (free-collection)
 * 2. Services (services)
 * 3. Sectors (sectors)
 * 4. About Us (about)
 * 
 * Features:
 * - Rock-solid hover: smooth open with grace delay (280ms) and invisible hover bridge
 * - Proper click toggle: click to open when closed, click to close when open (with anti-bounce)
 * - Click outside to close: immediately closes any open dropdown
 * - Seamless inter-menu switching: instantly transitions between dropdowns
 * - Escape key & link click auto-close
 * - Dynamic positioning: adapts between HeroHeader (top) and floating Header (scrolled)
 * - Full Astro ClientRouter (View Transitions) compatibility with zero memory leaks
 */

interface MenuConfig {
  id: string;
  triggerSelector: string;
  panelId: string;
  wrapperId: string;
  cardId: string;
}

const MENUS: MenuConfig[] = [
  {
    id: 'free-collection',
    triggerSelector: '.free-collection-megamenu-toggle, #free-collection-menu-trigger',
    panelId: 'free-collection-megamenu-panel',
    wrapperId: 'free-collection-megamenu-wrapper',
    cardId: 'free-collection-megamenu-card',
  },
  {
    id: 'services',
    triggerSelector: '.services-megamenu-toggle, #services-menu-trigger',
    panelId: 'services-megamenu-panel',
    wrapperId: 'services-megamenu-wrapper',
    cardId: 'services-megamenu-card',
  },
  {
    id: 'sectors',
    triggerSelector: '.sectors-dropdown-toggle, #sectors-menu-trigger',
    panelId: 'sectors-dropdown-panel',
    wrapperId: 'sectors-dropdown-wrapper',
    cardId: 'sectors-dropdown-card',
  },
  {
    id: 'about',
    triggerSelector: '.about-megamenu-toggle, .about-dropdown-toggle, #about-menu-trigger',
    panelId: 'about-megamenu-panel',
    wrapperId: 'about-megamenu-wrapper',
    cardId: 'about-megamenu-card',
  },
];

let activeMenuId: string | null = null;
let openedAt: number = 0;
let openedBy: 'hover' | 'click' | null = null;
let closeTimer: ReturnType<typeof setTimeout> | null = null;
const hideTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();

interface GlobalNavState {
  docClickHandler?: (e: MouseEvent) => void;
  docKeyHandler?: (e: KeyboardEvent) => void;
  winResizeHandler?: () => void;
  winScrollHandler?: () => void;
  backdropClickHandler?: () => void;
  triggerCleanups?: Array<() => void>;
  panelCleanups?: Array<() => void>;
}

declare global {
  interface Window {
    __techstepsNavState?: GlobalNavState;
  }
}

function cancelClose() {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
}

function scheduleClose(delay = 280) {
  cancelClose();
  closeTimer = setTimeout(() => {
    closeMenu(false);
  }, delay);
}

function updatePositionForMenu(menuId: string) {
  const menu = MENUS.find((m) => m.id === menuId);
  if (!menu) return;

  const panel = document.getElementById(menu.panelId);
  const card = document.getElementById(menu.cardId);
  const wrapper = document.getElementById(menu.wrapperId);
  if (!panel) return;

  const siteHeader = document.getElementById('site-header');
  const heroHeader = document.getElementById('hero-header');

  const isScrollNavActive =
    !!siteHeader &&
    !siteHeader.classList.contains('opacity-0') &&
    !siteHeader.classList.contains('-translate-y-full');

  if (isScrollNavActive && siteHeader) {
    if (card) {
      card.classList.add('scroll-glass-active');
      card.style.setProperty('background', 'rgba(250, 246, 238, 0.60)', 'important');
      card.style.setProperty('background-color', 'rgba(250, 246, 238, 0.60)', 'important');
      card.style.setProperty('-webkit-backdrop-filter', 'blur(12px)', 'important');
      card.style.setProperty('backdrop-filter', 'blur(12px)', 'important');
      card.style.setProperty('border', '1px solid rgba(0, 0, 0, 0.10)', 'important');
      card.style.setProperty('box-shadow', '0 16px 40px -10px rgba(0, 0, 0, 0.08)', 'important');
    }

    const maxWrap = siteHeader.querySelector<HTMLElement>(':scope > div');
    const floatingBar = maxWrap?.querySelector<HTMLElement>(':scope > div');
    const ref = floatingBar ?? siteHeader;
    const rect = ref.getBoundingClientRect();

    if (wrapper) {
      wrapper.classList.add('scroll-dropdown-wrapper');
      wrapper.style.paddingLeft = '0px';
      wrapper.style.paddingRight = '0px';
      wrapper.style.maxWidth = `${Math.round(rect.width)}px`;
      wrapper.style.width = `${Math.round(rect.width)}px`;
    }

    panel.style.top = `${Math.round(rect.bottom + 6)}px`;
    panel.style.left = `${Math.round(rect.left)}px`;
    panel.style.right = 'auto';
    panel.style.width = `${Math.round(rect.width)}px`;

    if (card) {
      card.style.width = `${Math.round(rect.width)}px`;
      card.style.maxWidth = `${Math.round(rect.width)}px`;
    }
  } else if (heroHeader) {
    if (card) {
      card.classList.remove('scroll-glass-active');
      card.style.removeProperty('background');
      card.style.removeProperty('background-color');
      card.style.removeProperty('-webkit-backdrop-filter');
      card.style.removeProperty('backdrop-filter');
      card.style.removeProperty('border');
      card.style.removeProperty('box-shadow');
      card.style.width = '';
      card.style.maxWidth = '';
    }

    if (wrapper) {
      wrapper.classList.remove('scroll-dropdown-wrapper');
      wrapper.style.paddingLeft = '';
      wrapper.style.paddingRight = '';
      wrapper.style.maxWidth = '';
      wrapper.style.width = '';
    }

    const rect = heroHeader.getBoundingClientRect();
    panel.style.top = `${Math.round(rect.bottom + 6)}px`;
    panel.style.left = '';
    panel.style.right = '';
    panel.style.width = '';
  }
}

function updateBackdrop() {
  const backdrop = document.getElementById('dropdown-backdrop');
  if (!backdrop) return;

  if (activeMenuId) {
    const heroHeader = document.getElementById('hero-header');
    const scrolledHeader = document.getElementById('site-header');
    const scrolledHeaderActive = scrolledHeader && !scrolledHeader.classList.contains('-translate-y-full');

    if (scrolledHeaderActive && scrolledHeader) {
      const floatingBar = scrolledHeader.querySelector('.max-w-\\[1240px\\]') || scrolledHeader;
      const rect = floatingBar.getBoundingClientRect();
      const topOffset = Math.max(0, Math.round(rect.bottom));
      backdrop.style.top = `${topOffset}px`;
    } else if (heroHeader) {
      const rect = heroHeader.getBoundingClientRect();
      const topOffset = Math.max(0, Math.round(rect.bottom));
      backdrop.style.top = `${topOffset}px`;
    } else {
      backdrop.style.top = '0px';
    }

    backdrop.classList.add('active');
  } else {
    backdrop.classList.remove('active');
    backdrop.style.top = '';
  }
}

function closeImmediate(menuId: string) {
  const menu = MENUS.find((m) => m.id === menuId);
  if (!menu) return;

  const panel = document.getElementById(menu.panelId);
  if (panel) {
    panel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    panel.classList.add('opacity-0', '-translate-y-1', 'pointer-events-none', 'hidden');
  }

  const triggers = document.querySelectorAll<HTMLElement>(menu.triggerSelector);
  triggers.forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'false');
    if (trigger.getAttribute('data-route-active') !== 'true') {
      trigger.classList.remove('active');
    }
  });

  const pending = hideTimers.get(menuId);
  if (pending) {
    clearTimeout(pending);
    hideTimers.delete(menuId);
  }
}

export function openMenu(menuId: string, triggerType: 'hover' | 'click' = 'hover') {
  cancelClose();

  // If another menu is currently open, close it instantly without delay
  if (activeMenuId && activeMenuId !== menuId) {
    closeImmediate(activeMenuId);
  }

  const menu = MENUS.find((m) => m.id === menuId);
  if (!menu) return;

  const panel = document.getElementById(menu.panelId);
  if (!panel) return;

  // Clear any pending fade-out timer
  const pendingHide = hideTimers.get(menuId);
  if (pendingHide) {
    clearTimeout(pendingHide);
    hideTimers.delete(menuId);
  }

  activeMenuId = menuId;
  openedAt = Date.now();
  openedBy = triggerType;

  // Update position based on current active header
  updatePositionForMenu(menuId);

  // Show panel smoothly
  panel.classList.remove('hidden');
  void panel.offsetHeight; // Force reflow

  panel.classList.remove('opacity-0', '-translate-y-1', 'pointer-events-none');
  panel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');

  // Update triggers
  const triggers = document.querySelectorAll<HTMLElement>(menu.triggerSelector);
  triggers.forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('active');
  });

  // Activate backdrop
  updateBackdrop();
}

export function closeMenu(immediate = false) {
  cancelClose();

  if (!activeMenuId) return;

  const currentId = activeMenuId;
  activeMenuId = null;
  openedBy = null;

  const menu = MENUS.find((m) => m.id === currentId);
  if (!menu) return;

  const panel = document.getElementById(menu.panelId);
  const triggers = document.querySelectorAll<HTMLElement>(menu.triggerSelector);

  // Reset triggers
  triggers.forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'false');
    if (trigger.getAttribute('data-route-active') !== 'true') {
      trigger.classList.remove('active');
    }
  });

  // Deactivate backdrop
  updateBackdrop();

  if (panel) {
    panel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    panel.classList.add('opacity-0', '-translate-y-1', 'pointer-events-none');

    if (immediate) {
      panel.classList.add('hidden');
    } else {
      const timer = setTimeout(() => {
        if (panel.classList.contains('opacity-0')) {
          panel.classList.add('hidden');
        }
        hideTimers.delete(currentId);
      }, 160);
      hideTimers.set(currentId, timer);
    }
  }
}

function handleTriggerClick(event: MouseEvent, menuId: string) {
  event.preventDefault();
  event.stopPropagation();

  // If this menu is currently open:
  if (activeMenuId === menuId) {
    const elapsed = Date.now() - openedAt;
    // Anti-bounce: if the menu was just opened by hover within 350ms, the user's
    // mouse entered the trigger and clicked to interact. Keep it open!
    if (openedBy === 'hover' && elapsed < 350) {
      openedBy = 'click';
      return;
    }
    // If it was already open and stable, clicking toggles it closed!
    closeMenu(true);
  } else {
    // Menu is closed or another menu was open: open this menu!
    openMenu(menuId, 'click');
  }
}

/* =========================================================
   INTERNAL PANEL INTERACTIONS (Tabs & Links)
========================================================= */

function initServicesTabs(panel: HTMLElement) {
  const tabBtns = panel.querySelectorAll<HTMLElement>('.service-tab-btn');
  const tabPanels = panel.querySelectorAll<HTMLElement>('.service-tab-panel');
  const activeTitle = panel.querySelector<HTMLElement>('#active-pillar-title');

  const switchTab = (tabId: string, pillarTitle?: string) => {
    tabBtns.forEach((btn) => {
      const isTarget = btn.getAttribute('data-service-tab') === tabId;
      if (isTarget) {
        btn.classList.add('active-tab', 'bg-[#C3E8D5]', 'text-[#0F172A]', 'font-semibold');
        btn.classList.remove('text-[#1E293B]', 'hover:bg-[#E4EFE9]');
      } else {
        btn.classList.remove('active-tab', 'bg-[#C3E8D5]', 'text-[#0F172A]', 'font-semibold');
        btn.classList.add('text-[#1E293B]', 'hover:bg-[#E4EFE9]');
      }
    });

    if (activeTitle && pillarTitle) {
      activeTitle.textContent = pillarTitle.toUpperCase();
    }

    tabPanels.forEach((panelItem) => {
      if (panelItem.id === `tab-panel-${tabId}`) {
        panelItem.classList.remove('hidden');
        void panelItem.offsetHeight;
        panelItem.classList.remove('opacity-0');
        panelItem.classList.add('opacity-100');
      } else {
        panelItem.classList.add('hidden', 'opacity-0');
        panelItem.classList.remove('opacity-100');
      }
    });
  };

  tabBtns.forEach((btn) => {
    const tabId = btn.getAttribute('data-service-tab');
    const title = btn.getAttribute('data-pillar-title') || '';
    if (!tabId) return;

    btn.addEventListener('mouseenter', () => switchTab(tabId, title));
    btn.addEventListener('focus', () => switchTab(tabId, title));
  });
}

function initFreeCollectionLinks(panel: HTMLElement) {
  const collectionLinks = panel.querySelectorAll<HTMLElement>('.free-collection-link');
  collectionLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      collectionLinks.forEach((l) => {
        l.classList.remove('active-collection', 'bg-[#BCE6CE]', 'font-semibold');
      });
      link.classList.add('active-collection', 'bg-[#BCE6CE]', 'font-semibold');
    });
  });
}

function initSectorsLinks(panel: HTMLElement) {
  const sectorLinks = panel.querySelectorAll<HTMLElement>('.sectors-link');
  sectorLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      sectorLinks.forEach((l) => {
        l.classList.remove('active-sector', 'bg-[#BCE6CE]', 'font-semibold');
      });
      link.classList.add('active-sector', 'bg-[#BCE6CE]', 'font-semibold');
    });
  });
}

function initAboutLinks(panel: HTMLElement) {
  const aboutLinks = panel.querySelectorAll<HTMLElement>('.about-link');
  aboutLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      aboutLinks.forEach((l) => {
        l.classList.remove('active-about', 'bg-[#BCE6CE]', 'font-semibold');
      });
      link.classList.add('active-about', 'bg-[#BCE6CE]', 'font-semibold');
    });
  });
}

/* =========================================================
   INITIALIZATION & TEARDOWN
========================================================= */

export function initNavDropdowns() {
  // Teardown previous global listeners if present
  if (window.__techstepsNavState) {
    const state = window.__techstepsNavState;
    if (state.docClickHandler) {
      document.removeEventListener('click', state.docClickHandler);
    }
    if (state.docKeyHandler) {
      document.removeEventListener('keydown', state.docKeyHandler);
    }
    if (state.winResizeHandler) {
      window.removeEventListener('resize', state.winResizeHandler);
    }
    if (state.winScrollHandler) {
      window.removeEventListener('scroll', state.winScrollHandler);
    }
    if (state.backdropClickHandler) {
      document.getElementById('dropdown-backdrop')?.removeEventListener('click', state.backdropClickHandler);
    }
    state.triggerCleanups?.forEach((fn) => fn());
    state.panelCleanups?.forEach((fn) => fn());
  }

  // Close any open menu and reset backdrop
  cancelClose();
  MENUS.forEach((menu) => closeImmediate(menu.id));
  activeMenuId = null;
  openedBy = null;
  updateBackdrop();

  const triggerCleanups: Array<() => void> = [];
  const panelCleanups: Array<() => void> = [];

  // Setup each menu
  MENUS.forEach((menu) => {
    const triggers = document.querySelectorAll<HTMLElement>(menu.triggerSelector);
    const panel = document.getElementById(menu.panelId);
    if (!panel) return;

    // Ensure hover bridge exists inside panel for seamless cursor transit
    if (!panel.querySelector('.dropdown-hover-bridge')) {
      const bridge = document.createElement('div');
      bridge.className = 'dropdown-hover-bridge absolute -top-8 inset-x-0 h-10 pointer-events-auto';
      bridge.setAttribute('aria-hidden', 'true');
      panel.insertBefore(bridge, panel.firstChild);
    }

    // Attach trigger listeners
    triggers.forEach((trigger) => {
      const onMouseEnter = () => openMenu(menu.id, 'hover');
      const onMouseLeave = () => scheduleClose(280);
      const onFocus = () => openMenu(menu.id, 'hover');
      const onClick = (e: MouseEvent) => handleTriggerClick(e, menu.id);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Enter') {
          e.preventDefault();
          if (activeMenuId === menu.id) {
            closeMenu(true);
          } else {
            openMenu(menu.id, 'click');
          }
        }
      };

      trigger.addEventListener('mouseenter', onMouseEnter);
      trigger.addEventListener('mouseleave', onMouseLeave);
      trigger.addEventListener('focus', onFocus);
      trigger.addEventListener('click', onClick);
      trigger.addEventListener('keydown', onKeyDown);

      triggerCleanups.push(() => {
        trigger.removeEventListener('mouseenter', onMouseEnter);
        trigger.removeEventListener('mouseleave', onMouseLeave);
        trigger.removeEventListener('focus', onFocus);
        trigger.removeEventListener('click', onClick);
        trigger.removeEventListener('keydown', onKeyDown);
      });
    });

    // Attach panel listeners
    const onPanelMouseEnter = () => cancelClose();
    const onPanelMouseLeave = () => scheduleClose(280);

    panel.addEventListener('mouseenter', onPanelMouseEnter);
    panel.addEventListener('mouseleave', onPanelMouseLeave);

    panelCleanups.push(() => {
      panel.removeEventListener('mouseenter', onPanelMouseEnter);
      panel.removeEventListener('mouseleave', onPanelMouseLeave);
    });

    // Close when any link inside panel is clicked
    panel.querySelectorAll('a').forEach((link) => {
      const onLinkClick = () => closeMenu(true);
      link.addEventListener('click', onLinkClick);
      panelCleanups.push(() => link.removeEventListener('click', onLinkClick));
    });

    // Setup internal tab/hover logic
    if (menu.id === 'services') {
      initServicesTabs(panel);
    } else if (menu.id === 'free-collection') {
      initFreeCollectionLinks(panel);
    } else if (menu.id === 'sectors') {
      initSectorsLinks(panel);
    } else if (menu.id === 'about') {
      initAboutLinks(panel);
    }
  });

  // Global document click listener (outside click to close)
  const onDocumentClick = (event: MouseEvent) => {
    if (!activeMenuId) return;

    const target = event.target as Node;
    const currentMenu = MENUS.find((m) => m.id === activeMenuId);
    if (!currentMenu) return;

    const panel = document.getElementById(currentMenu.panelId);
    const triggers = document.querySelectorAll<HTMLElement>(currentMenu.triggerSelector);

    let insideTrigger = false;
    triggers.forEach((trigger) => {
      if (trigger.contains(target) || trigger === target) {
        insideTrigger = true;
      }
    });

    const insidePanel = panel ? panel.contains(target) || panel === target : false;

    // If click is outside both the active panel and its triggers, close immediately!
    if (!insidePanel && !insideTrigger) {
      closeMenu(true);
    }
  };
  document.addEventListener('click', onDocumentClick);

  // Global Escape key listener
  const onDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && activeMenuId) {
      closeMenu(true);
    }
  };
  document.addEventListener('keydown', onDocumentKeyDown);

  // Backdrop click listener
  const backdrop = document.getElementById('dropdown-backdrop');
  const onBackdropClick = () => closeMenu(true);
  backdrop?.addEventListener('click', onBackdropClick);

  // Window resize and scroll listeners
  const onWindowUpdate = () => {
    if (activeMenuId) {
      updatePositionForMenu(activeMenuId);
      updateBackdrop();
    }
  };
  window.addEventListener('resize', onWindowUpdate, { passive: true });
  window.addEventListener('scroll', onWindowUpdate, { passive: true });

  // Store handlers on window for clean teardown across page transitions
  window.__techstepsNavState = {
    docClickHandler: onDocumentClick,
    docKeyHandler: onDocumentKeyDown,
    winResizeHandler: onWindowUpdate,
    winScrollHandler: onWindowUpdate,
    backdropClickHandler: onBackdropClick,
    triggerCleanups,
    panelCleanups,
    initialized: true,
  };
}
