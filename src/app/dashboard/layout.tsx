"use client"; // Ensure it's a Client Component

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <h1>Dashboard Header</h1>
      {children}
    </div>
  );
}
