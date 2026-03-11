"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Assistant", href: "/dashboard/ai-assistant" },
  { label: "Community", href: "/dashboard/community" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white" data-testid="nav-dashboard">
        <div className="flex items-center gap-6 px-8 py-4">
          <span className="text-lg font-bold" data-testid="text-nav-brand">
            Skillonize Network
          </span>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-sm px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-gray-100 font-semibold text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
