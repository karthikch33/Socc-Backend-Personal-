import { Router } from "express";
import { contactfun, registration, sendEmail } from "../controllers/RegisterCtrl.js";
import { feedbackRating } from "../controllers/SessionCtrl.js";


const router = Router()

router.route('/register').post(registration)
router.route('/contact').post(contactfun)
router.route('/sendEmail').post(sendEmail)
router.route('/feedback').post(feedbackRating)



export default router

