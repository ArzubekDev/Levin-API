export const DEFAULT_SCHEMA = {
  users: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string", faker: "person.fullName" },
      email: { type: "string", faker: "internet.email" },
      age: { type: "integer", minimum: 18, maximum: 65 },
      role: { type: "string", enum: ["admin", "user", "guest"] },
      isActive: { type: "boolean" },
    },
  },
};
