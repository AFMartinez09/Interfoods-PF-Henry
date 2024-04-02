import { Router } from "express";

import foodRouter from "./foodRouter";
import registerRouter from "./registerRouter";

const router = Router();

router.use("/food", foodRouter);
router.use("/register", registerRouter);



export default router;
