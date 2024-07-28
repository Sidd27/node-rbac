// schemas/attributeSchemas.ts
export const createAttributeSchema = {
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
      },
    },
  },
};

export const updateAttributeSchema = {
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
      },
    },
  },
};

export const deleteAttributeSchema = {
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
