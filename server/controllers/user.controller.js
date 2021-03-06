import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
//import Signup from '../../client/signup'

const signup = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/signup.html') 
}
const signin = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/signin.html')  
}
const profile = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/profile.html')  
}

const index2 = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/index2.html')  
}
const admin = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/admin.html')  
}
const dataentry = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/dataentry.html')  
}
const appointment = (req, res) => {
   res.status(200).sendFile(process.cwd()+'/client/appointment.html')  
  //return res.redirect('/client/appointment.html')
  //res.status(200).render('/client/appointment.ejs')  

}

const location = (req, res) => {
  res.status(200).sendFile(process.cwd()+'/client/location.html')  
}
const create = (req, res, next) => {
  const user = new User(req.body)
  user.save((err, result) => {
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
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  })
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name email updated created')
}

const update = (req, res, next) => {
  let user = req.profile
  user = _.extend(user, req.body)
  user.updated = Date.now()
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  })
}

const remove = (req, res, next) => {
  let user = req.profile
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  })
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  signup,
  signin,
  profile,
  index2,
  admin,
  dataentry,
  location,
  appointment
}
