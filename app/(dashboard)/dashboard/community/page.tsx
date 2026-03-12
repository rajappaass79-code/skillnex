'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Community() {

  const [post, setPost] = useState("")
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    const res = await fetch("/api/posts")
    const data = await res.json()

    if (data.posts) {
      setPosts(data.posts)
    }
  }

  const handlePost = async () => {
    const { data: { user } } = await supabase!.auth.getUser()

    if (!user) {
      alert("Not logged in. Please log in first.")
      return
    }

    const { error } = await supabase!
      .from("Posts")
      .insert([
        {
          content: post,
          user_id: user.id
        }
      ])

    if (error) {
      console.error("SUPABASE ERROR:", error)
      alert("Error: " + error.message + " (code: " + error.code + ")")
    } else {
      alert("Post created!")
      setPost("")
      await loadPosts()
    }
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Community</h1>

      <textarea
        placeholder="Share an idea with other educators..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <br /><br />

      <button
        onClick={handlePost}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-200 shadow-sm"
      >
        Post
      </button>

    </div>
  )
}
