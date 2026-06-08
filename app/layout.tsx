import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waddle | The OS for Penguins Who Hustle",
  description:
    "Waddle is the all-in-one platform that helps colonies of penguins manage fish inventory, optimize huddle schedules, and slide into productivity. Built on ice, powered by attitude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
