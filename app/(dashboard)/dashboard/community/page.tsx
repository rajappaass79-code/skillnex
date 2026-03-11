'use client'

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Community() {

  const [post,setPost] = useState("")
  const [message,setMessage] = useState("")

  const handlePost = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if(!user){
      setMessage("Please login")
      return
    }

    const { error } = await supabase
      .from("posts")
      .insert({
        user_id:user.id,
        content:post
      })

    if(error){
      setMessage("Error posting")
    }else{
      setMessage("Posted successfully")
      setPost("")
    }
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

      <button onClick={handlePost}>
        Post
      </button>

      <p>{message}</p>

    </div>
  )
}
