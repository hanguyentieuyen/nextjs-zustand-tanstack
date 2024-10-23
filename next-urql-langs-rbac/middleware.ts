import { NextRequest, NextResponse } from "next/server";
import {fallbackLanguage, locales} from './src/i18n/setting'
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
   if (
    pathname.startsWith(`/${fallbackLanguage}/`) ||
    pathname === `/${fallbackLanguage}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLanguage}`,
          pathname === `/${fallbackLanguage}` ? '/' : '',
        ),
        req.url,
      ),
    );
  }

 const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {

    return NextResponse.rewrite(
      new URL(`/${fallbackLanguage}${pathname}`, req.url),
    );
  }
}

export const config = {
  // Do not run the middleware on the following paths
  matcher:
    '/((?!api|_next/static|_next/image|manifest.json|assets|favicon.ico).*)',
};