const mongoose = require('mongoose');

const MONGODB_URI="mongodb+srv://juliaT:04081980@cluster0.klfzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

require('dotenv').config();
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true,}).then(() =>{
    console.log("DB connected");
}).catch((err) => console.log(err));