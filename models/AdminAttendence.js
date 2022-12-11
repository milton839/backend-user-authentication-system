const { model, Schema } = require('mongoose');

const adminAttendanceSchema = new Schema({
    timeLimit: Number,
    status: String,
    createdAt: Date,
});

export const AdminAttandence = model('AdminAttandence')