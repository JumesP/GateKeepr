require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const env = process.env;

const app = express();
const PORT = env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// database connection (using mongoose)
mongoose.connect(env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
const authRouter = require("./src/routes/authRoutes");
app.use("/auth", authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
