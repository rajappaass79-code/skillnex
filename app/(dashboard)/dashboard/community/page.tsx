'use client'

import { useState } from "react"

export default function Community() {

  const [post,setPost] = useState("")
  const [message,setMessage] = useState("")

  const handlePost = async () => {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        content: post
      })
    })
  }

  return (

    <div style={{padding:20}}>

      <h1>Community</h1>

      <textarea
        placeholder="Share an idea with other educators..."
        value={post}
        onChange={(e)=>setPost(e.target.value)}
      />

      <br/><br/>

      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Post
      </button>

      <p>{message}</p>

    </div>
  )
}
