require("dotenv").config()
import express, { Express, Router, Response, Request } from "express";
import * as client  from "./fetchFromWeb";
import path from "path";

// const mongoose = require('mongoose');

// const {Client} = require("pg")

// const pgclient = new Client({
//     user: 'postgres',
//     host: 'pdb',
//     database: 'postgres',
//     password: 'postgres@1234',
//     port: 5432,
// })

// pgclient.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// if (process.env.MONGO==1)
// main().catch(err => console.log(err));
// else console.log("Mongodb not required");

// async function main() {
// 	  await mongoose.connect('mongodb://mongo:27017/test');
// 	console.log("DB Connected");
// }


var app:Express = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req:Request,res:Response) => {
    const fileDir = path.join(__dirname, 'public');

    res.sendFile("index.html", {root:fileDir}, err=> {
        res.end();
        // if (err)
    })
})

var router = express.Router()

router.get("/", async(req,res) => {
    // console.log("get");
    res.status(200).json(client.getAll())
})
router.get("/:code", async(req,res) => {
    const {code} = req.params;
    const move = client.getDataByMoveCode(code);
    if (move===undefined) {
        res.status(404).json({message: "Code not found"})
        res.end();
    }
    else res.status(200).json(move.toObject())
})

app.use("/api", router);

app.all("*", (req,res)=> {
    res.status(404).json({message: `Invalid request for ${req.url}`})
})


const port = process.env.PORT || 8000;
app.listen(port,async ()=> {
    try {
        await client.fetch();
    } catch(error) {
        let err = (error as Error);
        console.error(err.message);
        throw err;
    }
    // try {
        // fetch('https://www.chessgames.com/chessecohelp.html')
        // .then( async resp => {
        //     const body = await resp.text()
        // });
        // const body = await resp.text();
        // console.log(body);
    // } catch (error) {
        
    // }
    console.log(`Server is running @${port}`);
    // console.log(client.getDataByMoveName("C87"));
})
