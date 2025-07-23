import { NextResponse } from 'next/server';

// Підтримувані локалі
const locales = ['uk', 'en'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Перевіряємо, чи починається шлях з підтримуваної локалі
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Якщо шлях не містить локаль, перенаправляємо на українську
  if (!pathnameHasLocale) {
    // Виключаємо статичні файли та API роути
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Перенаправлення буде включено після перенесення сторінок
    // const newUrl = new URL(`/uk${pathname}`, request.url);
    // return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
