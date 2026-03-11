"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (!supabase) {
        router.push("/login");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!profile) {
        router.push("/complete-profile");
      } else {
        setLoading(false);
      }
    };

    checkProfile();
  }, [router]);

  if (loading) return <div className="p-8" data-testid="text-loading">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">
        Welcome to Skillonize Network 🚀
      </h1>
      <p className="mt-4" data-testid="text-profile-status">Your profile is complete.</p>
    </div>
  );
}
