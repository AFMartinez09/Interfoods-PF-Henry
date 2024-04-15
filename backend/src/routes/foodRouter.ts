import express from "express";
import { getFood } from "../controllers/getFood";
import { createFood } from "../controllers/postFood";
import { updateFood } from "../controllers/putFood";
import { deleteFood } from "../controllers/deleteFood";
import { getFoodFiltro } from "../controllers/getFoodFiltro";
import { addReviewToPlato } from "../controllers/reviewController";
import { getReviewForPlato } from "../controllers/getReviewPlato";
import { getAllReviews } from "../controllers/getAllReviews";
import { disableReview } from "../controllers/disableReview";
import { getReviewForUser } from "../controllers/getReviewUser";
import { activeFood } from "../controllers/activateFood";
import {upinventario } from "../controllers/updateInventario";

const router = express.Router();

router.get("/", getFood);
router.post('/postFood', createFood);
router.put("/:id", updateFood)
router.delete("/:id", deleteFood)
router.post("/:id", activeFood)
router.get("/filtro", getFoodFiltro)
router.get("/comida/inventario", upinventario)

router.post("/:platoId/reviews", addReviewToPlato)

router.get('/:platoId/reviews', getReviewForPlato)
router.get('/usuario/:usuarioId/reviews', getReviewForUser)
router.get('/reviews', getAllReviews)

router.put('/disableReview/:id', disableReview)

export default router;
