const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/user');
const patientRoutes = require('./src/routes/patient');

// create app
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/patient", patientRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        "GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE"
    );
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
});

app.get('/', (req, res) => {
    res.json({ msg: "welcome to the app" });
});

// setup server
const createServer = require("http").createServer;
const server = createServer(app);

// connect to mongodb
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {   
        server.listen(process.env.PORT, () => {
            console.log(`Connected to DB & listening for requests on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));

process.env