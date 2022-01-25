const request = require("request-promise")
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const ChessMove = require("./model");

const link = 'https://www.chessgames.com/chessecohelp.html'
var fetchedData = {};

// module.exports = {
//     fetch : () => {
//         return new Promise((resolve,reject) => {
//             request(link, (err,resp, html) => {
//                 if (err) { 
//                     console.error("Unable to fetch. Please try again.");
//                     reject(err);
//                 }
//                 else if (resp && resp.statusCode==200) {
//                     const $ = cheerio.load(html);
            
//                     const datarow = $("table tbody tr");
//                     // let l = {};
//                     datarow.each((r,data) => {
                        
//                         for (let c = 0; c < 2; c++) {
//                             const first = $(data.children[0]).text();
//                             const second = $(data.children[1]).text();
//                             // const [s1,s2] = second.split("\n");
//                             // l[fis]=$(second).text();
//                             // console.log(second.split("\n"));
//                             const s = second.split("\n");
//                             fetchedData[first]=new ChessMove(first, s[0],s[1]);
//                         }
                        
//                     })
            
//                     // for (const key in data) {
//                     //     console.log(`${key} => ${data[key]}`);
//                     // }
//                     // console.log(Object.entries(l));
//                     resolve(true);
//                 } else {
//                     let err = new Error("Status code should be 200. But received " + resp.statusCode);
//                     reject(err);
//                 }
//             })  
//         })
//     },
//     getAll : () => Object.values(fetchedData).map(each => each.toObject()),
//     getDataByMoveCode : (moveName) => fetchedData[moveName].toObject()
// }

module.exports = {
    fetch : () => {
        return new Promise( async (resolve,reject) => {
            try {
                const resp =await fetch(link);
                const html = await resp.text();
                const $ = cheerio.load(html);
            
                    const datarow = $("table tbody tr");
                    // let l = {};
                    datarow.each((r,data) => {
                        
                        for (let c = 0; c < 2; c++) {
                            const first = $(data.children[0]).text();
                            const second = $(data.children[1]).text();
                            // const [s1,s2] = second.split("\n");
                            // l[fis]=$(second).text();
                            // console.log(second.split("\n"));
                            const s = second.split("\n");
                            fetchedData[first]=new ChessMove(first, s[0],s[1]);
                        }
                        
                    })
                    resolve(true);
            } catch (error) {
                reject(error);
            } 
        })
    },
    getAll : () => Object.values(fetchedData).map(each => each.toObject()),
    getDataByMoveCode : (moveName) => fetchedData[moveName].toObject()
}
