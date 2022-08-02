import mongoose from 'mongoose';
const { Schema } = mongoose;

const KeysSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true
    },
})

export default mongoose.model("Kkey", KeysSchema)