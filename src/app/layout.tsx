import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";

import { cn } from "@/lib/utils/className";
import { Toaster } from "@/components/ui/toaster";


import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digido Airlines",
  description: "By L. Kh."
};

export const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={cn(nunito.variable, nunitoSans.variable)}>
      {children}
        <Toaster />
    </body>
  </html>
);

export default RootLayout;
