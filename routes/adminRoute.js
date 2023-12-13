import { Router } from "express";
import { getAllSessions, getSessionById, registration, uploads } from "../controllers/SessionCtrl.js";
// import store from "../middleware/Multer.js";
const router = Router()

router.route('/sessionregister').post(registration)
router.route('/getallsessions').get(getAllSessions)
router.route('/getsession/:id').get(getSessionById)
// router.route('/uploadmultipleimages').post(store.array('images',12),uploads)

export default router;