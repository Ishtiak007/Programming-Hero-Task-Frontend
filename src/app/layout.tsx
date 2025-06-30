import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import Providers from "../providers/Providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppinsClassName: string = poppins.className;

export const metadata: Metadata = {
  title: "Event Management",
  description: "Welcome to Event Management System",
  keywords: ["Event Management system"],
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  publisher: "Ishtiak's LTD",
  authors: [
    {
      name: "Ishtiak Ahmed",
      url: "https://www.facebook.com/ishtiakahmed01999",
    },
  ],
  creator: "Ishtiak Ahmed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsClassName}`}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
