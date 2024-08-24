import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  date: {
    type: String,
  },

datestatus:{
    type:String
},
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habits',
    }
 },{versionKey: false }//, {
//   timestamps: true
// }
)



const Status = mongoose.model('Status', statusSchema);

export default Status;