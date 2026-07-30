const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Quesrouter = require('./routes/question')
const Goalrouter = require('./routes/goal')
const authRouter = require('./routes/auth')
const analyticRouter = require('./routes/analytics')

const mongo_url = process.env.MONGO_URL;

const app = express();
const PORT = process.env.PORT || 3000

mongoose.connect(mongo_url).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log("failed",err);
})

const cors = require('cors');
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://code-quest-phi-six.vercel.app"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' })
})


app.use(express.urlencoded({extended :false}));
app.use(express.json());
app.use('/question',Quesrouter);
app.use('/goal',Goalrouter);
app.use('/auth',authRouter);
app.use('/analytics',analyticRouter);

app.listen(PORT,()=>{
    console.log("PORT connected");
})