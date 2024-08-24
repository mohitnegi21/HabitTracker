import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: 
  [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    }
  ]
 },{versionKey: false }//, {
//   timestamps: true
// }
)
// ----?id=<%=habit._id%>&status=<%=status%>


const Habits = mongoose.model('Habits', habitSchema);
export default Habits;