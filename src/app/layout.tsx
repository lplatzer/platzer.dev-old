import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/app/components/navigation";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "platzer.dev",
  description: "Coffee, Software and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <AuthKitProvider>
      <Navigation/>
      <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
          </div>
      </main>
    </AuthKitProvider>
    </body>
    </html>
  );
}
