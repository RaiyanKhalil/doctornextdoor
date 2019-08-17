import mongoose from 'mongoose'
import crypto from 'crypto'
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    //unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  specialty: {
    type: String,
    trim: true,
    required: 'Specialty is required'
  },
  area: {
    type: String,
    trim: true,
    required: 'Area is required'
  },
  lat: {
    type: Number,
    trim: true,
    required: 'Latitude is required'
  },

  long: {
    type: Number,
    trim: true,
    required: 'Longitude is required'
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})



export default mongoose.model('Doctor', doctorSchema)
