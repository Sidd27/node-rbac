import {
  assignRolesToUser,
  deleteUser,
  getUserById,
  registerUser,
  removeRolesFromUser,
  validateUserAccessByName,
} from "@/services/userService";
import { FastifyRequest, FastifyReply } from "fastify";

interface RegisterRequestBody {
  username: string;
}

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const { username }: RegisterRequestBody =
      request.body as RegisterRequestBody;

    const newUser = await registerUser(username);

    reply.code(201).send(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function getUserByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const user = await getUserById(id);
    if (user) {
      reply.send(user);
    } else {
      reply.code(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function deleteUserController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    await deleteUser(id);
    reply.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function assignRolesToUserController(
  request: FastifyRequest<{
    Params: { userId: string };
    Body: { roleIds: string[] };
  }>,
  reply: FastifyReply
) {
  try {
    const { userId } = request.params;
    const { roleIds } = request.body;
    const user = await assignRolesToUser(userId, roleIds);
    reply.send(user);
  } catch (error) {
    console.error("Error assigning roles to user:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function removeRolesFromUserController(
  request: FastifyRequest<{ Params: { userId: string; roleIds: string[] } }>,
  reply: FastifyReply
) {
  try {
    const { userId, roleIds } = request.params;
    const user = await removeRolesFromUser(userId, roleIds);
    reply.send(user);
  } catch (error) {
    console.error("Error removing role from user:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function validateUserAccessByNameController(
  request: FastifyRequest<{
    Params: { userId: string; attributeName: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { userId, attributeName } = request.params;
    const hasAccess = await validateUserAccessByName(userId, attributeName);

    if (hasAccess) {
      reply.send({ hasAccess });
    } else {
      reply.code(401).send({ error: "Unauthorized access" });
    }
  } catch (error) {
    console.error("Error validating user access:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}
