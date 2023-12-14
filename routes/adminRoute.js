import { Router } from "express";
import { adminLogin, adminRegister, getAllSessions, getSessionById, registration, uploads,superUserTokenAuth, deletesuperUserToken, getsuperuserToken } from "../controllers/SessionCtrl.js";
// import store from "../middleware/Multer.js";
const router = Router()

router.route('/sessionregister').post(registration)
router.route('/getallsessions').get(getAllSessions)
router.route('/getsession/:id').get(getSessionById)
router.route('/adminregisterunknown').post(adminRegister)
router.route('/adminlogin').post(adminLogin)
router.route('/sendtokenforsuperuser').post(superUserTokenAuth)
router.route('/deletetokenfromsuperuser').post(deletesuperUserToken)
router.route('/gettokenfromsuperuser').post(getsuperuserToken)
// router.route('/uploadmultipleimages').post(store.array('images',12),uploads)

export default router;