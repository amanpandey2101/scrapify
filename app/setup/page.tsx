// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function SetupPage() {
  // Lazy load the billing actions
  const { setupUser } = await import("@/actions/billings");
  return await setupUser();
}

export default SetupPage;
