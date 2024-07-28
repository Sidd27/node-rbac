// services/roleService.ts
import prisma from "@/prismaClient";
import { Role } from "@prisma/client";

export async function createRole(
  name: string,
  description?: string
): Promise<Role> {
  if (!name) {
    throw new Error("Role name is required");
  }
  return prisma.role.create({
    data: {
      name,
      description,
    },
  });
}

export async function updateRole(
  id: string,
  name?: string,
  description?: string
): Promise<Role> {
  const data: { name?: string; description?: string } = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;

  return prisma.role.update({
    where: { id },
    data,
  });
}

export async function getRoleById(id: string): Promise<Role | null> {
  return prisma.role.findUnique({
    where: { id },
  });
}

export async function deleteRole(id: string): Promise<Role> {
  return prisma.role.delete({
    where: { id },
  });
}

export async function attachAttributesToRole(
  roleId: string,
  attributeIds: string[]
): Promise<Role> {
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) {
    throw new Error("Role not found");
  }
  const updatedAttributeIDs = Array.from(
    new Set([...role.attributeIDs, ...attributeIds])
  );
  return prisma.role.update({
    where: { id: roleId },
    data: { attributeIDs: updatedAttributeIDs },
  });
}

export async function detachAttributeFromRole(
  roleId: string,
  attributeId: string
): Promise<Role> {
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) {
    throw new Error("Role not found");
  }
  const updatedAttributeIDs = role.attributeIDs.filter(
    (id) => id !== attributeId
  );
  return prisma.role.update({
    where: { id: roleId },
    data: { attributeIDs: updatedAttributeIDs },
  });
}
