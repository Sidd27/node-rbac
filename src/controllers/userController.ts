import {
  assignRolesToUser,
  deleteUser,
  getUserById,
  registerUser,
  removeRolesFromUser,
} from "@/services/userService";
import { hashPassword } from "@/utils/password";
import { FastifyRequest, FastifyReply } from "fastify";

interface RegisterRequestBody {
  username: string;
  password: string;
}

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const { username, password }: RegisterRequestBody =
      request.body as RegisterRequestBody;

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password, 10);

    // Register the user with the hashed password
    const newUser = await registerUser(username, hashedPassword);
    // Omit the password property from the newUser object
    const { password: _, ...userWithoutPassword } = newUser;

    reply.code(201).send(userWithoutPassword);
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
    const { password: _, ...userWithoutPassword } = user;
    reply.send(userWithoutPassword);
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
    const { password: _, ...userWithoutPassword } = user;
    reply.send(userWithoutPassword);
  } catch (error) {
    console.error("Error removing role from user:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}
