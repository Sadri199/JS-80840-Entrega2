// Player Data
const inventory = ["short sword", "banana"]
const equippedItem = []

let playerStatus = [
    ["HP", 100],
    ["ATK", 20],
    ["DEF", 10],
    ["Name", "Hero"]
]

let atkCounter = 0
let defCounter = 0

// Enemy Data
const enemies = ["Goblin", "Bear", "Dragon"]

const instanceEnemy = []

const goblinStats = [
    ["HP", 25],
    ["ATK", 5],
    ["DEF", 5]
]

const bearStats = [
    ["HP", 75],
    ["ATK", 25],
    ["DEF", 20]
]

const dragonStats = [
    ["HP", 750],
    ["ATK", 75],
    ["DEF", 100]
]
//General Data

const itemStatDatabase =[
    ["short sword", 10],
    ["banana", 5],
    ["gattling gun", 999]
]
// Functions
const nameEdit = (name) => {
    if (name != "" && name != null){
        playerStatus.splice(3,1,["Name",name])
        console.log("Your name will be" + " " + playerStatus[3][1])
    }
    else{
        console.log("Your name will be" + " " + playerStatus[3][1])
    }
}

function statCheck () { //Working
    console.log("Here are your Stats:\n")
    for (let playerStat of playerStatus){
        console.log(playerStat.join(" - "))
    }
}

function inventoryCheck (){ //Working
    console.log("Here is your Inventory:\n")
    console.log(inventory.join(" - "))
}

const equipAtk = (item) => { //Working
    for (let [name,stat] of itemStatDatabase){
        let validate = name.includes(item)

        if (validate){
            let sumAtk = playerStatus[1][1] + stat
            console.log(sumAtk)
            playerStatus.splice(1,1,["ATK",sumAtk])
            console.log(playerStatus)
        }
    }
}

function equip (item){ //Working
    let exist = inventory.indexOf(item)

    if (exist != -1){
        inventory.splice(exist,1)
        equippedItem.push(item)
        console.log(`You removed ${item} from inventory! \nYou added ${item} to your hand!\n`)
        equipAtk(item)
    }
    else{
        console.log("You don't have that item in your inventory.\n")
    }
}

const critAtk = () => { //Working
    atkCounter ++

    if (atkCounter == 2){
        let currentAtk = playerStatus[1][1] * 1.5
        console.log("Your Attack rises! \n")
        return currentAtk
    }
    else if (atkCounter == 3){
        let currentAtk = playerStatus[1][1] * 2
        console.log("Your Attack reaches its limits! \n")
        atkCounter = 0
        return currentAtk
    }
    else{
        let currentAtk = playerStatus[1][1]
        console.log("Your Attack stays the same. \n")
        return currentAtk
    }
}

const critDef = () => { //Working
    defCounter ++

    if (defCounter == 2){
        let currentDef = playerStatus[2][1] * 1.5
        console.log("Your Defense rises! \n")
        return currentDef
    }
    else if (defCounter == 3){
        let currentDef = playerStatus[2][1] * 2
        console.log("Your Defense reaches its limits! \n")
        return currentDef
    }
    else{
        let currentDef = playerStatus[2][1]
        console.log("Your Defense stays the same. \n")
        return currentDef
    }
}

const attackCalc = (enemy) =>{ //Making
    instanceEnemy = enemy
    //Switch para distinguir tipo de enemigo y clonar array a instance enemy


    critAtk()
    let atkDifference = playerStatus[1][1] - enemy[2][1]
    let hpRemain = atkDifference - enemy[0][1]

}
//loops and Calls


//Testing

//nameEdit(prompt('Please type your name or press "Ok" to continue with the default value: \n'))

// equip(prompt("Grab an item from your inventory and equip it to your hand!\n").toLowerCase())
// console.log(`This is your current equipped item: ${equippedItem}\n`)
// statCheck()
// inventoryCheck()

//critAtk()
// critDef()


// let prueba = playerStatus[1][1] + itemStatDatabase[0][1]
// playerStatus.splice(1,1,["ATK",prueba])
// console.log(playerStatus)
// let prueba = prompt("Que tipo de dato devuelve un prompt vacio?")
// console.log(prueba)
// console.log (typeof prueba)