import NextAuth, {Session,  User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export interface CustomUser extends User {
  username?: string;
  uid?: string;
}

const handler = NextAuth({
 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    
  ],

  callbacks:{
    async session({session ,token}){
      if(session && session.user && session.user.name  ){
        (session.user as CustomUser).username = session.user.name.split(' ').join('').toLocaleLowerCase();
      }
      
      if(session && session.user && token && token.sub){
        (session.user as CustomUser).uid = token.sub
      }
     
      return session as Session;

    }
  }
})
export {handler as GET, handler as POST}