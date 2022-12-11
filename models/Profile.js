const {model, Schema } = require('mongoose');

const profileSchema = new Schema({
    firstname:String,
    lastName:String,
    phone:String,
    avatar:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
})

export const Profile = model('Profile', profileSchema);