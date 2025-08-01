// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

async function SetupPage() {
  // Lazy load the billing actions
  const { setupUser } = await import("@/actions/billings");
  return await setupUser();
}

export default SetupPage;
