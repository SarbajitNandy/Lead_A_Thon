require("dotenv").config()
const express = require("express")
const client = require("./fetchFromWeb")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var app = express();

var router = express.Router()

router.get("/", async(req,res) => {
    // console.log("get");
    res.status(200).json({all: client.getAll()})
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
const port = process.env.PORT || 3000;
app.listen(port,async ()=> {
    try {
        await client.fetch();
    } catch(err) {
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