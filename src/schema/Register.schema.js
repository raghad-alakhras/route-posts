import * as z from 'zod'

export const registerSchema= z.object({
   name: z.string().nonempty('Name is required'),
   username: z.string().optional('Username is optional'),
   email: z.string().email('Email is invalid').nonempty('Email is required'),
   password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character').
   nonempty('Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'), 
   rePassword: z.string().nonempty('Repassword is Required'),
   dateOfBirth: z.string().nonempty('Date of Birthday is Required'),
   gender: z.string().nonempty('Gender is Required'),
}).refine(data => data.password===data.rePassword,
    { message :'Password and confirm password should be the same', 
        path: ['rePassword']
    }
)