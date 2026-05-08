import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const dreamer = localFont({
  src: "../public/fonts/DreamerTM-Regular.woff2",
  variable: "--font-dreamer",
  display: "swap",
});
const easvhs = localFont({
  src: "../public/fonts/eas-vhs.woff2",
  variable: "--font-easvhs",
  display: "swap",
});
const retrobyte = localFont({
  src: "../public/fonts/RetroByte.woff2",
  variable: "--font-retrobyte",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michelle Aye | Creative Portfolio",
  description:
    "A portfolio displaying Michelle's information, her previous projects and experience as a full-stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dreamer.variable} ${easvhs.variable} ${retrobyte.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
