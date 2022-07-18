import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    images:{
        type: [String],
    },
    title:{
        type: String,
        required: true
    },
    rooms:{
        type:  [String]
    },
    price:{
        type: Number,
        required: true
    },
})

export default mongoose.model("hotels", HotelSchema)