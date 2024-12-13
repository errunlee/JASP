import Router from "express";
import { upload } from "../config/configs";
import { deleteDonation, getDonations,updateDonation,createDonation, claimDonation } from "../controllers/donation.controller";

const router = Router();

router.post("/",upload.single("file"),createDonation);
router.get("/",getDonations)
router.put("/:id",upload.single("file"),updateDonation);
router.delete("/:id",deleteDonation);
router.post("/:id",claimDonation);

export default router;