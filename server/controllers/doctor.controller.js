import Doctor from '../models/doctor.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

//import Signup from '../../client/signup'
//{name: req.body.key}
const findDoctor = (req, res) => {

  Doctor.find(function(err, data){
    if(err){
      return res.status(400).json({
        err: "Could not fetch data"
      })
    }
    console.log(data)
    res.status(200).render('findDoctor.ejs', {doctor: data})  
  })

}


const create = (req, res, next) => {
  const doctor = new Doctor(req.body)
  doctor.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully signed up!"
    })
  })
}

/**
 * Load doctor and append to req.
 */
const doctorByID = (req, res, next, id) => {
  Doctor.findById(id).exec((err, doctor) => {
    if (err || !doctor)
      return res.status('400').json({
        error: "Doctor not found"
      })
    req.doctor = doctor
    next()
  })
}

const read = (req, res) => {
  
  return res.json(req.doctor)
}

const list = (req, res) => {
  Doctor.find((err, doctors) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(doctors)
  }).select('name email updated created')
}

const update = (req, res, next) => {
  let doctor = req.profile
  doctor = _.extend(doctor, req.body)
  doctor.updated = Date.now()
  doctor.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    doctor.hashed_password = undefined
    doctor.salt = undefined
    res.json(doctor)
  })
}

const remove = (req, res, next) => {
  let doctor = req.profile
  doctor.remove((err, deletedDoctor) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedDoctor.hashed_password = undefined
    deletedDoctor.salt = undefined
    res.json(deletedDoctor)
  })
}

export default {
  create,
  doctorByID,
  read,
  list,
  remove,
  update,
  findDoctor
}
