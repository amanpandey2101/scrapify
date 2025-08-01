import { setupUser } from "@/actions/billings";

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

async function SetupPage() {
  return await setupUser();
}

export default SetupPage;
