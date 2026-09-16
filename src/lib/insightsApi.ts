// TechSteps MediaHub Insights API Client
const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_MEDIAHUB_API_URL) ||
  process.env.PUBLIC_MEDIAHUB_API_URL ||
  "https://mediahub-backend-docker-hgh6hzgacraqbhb2.southindia-01.azurewebsites.net";

const COMPANY_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_COMPANY_ID) ||
  process.env.PUBLIC_COMPANY_ID ||
  "TS-381008";

const API_PREFIX = "/api";

export interface PostBlock {
  type: string;
  data: {
    value?: string;
    items?: string[];
    alt?: string;
    caption?: string;
    file_id?: string;
    url?: string;
    title?: string;
  };
}

export interface TransformedPost {
  id: string;
  slug: string;
  seoSlug: string;
  title: string;
  subtitle: string;
  section: {
    name: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  excerpt: string;
  image: string | null;
  content: string;
  date: string;
  author: string;
  readTime: number;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  rawBlocks?: PostBlock[];
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractPostId(param: string): string {
  if (!param) return param;
  if (param.includes("-")) {
    const parts = param.split("-");
    const last = parts[parts.length - 1];
    if (/^[a-f0-9]{24}$/i.test(last)) {
      return last;
    }
  }
  return param;
}

export function getPostSlug(post: any): string {
  if (!post) return "";
  const titleSlugRaw = slugify(post.title || "");
  const catSlug = post.category?.slug || "";
  const maxTitleLen = Math.max(15, 45 - (catSlug ? catSlug.length : 15));
  let titleSlug = titleSlugRaw;
  if (titleSlugRaw.length > maxTitleLen) {
    titleSlug = titleSlugRaw.substring(0, maxTitleLen);
    const lastHyphen = titleSlug.lastIndexOf("-");
    if (lastHyphen > 8) {
      titleSlug = titleSlug.substring(0, lastHyphen);
    }
  }
  return titleSlug ? `${titleSlug}-${post.id}` : post.id;
}

export function isPublishedPost(item: any): boolean {
  if (!item) return false;
  const status = (item.status || "published").toLowerCase();
  if (status !== "published") return false;
  if (item.is_deleted === true || status === "deleted" || status === "archived" || status === "draft") {
    return false;
  }
  return true;
}

const globalServerCache = new Map<string, { data: any; timestamp: number }>();
const globalPendingRequests = new Map<string, Promise<any>>();
const SERVER_CACHE_TTL = 60 * 1000; // 60 seconds TTL

class InsightsApiService {
  private baseUrl: string;
  private companyId: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private pendingRequests: Map<string, Promise<any>>;

  constructor() {
    this.baseUrl = API_BASE_URL.replace(/\/$/, "");
    this.companyId = COMPANY_ID;
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  isPublishedPost(item: any): boolean {
    return isPublishedPost(item);
  }

  getImageUrl(fileId?: string): string {
    if (!fileId) return "";
    return `${this.baseUrl}${API_PREFIX}/images/${fileId}`;
  }

  getDocumentUrl(fileId?: string, fallbackUrl?: string): string {
    if (fileId) return `${this.baseUrl}${API_PREFIX}/documents/${fileId}`;
    return fallbackUrl || "";
  }

  async fetchApi(endpoint: string, options: any = {}) {
    const url = `${this.baseUrl}${API_PREFIX}${endpoint}`;
    const method = (options.method || "GET").toUpperCase();
    const isGet = method === "GET";
    const cacheKey = `${url}:${method}:${JSON.stringify(options.body || "")}`;

    if (isGet) {
      // 1. In-memory global cache
      const cachedItem = globalServerCache.get(cacheKey);
      if (cachedItem && Date.now() - cachedItem.timestamp < SERVER_CACHE_TTL) {
        return cachedItem.data;
      }

      // 2. Instance cache
      const instCache = this.cache.get(cacheKey);
      if (instCache && Date.now() - instCache.timestamp < SERVER_CACHE_TTL) {
        return instCache.data;
      }

      // 3. Dedupe in-flight
      if (globalPendingRequests.has(cacheKey)) {
        return globalPendingRequests.get(cacheKey);
      }
      if (this.pendingRequests.has(cacheKey)) {
        return this.pendingRequests.get(cacheKey);
      }
    }

    const requestPromise = fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || `API error: ${response.status}`);
        }

        const data = await response.json();
        if (isGet) {
          const entry = { data, timestamp: Date.now() };
          globalServerCache.set(cacheKey, entry);
          this.cache.set(cacheKey, entry);
          globalPendingRequests.delete(cacheKey);
          this.pendingRequests.delete(cacheKey);
        }

        return data;
      })
      .catch((err) => {
        if (isGet) {
          globalPendingRequests.delete(cacheKey);
          this.pendingRequests.delete(cacheKey);
        }
        if (options.throwError) throw err;
        return null;
      });

