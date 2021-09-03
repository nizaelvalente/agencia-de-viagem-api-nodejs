const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddlewares = require("../middlewares/auth");

router.post("/", userController.create);
router.post("/auth", userController.auth);

//rotas autenticadas
router.use(authMiddlewares);
router.get("/:id", userController.getById);
router.get("/", userController.get);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
