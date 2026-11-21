import { type NextRequest, NextResponse } from "next/server"
import { findOrCreateOAuthUser, createSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    ;

    if (!code) {
      
      return NextResponse.redirect(new URL("/login?error=missing_code", request.url))
    }

    if (!process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
      
      return NextResponse.redirect(new URL("/login?error=missing_credentials", request.url))
    }

    
    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://graph.facebook.com/v18.0/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL || request.nextUrl.origin}/api/auth/facebook/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      ;
      throw new Error("Failed to exchange code for token")
    }

    const tokens = await tokenResponse.json()
    ;

    // Get user info from Facebook
    
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokens.access_token}`,
    )

    if (!userResponse.ok) {
      
      throw new Error("Failed to get user info")
    }

    const facebookUser = await userResponse.json()
    ;

    // Create or find user in database
    
    const user = await findOrCreateOAuthUser(facebookUser.email, facebookUser.name, "facebook", facebookUser.id)
    ;

    // Create session
    
    await createSession(user)
    ;

    // Redirect to dashboard
    
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url))
  }
}
