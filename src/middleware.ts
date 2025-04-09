import { NextRequest, NextResponse } from "next/server";

const isSignedIn = true;

export function middleware(request: NextRequest) {
  console.log('caiu aqui')

  if (!isSignedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// protegendo a rota create de contacts
export const config = {
  matcher: ['/contacts/create'],
};
