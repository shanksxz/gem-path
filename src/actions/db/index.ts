"use server"

import { db } from "~/server/db"
import bcrypt from "bcrypt"
import { z } from "zod"
import { Response } from "~/app/utils"

const CreateUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
})

export async function createUser(foo : z.infer<typeof CreateUserSchema>) {
  try {

    const { email, name, password } = CreateUserSchema.parse(foo)

    // check if user already exists
    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return Response(404, "User already exists", null);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return Response(200, "User created successfully", user);
  } catch (error) {
    if(error instanceof z.ZodError) {
       return Response(404, error.message, null)
    }
    return Response(500, "Internal Server Error", null)
  }
    
}


