var https = require('https');

const reflechit = function (tpsdereflection, qui){
    return new Promise(function(resolve,reject){
        if(tpsdereflection < 200){
            reject("Je n'ai pas le temps moi "+ qui);
        }
        else{
            setTimeout(function () {
                resolve("Niquel "+ qui), tpsdereflection;
            })
        }
    })
}

// reflechit(200)
//     .then((reponse) => console.log(reponse))
//     .catch((error) => console.log("Error : " + error));

let myPArray = new Array();
myPArray.push(reflechit(3000, "toto"));
myPArray.push(reflechit(10000, "titi"));
myPArray.push(reflechit(15000, "trucmuche"));
myPArray.push(reflechit(1000, "flash"));

// Promise.all(myPArray)
//     .then((reponse) => console.log(reponse))
//     .catch((error) => console.log("Error : " + error));

Promise.race(myPArray)
    .then((reponse) => console.log(reponse))
    .catch((error) => console.log("Error : " + error));