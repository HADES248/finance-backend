const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const { auth } = require("./middlewares/auth.middleware");
const { authorize } = require("./middlewares/role.middleware");
const recordRoutes = require("./routes/record.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/api/protected", auth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});
app.get(
  "/api/admin-only",
  auth,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

module.exports = app;