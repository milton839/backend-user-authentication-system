const { model, Schema } = require('mongoose');

const studentAttendanceSchema = new Schema({
    createdAt: Date,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    adminAttendance:{
        type:Schema.Types.ObjectId,
        ref:'AdminAttendance'
    }
});

export const StudentAttandence = model('StudentAttandence')