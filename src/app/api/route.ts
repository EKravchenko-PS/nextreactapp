import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Hello from GET method!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Received POST request", data: body });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Received PUT request", data: body });
}

export async function DELETE() {
  return NextResponse.json({ message: "Received DELETE request" });
}

