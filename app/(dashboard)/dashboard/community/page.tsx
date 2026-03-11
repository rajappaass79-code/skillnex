"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Community() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
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

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) return <div className="p-8" data-testid="text-loading">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold" data-testid="text-community-title">
        Community
      </h1>
      <p className="mt-4" data-testid="text-community-description">
        Connect with fellow educators, share resources, and grow together.
      </p>
    </div>
  );
}
