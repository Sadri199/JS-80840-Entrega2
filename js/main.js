// Player Data
const inventory = ["short sword", "banana"]
const equippedItem = []

let playerStatus = [
    ["HP", 100],
    ["ATK", 20],
    ["DEF", 10],
    ["Name", "Hero"]
]

const atkCounter = 3
const defCounter = 0

// Enemy Data
const enemies = ["Goblin", "Bear", "Dragon"]

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
    ["banana", 5]
]
// Functions
function statCheck () {
    console.log("Here are your Stats:\n")
    console.log(playerStatus.join(" - "))
}

function inventoryCheck (){
    console.log("Here is your Inventory:\n")
    console.log(inventory.join(" - "))
}

const equipAtk = (item) => {
    let validate = itemStatDatabase.includes(item) //For of si no no está haciendo nada
    let index = itemStatDatabase.indexOf(item)
    
    if (validate){
        let sumAtk = playerStatus[1][1] + itemStatDatabase[index][1]
        console.log(sumAtk)
    }
    else{
        console.log("equipATK no está funcionando che")
    }
}

function equip (item){
    let exist = inventory.indexOf(item)

    if (exist != -1){
        inventory.splice(exist,1)
        equippedItem.push(item)
        console.log(`You removed ${item} from inventory! \nYou added ${item} to your hand!`)
        equipAtk(item)
    }
    else{
        console.log("You don't have that item in your inventory.")
    }
}

const critAtk = () => {
    if (atkCounter == 2){
        let currentAtk = playerStatus[1][1] * 1.5
        return currentAtk
    }
    else if (atkCounter == 3){
        let currentAtk = playerStatus[1][1] * 2
        return currentAtk
    }
    else{
        let currentAtk = playerStatus[1][1]
        return currentAtk
    }
}



//loops and Calls


//Testing

//inventoryCheck()
//critAtk()
equip(prompt("Grab an item from your inventory and equip it to your hand!").toLowerCase())
console.log(equippedItem)
statCheck()
// let prueba = playerStatus[1][1] + itemStatDatabase[0][1]
// playerStatus.splice(1,1,["ATK",prueba])
// console.log(playerStatus)