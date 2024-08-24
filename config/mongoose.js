import mongoose from "mongoose";
//mongoose.connect('mongodb://127.0.0.1:27017/habits_db');
export const connectToDatabase = async () => {
    //console.log(baseUrl)
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/habitsapp_db_mn`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected using mongoose");
    } catch (err) {
        console.log(err);
    }
}