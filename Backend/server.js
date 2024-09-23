require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')
const db = require("./utils/db");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");

//Tackel Cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//Import Donor Router File
const donorRoutes = require('./routers/donarRoutes');
app.use('/donor', donorRoutes);

//Import Organization Router File
const organizationRoutes = require('./routers/organizationRoutes');
app.use('/organization', organizationRoutes);


app.get("/", (req, res) => {
    res.status(200).send("Hello Ahnaf Hasnain");
})

const PORT = 8000;

// Error Middleware 
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
})