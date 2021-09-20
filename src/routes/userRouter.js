const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddlewares = require("../middlewares/auth");
const permissionMiddlewares = require("../middlewares/permission");

router.post("/", userController.create);
router.post("/auth", userController.auth);

router.use(authMiddlewares);
router.get("/at", (req, res) => {
  return res.status(200).send({ data: "authorized" });
});
router.get("/:id", userController.getById);
router.get("/", userController.get);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

router.use(permissionMiddlewares);
router.put("/:id/admin", userController.updateAdmin);

module.exports = router;
