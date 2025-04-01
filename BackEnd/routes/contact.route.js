const express = require("express"); // khai báo expess để sử dụng route có sẵn
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");
const controller = require("../controllers/contact.controller");

router.get("/", protect, admin, controller.index); 

router.post("/", controller.create);

router.delete("/:id", protect, admin, controller.delete);

module.exports = router;