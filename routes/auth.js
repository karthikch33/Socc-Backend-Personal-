import { Router } from "express";
import { attendaceRegister, attendanceSave, contactfun, getAllRegister, getCompliants, getCompliantsResolved, registration, resolvedContactMssg, sendEmail, serveronoroff } from "../controllers/RegisterCtrl.js";
import { feedbackRating } from "../controllers/SessionCtrl.js";


const router = Router()

router.route('/register').post(registration)
router.route('/getallregister').post(getAllRegister)
router.route('/contact').post(contactfun)
router.route('/updatecontact').post(resolvedContactMssg)
router.route('/sendEmail').post(sendEmail)
router.route('/feedback').post(feedbackRating)
router.route('/attendance').post(attendaceRegister)
router.route('/attendancesave').post(attendanceSave)
router.route('/serveronoroff').get(serveronoroff)
router.route('/getContacts').get(getCompliants)
router.route('/getContactsResolved').get(getCompliantsResolved)



export default router

