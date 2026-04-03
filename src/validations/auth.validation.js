const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars")
});

exports.loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});