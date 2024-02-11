import Layout from "@/components/providers/Layout";
import Providers from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import getServerAuth from "@/server/utils/getServerAuth";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeSync",
  description:
    "A real-time code collaboration platform for beginner software engineers!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getServerAuth();

  return (
    <html lang="en">
      <body className={cn(redHatDisplay.className, "min-h-screen")}>
        <Providers session={session}>
          <Layout session={session}>{children}</Layout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
