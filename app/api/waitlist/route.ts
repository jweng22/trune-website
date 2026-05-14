import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const email = (payload as { email?: unknown })?.email;
  const source =
    typeof (payload as { source?: unknown })?.source === "string"
      ? ((payload as { source?: string }).source as string)
      : "homepage";

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim(), source });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: true, duplicate: true },
        { status: 200 },
      );
    }

    console.error("waitlist insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your email. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
