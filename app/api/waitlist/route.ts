import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const body = payload as { email?: unknown; source?: unknown };
  const email = body?.email;
  const source = typeof body?.source === "string" ? body.source : "homepage";

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required" },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim(), source });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });
    }
    console.error("[waitlist] insert failed:", error.code, error.message);
    return NextResponse.json(
      { ok: false, error: "Could not save your email. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
