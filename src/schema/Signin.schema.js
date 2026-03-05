import * as z from 'zod'

export const signISchema= z.object({
  
   email: z.string().email('email or username is required').nonempty('email or username is required'),
   password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'password is required').
   nonempty('password is required'), 
  
})