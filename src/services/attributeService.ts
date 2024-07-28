import prisma from "@/prismaClient";

export async function createAttribute(name: string, description?: string) {
  return prisma.attribute.create({
    data: { name, description },
  });
}

export async function updateAttribute(
  id: string,
  name?: string,
  description?: string
) {
  return prisma.attribute.update({
    where: { id },
    data: { name, description },
  });
}

export async function deleteAttribute(id: string) {
  return prisma.attribute.delete({
    where: { id },
  });
}
