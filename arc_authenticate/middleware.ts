import NextAuth from "next-auth"
import authConfig from "./auth.config"

import{
    DEFAULT_LOGIN_REDIRECT, 
    apiAuthPrefix,
    authRoutes, 
    publicRoutes
} from '@/routes'

const {auth} = NextAuth(authConfig)
 
export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  

  if(isApiAuthRoute) {
    return ;
  }

  // if user is on authenticated route, then if user is already logged in, then redirect to settings page. if not, then he is able to access the authenticated route.
  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }
  
  // redirect user to log in page if he not logged in and he is not on a public route.
  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return ;
})




 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // from clerk
}