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

export async function updateUser(id: string, data: Partial<User>) {
  console.log(`Attempting to update user ${id} with data:`, data);
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    console.log("User updated successfully:", user.id);
    return { user };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error };
  }
}

export async function deleteUser(id: string) {
  console.log(`Attempting to delete user with id: ${id}`);
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    console.log("User deleted successfully:", user.id);
    return { user };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error };
  }
}
