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

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      
      return NextResponse.redirect(new URL("/login?error=missing_credentials", request.url))
    }

    
    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXTAUTH_URL || request.nextUrl.origin}/api/auth/google/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      ;
      throw new Error("Failed to exchange code for token")
    }

    const tokens = await tokenResponse.json()
    ;

    // Get user info from Google
    
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userResponse.ok) {
      
      throw new Error("Failed to get user info")
    }

    const googleUser = await userResponse.json()
    ;

    // Create or find user in database
    
    const user = await findOrCreateOAuthUser(googleUser.email, googleUser.name, "google", googleUser.id)
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
