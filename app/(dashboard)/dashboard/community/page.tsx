'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Community() {

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts);
    };

    loadPosts();
  }, []);

  const handlePost = async () => {

    const { data: { user } } = await supabase!.auth.getUser()

    if (!user) {
      alert("User not logged in")
      return
    }

    const { data: profile } = await supabase!
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single()

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: text,
        user_id: user.id,
        name: profile?.full_name
      })
    })

    if (!res.ok) {
      alert("Post failed")
      return
    }

    const updated = await fetch("/api/posts")
    const data = await updated.json()

    setPosts(data.posts)
    setText("")
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Community</h1>

      <textarea
        placeholder="Share an idea with other educators..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button
        onClick={handlePost}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-200 shadow-sm"
      >
        Post
      </button>

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded mb-3">
            <p className="font-semibold">{post.name || "Educator"}</p>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
