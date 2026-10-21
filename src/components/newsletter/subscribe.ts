// src/pages/api/newsletter/subscribe.ts
import type { APIRoute } from 'astro';

// For handling OPTIONS (CORS preflight)
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, categorySlug } = data;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ message: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ==========================================
    // UNGAL BACKEND LOGIC INGA EZHUTHUNGA
    // (Sanity, Mailchimp, Database, etc.)
    // ==========================================
    console.log('Received subscription for:', email);

    // Simulate success response
    return new Response(
      JSON.stringify({ message: 'Successfully subscribed!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};