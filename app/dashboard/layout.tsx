"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/components/sidebar";
import { colorValues } from "@/lib/design-tokens";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/");
        return;
      }
      setUser(data.session.user);
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/");
        } else {
          setUser(session.user);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colorValues.background.primary }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colorValues.accent.primary }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: colorValues.background.primary }}
    >
      <Sidebar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
