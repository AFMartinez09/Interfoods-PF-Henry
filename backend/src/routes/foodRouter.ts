import express from "express";
import { getFood } from "../controllers/getFood";
import { createFood } from "../controllers/postFood";
import { updateFood } from "../controllers/putFood";
import { deleteFood } from "../controllers/deleteFood";
import { getFoodFiltro } from "../controllers/getFoodFiltro";
import { addReviewToPlato } from "../controllers/reviewController";
const router = express.Router();

router.get("/", getFood);
router.post('/postFood', createFood);
router.put("/:id", updateFood)
router.delete("/:id", deleteFood)
router.get("/filtro", getFoodFiltro)

router.post("/:platoId/reviews", addReviewToPlato)

export default router;
