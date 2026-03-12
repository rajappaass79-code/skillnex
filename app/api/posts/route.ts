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
  const body = await req.json();

  const { content } = body;

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: user?.id,
        content: content
      }
    ]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