    if (isGet) {
      globalPendingRequests.set(cacheKey, requestPromise);
      this.pendingRequests.set(cacheKey, requestPromise);
    }
    return requestPromise;
  }

  async getSections() {
    return this.fetchApi(`/public/${this.companyId}/sections`);
  }

  async getCategories(sectionSlug: string) {
    return this.fetchApi(
      `/public/${this.companyId}/categories?section_slug=${sectionSlug}`
    );
  }

  async getContent(params: any = {}) {
    const queryParams = new URLSearchParams({
      skip: (params.skip || 0).toString(),
      limit: (params.limit || 20).toString(),
      ...(params.section_slug && { section_slug: params.section_slug }),
      ...(params.category_slug && { category_slug: params.category_slug }),
    }).toString();

    return this.fetchApi(`/public/${this.companyId}/content?${queryParams}`);
  }

  async getContentById(contentId: string) {
    return this.fetchApi(`/public/content/${contentId}`);
  }

  async subscribe(email: string, sections: string[] = [], categories: string[] = []) {
    return this.fetchApi(`/public/subscribe`, {
      method: "POST",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        company_id: this.companyId,
        sections,
        categories,
      }),
      throwError: true,
    });
  }

  async getSubscriberPreferences(email: string) {
    return this.fetchApi(
      `/public/subscriber-preferences?email=${encodeURIComponent(email.trim().toLowerCase())}&company_id=${this.companyId}`,
    );
  }

  async registerLike(postId: string): Promise<{ success: boolean; liked?: boolean; likes?: number }> {
    const url = `${this.baseUrl}${API_PREFIX}/public/content/${postId}/like`;
    try {
      const res = await fetch(url, { method: "POST" });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return {
          success: true,
          liked: data.liked,
          likes: typeof data.likes === "number" ? data.likes : undefined,
        };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  }

  async getAllPosts(limit = 100): Promise<TransformedPost[]> {
    try {
      let allPosts: TransformedPost[] = [];
      let skip = 0;
      const pageSize = 50;
      let hasMore = true;

      while (hasMore && allPosts.length < limit) {
        const queryLimit = Math.min(pageSize, limit - allPosts.length);
        const contentRes = await this.getContent({
          skip,
          limit: queryLimit,
        });

        if (!contentRes || !contentRes.items || contentRes.items.length === 0) {
          hasMore = false;
          break;
        }

        const validItems = contentRes.items.filter(isPublishedPost);
        const posts = validItems.map((item: any) => this.transformContent(item));
        allPosts = allPosts.concat(posts);

        if (contentRes.items.length < queryLimit) {
          hasMore = false;
        } else {
          skip += pageSize;
        }
      }

      return allPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    } catch (err) {
      console.error("Error fetching all posts for TechSteps:", err);
      return [];
    }
  }

  async getSectionPosts(sectionSlug: string, limit = 100): Promise<TransformedPost[]> {
    try {
      const response = await this.getContent({ section_slug: sectionSlug, limit });
      if (!response || !response.items) return [];

      const validItems = response.items.filter(isPublishedPost);
      const posts = validItems.map((item: any) =>
        this.transformContent(item, { slug: sectionSlug })
      );
      return posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    } catch (err) {
      console.error(`Error fetching section posts for ${sectionSlug}:`, err);
      return [];
    }
  }

  async getFullSiteStructure() {
    try {
      const sectionsRes = await this.getSections();
      if (!sectionsRes || !sectionsRes.sections) return [];
      const sections = sectionsRes.sections || [];

      const result = await Promise.all(
        sections.map(async (section: any) => {
          try {
            const categoriesRes = await this.getCategories(section.slug);
            const categories = categoriesRes?.categories || [];

            const categoryData = await Promise.all(
              categories.map(async (category: any) => {
                try {
                  const contentRes = await this.getContent({
                    section_slug: section.slug,
                    category_slug: category.slug,
                    limit: 10,
                  });

                  const validItems = (contentRes?.items || []).filter(isPublishedPost);
                  const posts = validItems.map((item: any) =>
                    this.transformContent(item, section, category)
                  );

                  return {
                    ...category,
                    section_slug: section.slug,
                    posts,
                  };
                } catch {
                  return { ...category, section_slug: section.slug, posts: [] };
                }
              })
            );

            return { ...section, categories: categoryData };
          } catch {
            return { ...section, categories: [] };
          }
        })
      );

      return result;
    } catch (err) {
      console.error("Error fetching site structure for TechSteps:", err);
      return [];
    }
  }

  transformContent(backendContent: any, section: any = null, category: any = null): TransformedPost {
    const renderedContent = this.renderBlocks(backendContent.blocks);
    const words = (renderedContent || "").trim().split(/\s+/).filter(Boolean).length;

    let computedReadTime = 4;
    if (
      backendContent.stats?.read_time &&
      typeof backendContent.stats.read_time === "number" &&
      backendContent.stats.read_time > 0
    ) {
      computedReadTime = backendContent.stats.read_time;
    } else if (words > 0) {
      computedReadTime = Math.max(1, Math.ceil(words / 200));
    } else if (backendContent.subtitle) {
      const subWords = backendContent.subtitle.trim().split(/\s+/).filter(Boolean).length;
      computedReadTime = Math.max(2, Math.ceil(subWords / 25));
    }

    let formattedDate = "";
    try {
      const dateVal = backendContent.published_at || backendContent.created_at;
      const d = new Date(dateVal);
      if (dateVal && !isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      } else {
        formattedDate = new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    } catch {
      formattedDate = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    const sectionName =
      section?.name || backendContent.section?.name || backendContent.section_name || "Insights";
    const sectionSlug =
      section?.slug || backendContent.section?.slug || backendContent.section_slug || "insights-knowledge";

    const categoryName =
      category?.name || backendContent.category?.name || backendContent.category_name || "Blogs";
    const categorySlug =
      category?.slug || backendContent.category?.slug || backendContent.category_slug || "blogs";

    const postObj = {
      id: backendContent.id,
      title: backendContent.title,
      category: { slug: categorySlug },
    };
    const seoSlug = getPostSlug(postObj);

    return {
      id: backendContent.id,
      slug: backendContent.slug || seoSlug,
      seoSlug,
      title: backendContent.title,
      subtitle: backendContent.subtitle || "",
      section: {
        name: sectionName,
        slug: sectionSlug,
      },
      category: {
        name: categoryName,
        slug: categorySlug,
      },
      excerpt: backendContent.subtitle || this.extractExcerpt(backendContent.blocks),
      image: backendContent.cover_image_id
        ? this.getImageUrl(backendContent.cover_image_id)
        : null,
      content: renderedContent,
      date: formattedDate,
      author: backendContent.author?.name || "TechSteps Compliance Desk",
      readTime: computedReadTime,
      tags: backendContent.tags || [],
      views: backendContent.stats?.views || 0,
      likes: backendContent.like_count ?? backendContent.stats?.likes ?? 0,
      comments: backendContent.stats?.comments || 0,
      featured: backendContent.settings?.is_featured || false,
      rawBlocks: backendContent.blocks || [],
    };
  }

  extractExcerpt(blocks: any[]): string {
    if (!blocks || blocks.length === 0) return "";
    const textBlock = blocks.find((b: any) =>
      ["text", "heading", "subheading"].includes(b.type)
    );

    if (textBlock?.data?.value) {
      const text = textBlock.data.value.replace(/[#*`]/g, "").trim();
      return text.length > 150 ? text.substring(0, 150) + "..." : text;
    }

    return "Explore our latest technical guidance and regulatory frameworks...";
  }

  renderBlocks(blocks: any[]): string {
    if (!blocks || blocks.length === 0) return "";

    return blocks
      .map((block: any) => {
        switch (block.type) {
          case "heading":
            return `## ${block.data.value}`;
          case "subheading":
            return `### ${block.data.value}`;
          case "text":
            return block.data.value;
          case "quote":
            return `> ${block.data.value}`;
          case "list":
          case "bullet-list":
            return block.data.items?.map((item: string) => `- ${item}`).join("\n");
          case "numbered-list":
            return block.data.items
              ?.map((item: string, i: number) => `${i + 1}. ${item}`)
              .join("\n");
          case "image":
            return `![${block.data.alt || "image"}](${this.getImageUrl(block.data.file_id)})`;
          case "video":
          case "embed":
            return block.data.url;
          case "document": {
            const docUrl = this.getDocumentUrl(block.data.file_id, block.data.url);
            return `[📁 Download ${block.data.title || "Document"}](${docUrl})`;
          }
          default:
            return "";
        }
      })
      .join("\n\n");
  }
}

export const insightsApi = new InsightsApiService();
export default insightsApi;
