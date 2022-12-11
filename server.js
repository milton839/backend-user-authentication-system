const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(routes)

const port = process.env.PORT || 5000;



app.get('/private', authenticate, async(req, res) => {
    console.log("I am the user", req.user);
    return res.status(200).json({message: 'I am a private route'})
})
app.get('/public', (req, res) => {
    res.status(200).json({ message: 'I am a private route' })
})

app.get('/', (req, res) => {
    res.send("Student Attendence Project Starting....");
})

app.use((error, req, res, next) => {
    console.log(error);
    const message = error.message ? error.message : 'Server error occured';
    const status = error.status ? error.status : 500;
    return res.status(status).json({ message });
})

connectDB('mongodb://localhost:27017/attendence-db')
    .then(() => {
        console.log('Database Connected');
        app.listen(port, () => {
            console.log("Server Starting at " + port);
        })
    })
    .catch((e) => console.log(e))
