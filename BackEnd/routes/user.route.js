const express = require("express"); // khai báo expess để sử dụng route có sẵn
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");

const controller = require("../controllers/user.controller");

router.post("/login", controller.login);

router.post("/", controller.register);

router.get("/profile", protect, controller.profile);

router.put("/profile", protect, controller.updateProfile);

router.get("/", protect, admin, controller.getAllUsers);

router.post("/forgot_password", controller.forgotPassword);

router.post("/reset-password", controller.resetPassword);

router.post("/logout", controller.logout);

router.post("/create", protect, admin, controller.createUsers);

router.get("/:id", protect, admin, controller.getUsers);

router.patch("/:id", protect, admin, controller.updateUser);

router.delete("/:id", protect, admin, controller.deleteUser);

module.exports = router;
