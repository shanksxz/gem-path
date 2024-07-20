"use server"

import { db } from "~/server/db"
import { z } from "zod"

const CreateUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
})

export async function createUser(foo : z.infer<typeof CreateUserSchema>) {
  try {

    const { email, name, password } = CreateUserSchema.parse(foo)

    const user = await db.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return user;
  } catch (error) {
    if(error instanceof z.ZodError) {
        throw new Error("Invalid input data")
    }
    throw new Error("Failed to create user");
  }
    
}