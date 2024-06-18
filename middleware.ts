import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const middleware = createMiddleware({
  locales: ["en", "am"],
  defaultLocale: "en",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect from the root URL to /en/home or /am/home
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en/home", req.url));
  }
  if (pathname.startsWith("/admin") || pathname.startsWith("/test")) {
    return;
  }
  const images = ["jpg", "jpeg", "png", "gif", "svg", "webp", "ico"];
  if (images.some((ext) => pathname.endsWith(ext))) {
    return;
  }

  return middleware(req);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static|api).*)"],
};
