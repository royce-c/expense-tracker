import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"

export const authConfig = { 
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      return true
      const isLoggedIn = !!auth?.user
      const paths = ["/profile", "/upload"]
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }
      
      return true
    },
  }
} satisfies NextAuthConfig

export const { handlers, auth, signOut } = NextAuth(authConfig)