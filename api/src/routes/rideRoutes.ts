import { Router } from "express";
import { rideEstimateController, rideConfirmController, ridersListController } from "../controllers/rideController";


const router = Router();

router.post("/ride/estimate", rideEstimateController);
router.patch("/ride/confirm", rideConfirmController);
router.get("/ride/:customer_id", ridersListController);

export default router;
