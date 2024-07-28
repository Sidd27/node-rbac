// schemas/roleSchemas.ts
export const createRoleSchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
      description: { type: "string", nullable: true },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string", nullable: true },
        attributeIDs: { type: "array", items: { type: "string" } },
      },
    },
  },
};

export const updateRoleSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string", nullable: true },
      description: { type: "string", nullable: true },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string", nullable: true },
        attributeIDs: { type: "array", items: { type: "string" } },
      },
    },
  },
};

export const deleteRoleSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    204: { type: "null" },
  },
};

export const attachAttributesToRoleSchema = {
  params: {
    type: "object",
    required: ["roleId"],
    properties: {
      roleId: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["attributeIds"],
    properties: {
      attributeIds: { type: "array", items: { type: "string" } },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string", nullable: true },
        attributeIDs: { type: "array", items: { type: "string" } },
      },
    },
  },
};

export const detachAttributeFromRoleSchema = {
  params: {
    type: "object",
    required: ["roleId", "attributeId"],
    properties: {
      roleId: { type: "string" },
      attributeId: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string", nullable: true },
        attributeIDs: { type: "array", items: { type: "string" } },
      },
    },
  },
};

export const getRoleByIdSchema = {
  params: {
    type: "object",
    required: ["roleId"],
    properties: {
      roleId: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string", nullable: true },
        attributeIDs: { type: "array", items: { type: "string" } },
      },
    },
  },
};
