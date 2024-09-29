import { auth } from "@/auth";
import NextAuth from "next-auth";

export { auth as middleware } from "@/auth";

console.log("middlewarre");
export default auth((req) => {
  const { nextUrl } = req;
  console.log(nextUrl);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
