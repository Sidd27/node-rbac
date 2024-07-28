import { FastifyReply, FastifyRequest } from "fastify";
import {
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../services/attributeService";

export async function createAttributeController(
  request: FastifyRequest<{ Body: { name: string; description?: string } }>,
  reply: FastifyReply
) {
  try {
    const { name, description } = request.body;
    const attribute = await createAttribute(name, description);
    reply.code(201).send(attribute);
  } catch (error) {
    console.error("Error creating attribute:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function updateAttributeController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { name?: string; description?: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { name, description } = request.body;
    const attribute = await updateAttribute(id, name, description);
    reply.send(attribute);
  } catch (error) {
    console.error("Error updating attribute:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function deleteAttributeController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    await deleteAttribute(id);
    reply.status(204).send();
  } catch (error) {
    console.error("Error deleting attribute:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}
