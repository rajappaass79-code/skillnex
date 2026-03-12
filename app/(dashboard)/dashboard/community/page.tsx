'use client'

import { useState, useEffect } from "react"

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
    if (!text.trim()) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: text })
    });

    if (!res.ok) {
      alert("Post failed");
      return;
    }

    // reload posts after successful post
    const response = await fetch("/api/posts");
    const data = await response.json();

    setPosts(data.posts);
    setText("");
  };

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
