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
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-200 shadow-sm"
      >
        Post
      </button>

      <p>{message}</p>

    </div>
  )
}
