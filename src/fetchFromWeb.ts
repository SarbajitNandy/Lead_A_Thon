import axios from "axios";
import * as cheerio from "cheerio";
import ChessMove from "./model";

const link = 'https://www.chessgames.com/chessecohelp.html'
var fetchedData: {[key:string]:ChessMove} = {};

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
const fetch = () => {
    return new Promise( async (resolve,reject) => {
        try {
            const resp =await axios(link);
            const html = await resp.data;
            const $ = cheerio.load(html);
        
                const datarow = $("table tbody tr");
                // let l = {};
                datarow.each((r:number,data:any) => {
                    
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
};

const getAll = ():Object[] => Object.values(fetchedData).map(each => each.toObject());
const getDataByMoveCode = (moveName:string) => fetchedData[moveName];

export { fetch,getAll,getDataByMoveCode }
