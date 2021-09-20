const express = require("express");
const router = express.Router();
const lodgeController = require("../controller/lodgeController");
const authMiddlewares = require("../middlewares/auth");

router.use(authMiddlewares);
router.post("/", lodgeController.create);
router.get("/:id", lodgeController.getById);
router.get("/", lodgeController.get);
router.put("/:id", lodgeController.update);
router.delete("/:id", lodgeController.delete);

module.exports = router;
