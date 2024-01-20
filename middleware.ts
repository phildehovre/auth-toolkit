import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_REDIRECT_PATH, apiAuthRoutePrefix,  authRoutes, publicRoutes} from "@/routes"

 const {auth} = NextAuth(authConfig)

export default auth((req) => {
    const {nextUrl} = req
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutePrefix)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_PATH, nextUrl))
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    // Matcher is from Clerk: https://clerk.com/docs/references/nextjs/auth-middleware
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}