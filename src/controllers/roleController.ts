import { FastifyReply, FastifyRequest } from "fastify";
import {
  createRole,
  updateRole,
  deleteRole,
  attachAttributesToRole,
  detachAttributeFromRole,
  getRoleById,
} from "../services/roleService";

export async function createRoleController(
  request: FastifyRequest<{ Body: { name: string; description?: string } }>,
  reply: FastifyReply
) {
  try {
    const { name, description } = request.body;
    const role = await createRole(name, description);
    reply.code(201).send(role);
  } catch (error) {
    console.error("Error creating role:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function updateRoleController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { name?: string; description?: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { name, description } = request.body;
    const role = await updateRole(id, name, description);
    reply.send(role);
  } catch (error) {
    console.error("Error updating role:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function deleteRoleController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    await deleteRole(id);
    reply.status(204).send();
  } catch (error) {
    console.error("Error deleting role:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function attachAttributesToRoleController(
  request: FastifyRequest<{
    Params: { roleId: string };
    Body: { attributeIds: string[] };
  }>,
  reply: FastifyReply
) {
  try {
    const { roleId } = request.params;
    const { attributeIds } = request.body;
    const role = await attachAttributesToRole(roleId, attributeIds);
    reply.send(role);
  } catch (error) {
    console.error("Error attaching attributes to role:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function detachAttributeFromRoleController(
  request: FastifyRequest<{ Params: { roleId: string; attributeId: string } }>,
  reply: FastifyReply
) {
  try {
    const { roleId, attributeId } = request.params;
    const role = await detachAttributeFromRole(roleId, attributeId);
    reply.send(role);
  } catch (error) {
    console.error("Error detaching attribute from role:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}

export async function getRoleByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const role = await getRoleById(id);
    if (role) {
      reply.send(role);
    } else {
      reply.code(404).send({ error: "Role not found" });
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    reply.code(500).send({ error: "Internal server error" });
  }
}
