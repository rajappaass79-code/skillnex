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
  const body = await req.json()

  console.log("POST BODY:", body)

  const { content } = body

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: user?.id,
        content: content,
        name: "Educator"
      }
    ])

  console.log("INSERT ERROR:", error)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Post created", data })
}
