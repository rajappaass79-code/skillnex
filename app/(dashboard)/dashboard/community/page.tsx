'use client'

import { useState } from "react"

export default function CommunityPage() {

  const [post,setPost] = useState("")

  return (
    <div>
      <h1>Community</h1>

      <textarea
        placeholder="Share an idea with other educators..."
        value={post}
        onChange={(e)=>setPost(e.target.value)}
      />

      <button>Post</button>
    </div>
  )
}
