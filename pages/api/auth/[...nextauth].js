import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import UserModel from '../../../Models/User';
import bcrypt from 'bcrypt';

export default NextAuth({
  
  providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      Providers.Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Registered Email',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: { label: "Email id", type: "email", placeholder: "Eg: johndoe@abc.com" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials) {
          // Add logic here to look up the user from the credentials supplied
          // console.log(credentials)
          let check;
          const userDetails = await UserModel.findOne({email: credentials.email});
          if(!userDetails){
            return null
          }
          console.log(userDetails.password,credentials.password);
          const checkPassword = await bcrypt.compare(credentials.password,userDetails.password)
          // console.log(checkPassword)
          if(!checkPassword){
            return null
          }
          return {
            name: userDetails.name,
            email: userDetails.email,
            image: userDetails.image
          }
        }
      })
    ]
})