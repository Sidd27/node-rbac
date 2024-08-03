import { FastifyInstance } from "fastify";
import {
  attachAttributesToRoleController,
  createRoleController,
  deleteRoleController,
  detachAttributeFromRoleController,
  getRoleByIdController,
  updateRoleController,
} from "./controllers/roleController";
import {
  createAttributeController,
  deleteAttributeController,
  updateAttributeController,
} from "@/controllers/attributeController";
import {
  assignRolesToUserController,
  createUserController,
  deleteUserController,
  getUserByIdController,
  removeRolesFromUserController,
  validateUserAccessByNameController,
} from "@/controllers/userController";
import {
  assignRolesToUserSchema,
  createUserSchema,
  deleteUserSchema,
  getUserByIdSchema,
  removeRolesFromUserSchema,
  validateUserAccessByNameSchema,
} from "./schemas/userSchemas";
import {
  createAttributeSchema,
  deleteAttributeSchema,
  updateAttributeSchema,
} from "./schemas/attributeSchemas";
import {
  attachAttributesToRoleSchema,
  createRoleSchema,
  deleteRoleSchema,
  detachAttributeFromRoleSchema,
  getRoleByIdSchema,
  updateRoleSchema,
} from "./schemas/roleSchemas";

export default async function routes(fastify: FastifyInstance) {
  // User routes
  fastify.post("/users", {
    schema: createUserSchema,
    handler: createUserController,
  });
  fastify.get("/users/:id", {
    schema: getUserByIdSchema,
    handler: getUserByIdController,
  });
  fastify.delete("/users/:id", {
    schema: deleteUserSchema,
    handler: deleteUserController,
  });
  fastify.patch("/users/:userId/roles", {
    schema: assignRolesToUserSchema,
    handler: assignRolesToUserController,
  });
  fastify.delete("/users/:userId/roles", {
    schema: removeRolesFromUserSchema,
    handler: removeRolesFromUserController,
  });

  fastify.get(
    "/users/:userId/attributes/:attributeName/access",
    { schema: validateUserAccessByNameSchema },
    validateUserAccessByNameController
  );

  // Role routes
  fastify.post("/roles", {
    schema: createRoleSchema,
    handler: createRoleController,
  });
  fastify.put("/roles/:id", {
    schema: updateRoleSchema,
    handler: updateRoleController,
  });
  fastify.delete("/roles/:id", {
    schema: deleteRoleSchema,
    handler: deleteRoleController,
  });
  fastify.patch("/roles/:roleId/attributes", {
    schema: attachAttributesToRoleSchema,
    handler: attachAttributesToRoleController,
  });
  fastify.delete("/roles/:roleId/attributes/:attributeId", {
    schema: detachAttributeFromRoleSchema,
    handler: detachAttributeFromRoleController,
  });
  fastify.get("/roles/:id", {
    schema: getRoleByIdSchema,
    handler: getRoleByIdController,
  });

  // Attribute routes
  fastify.post("/attributes", {
    schema: createAttributeSchema,
    handler: createAttributeController,
  });
  fastify.put("/attributes/:id", {
    schema: updateAttributeSchema,
    handler: updateAttributeController,
  });
  fastify.delete("/attributes/:id", {
    schema: deleteAttributeSchema,
    handler: deleteAttributeController,
  });
}
