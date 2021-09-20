const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController");
const authMiddlewares = require("../middlewares/auth");
const permissionMiddlewares = require("../middlewares/permission")

router.use(authMiddlewares);
router.get("/:id", ticketController.getById);
router.get("/", ticketController.get);

router.use(permissionMiddlewares);
router.post("/", ticketController.create);
router.put("/:id", ticketController.update);
router.delete("/:id", ticketController.delete);

module.exports = router;
