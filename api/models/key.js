import mongoose from 'mongoose';
const { Schema } = mongoose;

const KeySchema = new mongoose.Schema({
    key:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true
    },
    billingAddress:{
        type: String,
        required: true
    },
    numberOfNights:{
        type: Number,
        required: true
    },
    startDate:{
        type:String,
        required: true
    },
    endDate:{
        type:String,
        required: true
    },
    numberOfGuests:{
        type:Number,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    roomTypes:{
        type: String,
        required: true
    }
})

export default mongoose.model("key", KeySchema)