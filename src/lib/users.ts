import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  console.log("Attempting to create user with data:", data);
  try {
    const user = await prisma.user.create({ data });
    console.log("User created successfully:", user.id);
    return { user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error };
  }
}
