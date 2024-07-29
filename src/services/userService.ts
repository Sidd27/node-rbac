import prisma from "@/prismaClient";
import { User } from "@prisma/client";

// Function to register a new user
export async function registerUser(
  username: string,
  hashedPassword: string
): Promise<User> {
  try {
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

// Function to fetch a user by ID
export async function getUserById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { roles: true },
  });
}

// Function to delete a user
export async function deleteUser(userId: string): Promise<User> {
  return prisma.user.delete({
    where: { id: userId },
  });
}

// Function to assign roles to a user
export async function assignRolesToUser(
  userId: string,
  roleIds: string[]
): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { roleIDs: true },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const updatedRoleIDs = Array.from(new Set([...user.roleIDs, ...roleIds]));

  return prisma.user.update({
    where: { id: userId },
    data: { roleIDs: updatedRoleIDs },
  });
}

// Function to remove roles from a user
export async function removeRolesFromUser(
  userId: string,
  roleIds: string[]
): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { roleIDs: true },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const updatedRoleIDs = user.roleIDs.filter((id) => !roleIds.includes(id));

  return prisma.user.update({
    where: { id: userId },
    data: { roleIDs: updatedRoleIDs },
  });
}
