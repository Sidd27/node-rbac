export const createUserSchema = {
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
      email: { type: "string" },
    },
    required: ["username", "password"],
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
        email: { type: "string", nullable: true },
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
