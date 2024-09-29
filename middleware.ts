import { auth } from "@/auth";
import { adminRoutes, employeeRoutes, hrRoutes, publicRoutes } from "./routes";

console.log("middlewarre");
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = await auth();
  console.log(isLoggedIn);
  console.log(session?.user?.role);

  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isHrRoute = nextUrl.pathname.startsWith(hrRoutes);
  const isEmployeeRoute = nextUrl.pathname.startsWith(employeeRoutes);
  const isPublicRoute = nextUrl.pathname === publicRoutes;
  console.log(nextUrl);

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (isLoggedIn && isPublicRoute) {
    switch (session?.user?.role) {
      case "employee":
        return Response.redirect(new URL("/employee", nextUrl));

      case "hr":
        return Response.redirect(new URL("/hr", nextUrl));

      case "admin":
        return Response.redirect(new URL("/admin", nextUrl));
    }
  }

  if (isAdminRoute && session?.user?.role != "admin") {
    return Response.redirect(new URL("/defaulttemppage", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
