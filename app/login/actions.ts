"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  username: process.env.USERNAME_LOGIN!,
  password: process.env.PASSWORD_LOGIN!,
};


const loginSchema = z.object({
  username: z.string().min(1, { message: "Invalid username" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    console.log("false")
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;

  if (username !== testUser.username || password !== testUser.password) {
    console.log("Invalid credentials");
    return {
      errors: {
        username: ["Invalid username or password"],
      },
    };
  }
console.log("Login successful");
  await createSession(testUser.id);

  redirect("/");
  
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}