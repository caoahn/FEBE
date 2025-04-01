const express = require("express"); // khai báo expess để sử dụng route có sẵn
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");

const controller = require("../controllers/custom.controller");

router.post("/product", controller.getProductByCategory);

router.get("/product", controller.getAsyncProductByCategory);

router.get("/service", controller.getAsyncServiceByCategory);

router.get("/getCategory", controller.getCategory);

router.post("/getProdcutById", controller.getProductByCategoryId);

module.exports = router;