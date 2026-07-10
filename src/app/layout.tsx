import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerald Obuseh | Software Engineer",
  description: "Portfolio website of Gerald Obuseh, Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
