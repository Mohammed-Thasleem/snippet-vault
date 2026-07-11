"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code as Code2,
  LayoutDashboard,
  Heart,
  Globe,
  LogOut,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { colorValues, gradients } from "@/lib/design-tokens";

interface SidebarProps {
  user?: any;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "Public Snippets", href: "/dashboard/public", icon: Globe },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <aside
      className="w-64 border-r h-screen sticky top-0 flex flex-col"
      style={{
        backgroundColor: colorValues.surface.base,
        borderColor: colorValues.border.subtle,
      }}
    >
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: colorValues.border.subtle }}
      >
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: gradients.primary }}
          >
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1
              className="text-lg font-bold transition-colors duration-200"
              style={{ color: colorValues.text.primary }}
            >
              Snippet Vault
            </h1>
            <p className="text-xs" style={{ color: colorValues.text.tertiary }}>
              Code Manager
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: isActive
                  ? colorValues.accent.primary
                  : "transparent",
                color: isActive
                  ? colorValues.text["inverse-2"]
                  : colorValues.text.secondary,
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {user && (
        <div
          className="p-4 border-t"
          style={{ borderColor: colorValues.border.subtle }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{ backgroundColor: colorValues.surface.elevated }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: gradients.primary }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: colorValues.text.primary }}
              >
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{ color: colorValues.text.secondary }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      )}
    </aside>
  );
}
