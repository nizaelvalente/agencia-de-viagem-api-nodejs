const express = require("express");
const router = express.Router();

router.use("/user", require("./userRouter"));
router.use("/package", require("./packageRouter"));
router.use("/lodge", require("./lodgeRouter"));
router.use("/ticket", require("./ticketRouter"));

module.exports = router;
