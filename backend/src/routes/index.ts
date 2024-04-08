import { Router } from "express";

import foodRouter from "./foodRouter";
import registerRouter from "./registerRouter";
import paymentsRouter from "./paymentsRouter";

const router = Router();

router.use("/food", foodRouter);
router.use("/register", registerRouter);
router.use("/payments", paymentsRouter);

export default router;
