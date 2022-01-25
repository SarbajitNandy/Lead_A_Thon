require("dotenv").config()
const express = require("express")
const client = require("./fetchFromWeb")
var app = express();

var router = express.Router()

router.get("/", async(req,res) => {
    // console.log("get");
    res.status(200).json({all: client.getAll()})
})
router.get("/:code", async(req,res) => {
    const {code} = req.params;
    const move = client.getDataByMoveCode(code);
    if (move==undefined) {
        res.status(404).json({message: "Code not found"})
    }
    res.status(200).json(move)
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
    console.log(`Server is running @${port}`);
    // console.log(client.getDataByMoveName("C87"));
})