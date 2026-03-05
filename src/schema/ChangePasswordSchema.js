import * as z from 'zod'

export const changePasswordSchema= z.object({
   password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'password is required').
   nonempty('Current password is required.'), 
   newPassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'At least 8 characters with uppercase, lowercase, number, and special character.').
   nonempty('New password is required.'), 
   rePassword: z.string().
   nonempty('Please confirm your new password'), 
  
}).refine(data => data.newPassword===data.rePassword,
    { message :'Passwords do not match.', 
        path: ['rePassword']
    }
)