'use client'

import { useState, useEffect } from "react"

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
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: crypto.randomUUID(),
        content: post
      })
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("POST ERROR:", data)
      alert("Error: " + data.error)
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

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <p className="font-semibold">{post.name}</p>
            <p className="text-gray-800">{post.content}</p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
