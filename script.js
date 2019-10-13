/*function generateAge() {
    var age = 0;
    while (age < 18) {
        age = Math.floor((((Math.random() * 45) + (Math.random() * 45) + (Math.random() * 45) + (Math.random() * 45) +
            (Math.random() * 45) + (Math.random() * 45)) - 3) / 3);
    }
    document.getElementById("age").innerHTML = "Age: " + age;
}

generateAge();

 */

var num_sides = 6; // 6-sided die
var num_dice = 4; // number of dice to roll
var num_random = 0; // math.random roll
var num_smallest = 7; // smallest roll
var num_final = 0; // added dice rolls together
var num_x5 = 0; // final times 5
var num_biggest = 0; // biggest stat to generate profession
var num_index = [];

var stats = {"STR": 0, "CON": 0, "DEX": 0, "INT": 0, "POW": 0, "CHA": 0};
let statGenerate;
let professionList = [];
let charProfession;

let dataJSON = null;

function generateStats() {

    var statsit = 0;
    var sana = "statsit_";
    var sana_x5 = "statsit_x5_";

    for (var x in stats) {
        num_final = 0;
        num_random = 0;
        num_smallest = 7;

        for (var y = 0; y < num_dice; y++) {
            num_random = (Math.floor(Math.random() * num_sides + 1));

            num_final = num_final + num_random;

            if (num_random < num_smallest) {
                num_smallest = num_random;
            }
        }

        num_final = num_final - num_smallest;

        if (num_final > num_biggest) {
            num_index = [];
            num_biggest = num_final;
            num_index.push(x);
        }

        else if (num_final == num_biggest) {
            num_index.push(x);
        }

        stats[x] = num_final;
        num_x5 = num_final * 5;

        document.getElementById(sana + statsit).innerHTML = num_final;
        document.getElementById(sana_x5 + statsit).innerHTML = num_x5;
        statsit++;
    }

    statGenerate = num_index[Math.floor(Math.random() * num_index.length)];

    var hp = Math.floor((stats["STR"] + stats["CON"]) / 2) + ((stats["STR"] + stats["CON"]) % 2 > 0);
    var wp = stats["POW"];
    var san = stats["POW"] * 5;
    var bp = san - wp;

    document.getElementById("hp").innerHTML = hp;
    document.getElementById("wp").innerHTML = wp;
    document.getElementById("san").innerHTML = san;
    document.getElementById("bp").innerHTML = bp;
}

//load data from json
function loadJSON() {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            dataJSON = JSON.parse(xobj.responseText);
            professionGenerate();
        }
    };
    xobj.send(null);
}

function professionGenerate() {
    switch (statGenerate) {
        case "STR":
            professionList.push(dataJSON.profession[7], dataJSON.profession[8], dataJSON.profession[9],
                dataJSON.profession[20], dataJSON.profession[22], dataJSON.profession[23]);
            break;
        case "CON":
            professionList.push(dataJSON.profession[4], dataJSON.profession[7], dataJSON.profession[9],
                dataJSON.profession[20], dataJSON.profession[22], dataJSON.profession[23]);
            break;
        case "DEX":
            professionList.push(dataJSON.profession[5], dataJSON.profession[8], dataJSON.profession[9],
                dataJSON.profession[18], dataJSON.profession[19]);
            break;
        case "INT":
            professionList.push(dataJSON.profession[0], dataJSON.profession[1], dataJSON.profession[2],
                dataJSON.profession[3], dataJSON.profession[5], dataJSON.profession[6], dataJSON.profession[10],
                dataJSON.profession[11], dataJSON.profession[12], dataJSON.profession[13], dataJSON.profession[14],
                dataJSON.profession[15], dataJSON.profession[16], dataJSON.profession[17], dataJSON.profession[18],
                dataJSON.profession[19], dataJSON.profession[21]);
            break;
        case "POW":
            professionList.push(dataJSON.profession[4], dataJSON.profession[5], dataJSON.profession[7],
                dataJSON.profession[12], dataJSON.profession[16], dataJSON.profession[17], dataJSON.profession[20]);
            break;
        case "CHA":
            professionList.push(dataJSON.profession[4], dataJSON.profession[10], dataJSON.profession[12],
                dataJSON.profession[13], dataJSON.profession[14], dataJSON.profession[15], dataJSON.profession[16],
                dataJSON.profession[17], dataJSON.profession[21]);
            break;
        default:
            break;
    }
    charProfession = professionList[Math.floor(Math.random() * professionList.length)];
    document.getElementById("profession").innerHTML = "Profession: " + charProfession;
    skillsGenerate();
}

function skillsGenerate() {
    for (let i in dataJSON.skills){
        document.getElementById(i).innerHTML = dataJSON.skills[i];
    }

    for (let i in dataJSON){
        let searchReplacement = charProfession + "Skills";
        if (searchReplacement === i){
            for (let j in dataJSON[i]){
                let skills = dataJSON[i];
                document.getElementById(j).innerHTML = skills[j];
            }
        }
    }

    for (let i in dataJSON){
        let searchReplacement = charProfession + "OptionalSkills";
        let osa = charProfession + "OptionalSkillAmount";
        if (searchReplacement === i){
            if (osa) {
                let optSkill = dataJSON[searchReplacement];
                for (let j = 0; j < dataJSON[osa]; j++){
                    let keysLength = Object.keys(optSkill).length;
                    let keysRnd = Math.floor(Math.random() * (keysLength));
                    if (typeof Object.values(optSkill)[keysRnd] === 'object' ){
                        innerObject = Object.values(optSkill)[keysRnd];
                        document.getElementById(Object.keys(innerObject)[0]).innerHTML = Object.values(innerObject)[0];
                        document.getElementById(Object.keys(innerObject)[1]).innerHTML = Object.values(innerObject)[1];
                    }
                    else {
                        document.getElementById(Object.keys(optSkill)[keysRnd]).innerHTML = Object.values(optSkill)[keysRnd];
                    }
                    delete optSkill[Object.keys(optSkill)[keysRnd]];
                }
                let num = 1;
                while (num < 6){
                    const extraMover1 = document.getElementById("extra"+num+"title").innerHTML;
                    const extraMover2 = document.getElementById("extra"+(num+1)+"title").innerHTML;
                    if (!extraMover1 && extraMover2){
                        document.getElementById("extra"+num+"title").innerHTML
                          = document.getElementById("extra"+(num+1)+"title").innerHTML;
                        document.getElementById("extra"+num).innerHTML
                          = document.getElementById("extra"+(num+1)).innerHTML;
                        document.getElementById("extra"+(num+1)+"title").innerHTML = "";
                        document.getElementById("extra"+(num+1)).innerHTML = "";
                        num--;
                    }
                    else {
                        num++
                    }
                }
            }
        }
    }

    for (let i in dataJSON) {
        let bonds = dataJSON.bonds;
        let bondAmount = (charProfession + "Bonds");
        if (bondAmount === i) {
            for (let j = 0; j < dataJSON[i]; j++) {
                id = "bond" + (j+1);
                bond = bonds[Math.floor(Math.random() * bonds.length)];
                document.getElementById(id).innerHTML = bond;
                for(let k = bonds.length; k--;){
                    if ( bonds[k] === bond) bonds.splice(k, 1);
                }
            }
        }
    }
}

loadJSON();
generateStats();




