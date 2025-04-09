import { db } from "@/lib/db";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  const contacts = await db.contact.findMany();
  return NextResponse.json({ contacts });
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json({
      status: 400,
      body: 'Name and email are required',
    });
  }

  const emailAlreadyInUse = await db.contact.findUnique({
    where: { email },
    select: {
      id: true,
      email: true
    },
  })

  if (emailAlreadyInUse) {
    return NextResponse.json(
      { error: 'This email already in use' },
      { status: 409 });
  }

  const contact = await db.contact.create({
    data: { name, email },
  })

  return NextResponse.json(
    { contact },
    { status: 201 }
  )
}
