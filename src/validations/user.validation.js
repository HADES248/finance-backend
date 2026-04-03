const { z } = require("zod");

exports.updateRoleSchema = z.object({
  role: z.enum(["viewer", "analyst", "admin"])
});