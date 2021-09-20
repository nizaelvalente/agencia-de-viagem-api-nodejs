const express = require("express");
const router = express.Router();
const packageController = require("../controller/packageController");
const authMiddlewares = require("../middlewares/auth");
const permissionMiddlewares = require("../middlewares/permission");

router.use(authMiddlewares);
router.get("/:id", packageController.getById);
router.get("/", packageController.get);

router.use(permissionMiddlewares);
router.post("/", packageController.create);
router.put("/:id", packageController.update);
router.delete("/:id", packageController.delete);

module.exports = router;
