import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  tempRegisterRoutes,
} from "./routes";
import NextAuth from "next-auth";

console.log("middlewarre");
const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = await auth();
  console.log("is loggin: " + isLoggedIn);
  console.log("is loggin: " + nextUrl);

  console.log("pathname " + nextUrl.pathname);

  const isPublicRoute = nextUrl.pathname === publicRoutes;
  const isTempRegisterRoute = nextUrl.pathname === tempRegisterRoutes;

  if (!isLoggedIn && !isPublicRoute && !isTempRegisterRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  // if (DEFAULT_LOGIN_REDIRECT) {
  //   if (!isLoggedIn) {
  //     return Response.redirect(new URL("/", nextUrl));
  //   }
  // }

  if (isPublicRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
