import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow scrape",
  description: "Build your own flow and scrape data with ease",
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignInUrl={`${process.env.NEXT_PUBLIC_APP_URL}/home`}
      afterSignUpUrl={`${process.env.NEXT_PUBLIC_APP_URL}/home`}
      afterSignOutUrl={`${process.env.NEXT_PUBLIC_APP_URL}/sign-in`}
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-sm !shadow-none",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <AppProviders>{children}</AppProviders>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
