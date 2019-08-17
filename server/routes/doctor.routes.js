import express from 'express'
import doctorCtrl from '../controllers/doctor.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()
router.route('/findDoctor').get(doctorCtrl.findDoctor)

  router.route('/api/doctors')
    .get(doctorCtrl.list)
    .post(doctorCtrl.create)

  router.route('/api/doctors/:doctorId')
    .get(authCtrl.requireSignin, doctorCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, doctorCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, doctorCtrl.remove)

  router.param('doctorId', doctorCtrl.doctorByID)

export default router
