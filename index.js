import express from "express";
import { connectToDatabase } from "./config/mongoose.js";
import ejsLayouts from'express-ejs-layouts'; 
import path from 'path'
import {home} from './src/controller/home.js';
import {create} from './src/controller/home.js';
import { toggleStatus } from "./src/controller/home.js";
import { deleteHabit }from "./src/controller/home.js";
import { weekView,toggleStatusw }from "./src/controller/home.js";




const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(express.static('src/views'));

app.set('view engine', 'ejs');
//app.set('views', './views');
app.set('views', path.join(path.resolve(),'src','views'));

const port = 8000;
app.get('/',home);

app.post('/habits/createHabit',create);
app.get('/habits/deleteHabit',deleteHabit);
app.post('/habits/toggleStatus',toggleStatus);
app.post('/habits/toggleStatusw',toggleStatusw);
app.get('/habits/weeklyView',weekView);

app.listen(port,()=>{
    console.log("server started at port 8000");
    connectToDatabase();
})