import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("REQUEST BODY:", body);

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    const { content, user_id } = body;

    const { data, error } = await supabase
      .from("Posts")
      .insert([
        {
          content,
          user_id,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server crashed" }, { status: 500 });
  }
}
