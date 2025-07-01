import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthApi";

type Role = keyof typeof roleBasedPrivateRoutes;

export const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [
    /^\/events/,
    /^\/user/,
    /^\/checkout/,
    /^\/profile/,
    /^\/dashboard\/user\/events/,
    /^\/dashboard\/user\/events\/add-event/,
    /^\/dashboard\/user\/events\/update-event/,
    /^\/dashboard\/user\/orders\/purchase-history/,
    /^\/dashboard\/user\/orders\/joined-history/,
  ],

  admin: [
    /^\/events/,
    /^\/admin/,
    /^\/user/,
    /^\/checkout/,
    /^\/profile/,
    /^\/dashboard\/user\/events/,
    /^\/dashboard\/user\/events\/add-event/,
    /^\/dashboard\/user\/events\/update-event/,
    /^\/dashboard\/user\/orders\/purchase-history/,
    /^\/dashboard\/user\/orders\/joined-history/,
    /^\/dashboard\/admin\/users/,
  ],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  console.log(userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/login`, request.url)
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: [
    "/events/:path*",
    "/user/:page",
    "/checkout",
    "/profile",
    "/user/dashboard/events",
    "/user/dashboard/events/add-event",
    "/user/dashboard/events/update-event",
    "/user/dashboard/orders/purchase-history",
    "/user/dashboard/orders/joined-history",
    "/admin/dashboard/users",
  ],
};
