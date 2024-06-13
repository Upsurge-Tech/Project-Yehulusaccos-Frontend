import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  locales: ["en", "am"],
  defaultLocale: "en",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect from the root URL to /en/home or /am/home
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en/home', req.url));
  }

  return middleware(req);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|static|api).*)'],
};
