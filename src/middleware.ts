/**
 * because this is file called 'middleware.ts', Next will automatically run this as middleware on every request before they reach the server
 */

import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware((req: NextRequest) => {
  console.log(`middleware running for ${req.method} request to ${req.url}`);
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
