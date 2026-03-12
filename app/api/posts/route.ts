import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { content } = body

    if (!content) {
      return new Response(JSON.stringify({ error: "Content required" }), {
        status: 400
      })
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          content: content,
          name: "Educator"
        }
      ])

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      })
    }

    return new Response(JSON.stringify({ message: "Post created" }), {
      status: 200
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500
    })
  }
}
