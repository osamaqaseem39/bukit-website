import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bukit — Multi‑Tenant Venue & Facility Management",
  description:
    "Bukit is a multi‑tenant platform for managing venues, facilities, and bookings, built for platform operators, business clients, and end users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

