import fs from 'fs';
import util from 'util';

// fs.readFile('./messages.json', (err, data) => {
//     if(err) {
//         console.log(data)
//     } else {
//         console.log("DEU TUDO ERRADO SOCORRO")
//     }
// })

// const readFilePromise = util.promisify(fs.readFile)

// readFilePromise('./messages.json')
// .then((data: any) => {
//     console.log(data.toString())   
// })
// .catch( (err: any) => {
//     console.log("DEU TUDO ERRADO SOCORRO")
//     console.log(err)
// })

const readFilePromise = (filePath: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

readFilePromise('./messages.json')
.then((data: any) => {
    console.log(data.toString())   
})
.catch((err: any) => {
    console.log("DEU TUDO ERRADO SOCORRO")
    console.log(err)
})