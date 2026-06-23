import type { Metadata } from "next";
import { Plus_Jakarta_Sans, ZCOOL_QingKe_HuangYou } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const zcool = ZCOOL_QingKe_HuangYou({
  variable: "--font-zcool",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warren Fu",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${zcool.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
