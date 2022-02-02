require("dotenv").config()
const express = require("express")
const client = require("./fetchFromWeb")
const path = require("path")

const mongoose = require('mongoose');
if (process.env.MONGO==1)
main().catch(err => console.log(err));
else console.log("Mongodb not required");

async function main() {
	  await mongoose.connect('mongodb://mongo:27017/test');
	console.log("DB Connected");
}


var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req,res) => {
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
