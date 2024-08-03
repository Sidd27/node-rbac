export const createUserSchema = {
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
};

export const getUserByIdSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        roleIDs: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["id", "username", "roleIDs"],
    },
    404: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
      required: ["error"],
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
      required: ["error"],
    },
  },
};

export const deleteUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
};

export const assignRolesToUserSchema = {
  params: {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
  },
  body: {
    type: "object",
    properties: {
      roleIds: { type: "array", items: { type: "string" } },
    },
    required: ["roleIds"],
  },
};

export const removeRolesFromUserSchema = {
  params: {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
  },
  body: {
    type: "object",
    properties: {
      roleIds: { type: "array", items: { type: "string" } },
    },
    required: ["roleIds"],
  },
};

export const validateUserAccessByNameSchema = {
  params: {
    type: "object",
    required: ["userId", "attributeName"],
    properties: {
      userId: { type: "string" },
      attributeName: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        hasAccess: { type: "boolean" },
      },
    },
    401: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};
