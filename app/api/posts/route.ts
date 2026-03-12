import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      content,
      created_at,
      user_id,
      profiles (
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ posts: data });
}

export async function POST(req: Request) {

  const authHeader = req.headers.get("Authorization")
  const token = authHeader?.replace("Bearer ", "")

  console.log("POST /api/posts — token present:", !!token)

  if (!token) {
    return Response.json({ error: "Unauthorized - no token" }, { status: 401 })
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  console.log("POST /api/posts — user:", user?.id ?? "null", "authError:", authError?.message ?? "none")

  if (authError || !user) {
    return Response.json({ error: "Unauthorized - invalid token" }, { status: 401 })
  }

  const body = await req.json()
  const { content } = body

  const userClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  )

  const { error: insertError } = await userClient
    .from("posts")
    .insert([{ content, user_id: user.id }])

  console.log("POST /api/posts — insertError:", insertError?.message ?? "none")

  if (insertError) {
    return Response.json({ error: insertError.message }, { status: 500 })
  }

  return Response.json({ success: true })
}
