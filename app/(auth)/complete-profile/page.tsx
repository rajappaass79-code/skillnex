"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    institution: "",
    subject: "",
    experience_years: "",
    location: "",
    bio: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabase) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { error } = await supabase.from("profiles").insert([
      {
        id: session.user.id,
        ...form,
        experience_years: Number(form.experience_years),
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg"
        data-testid="form-complete-profile"
      >
        <h1
          className="text-2xl font-bold mb-6 text-center"
          data-testid="text-profile-title"
        >
          Complete Your Profile
        </h1>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key.replace("_", " ").toUpperCase()}
            className="w-full mb-4 p-3 border rounded-lg"
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            data-testid={`input-${key}`}
          />
        ))}

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600"
          data-testid="button-save-profile"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
