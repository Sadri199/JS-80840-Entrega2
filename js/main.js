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

let instanceEnemy = []

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
            playerStatus.splice(1,1,["ATK",20])
            let sumAtk = playerStatus[1][1] + stat
            playerStatus.splice(1,1,["ATK",sumAtk])
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

const assignEnemy = (enemy) =>{ //Working
    switch(enemy){
        case "Goblin":
            instanceEnemy = goblinStats
            break
        case "Bear":
            instanceEnemy = bearStats
            break
        case "Dragon":
            instanceEnemy = dragonStats
            break
        default:
            console.log("That isn't a valid enemy, also you shouldn't be reading this...")
    }
    return instanceEnemy
}

const attackCalc = (enemy) =>{ //Working
    console.log(`You attack the ${enemy}!!`)
    critAtk()
    let atkDifference = playerStatus[1][1] - instanceEnemy[2][1]
    console.log(`The difference between your attack "${playerStatus[1][1]}" and the enemy's defense "${instanceEnemy[2][1]}" is ${atkDifference} !`)
    let hpRemain = instanceEnemy[0][1] - atkDifference
    console.log(`The current HP of the ${enemy} is ${hpRemain} !`)
    instanceEnemy.splice(0,1,["HP", hpRemain])
    console.log(instanceEnemy)
}

const defenseCalc = (enemy) =>{ //Working
    console.log(`The ${enemy} attacks you!!`)
    critDef()
    let defDifference = playerStatus[2][1] - instanceEnemy[1][1]
    console.log(`The difference between your defense "${playerStatus[2][1]}" and the enemy's attack "${instanceEnemy[1][1]}" is ${defDifference} !`)
    let hpRemain = playerStatus[0][1] - defDifference
    console.log(`Your current HP are ${hpRemain} !`)
    playerStatus.splice(0,1,["HP", hpRemain])
    console.log(playerStatus)
}

const winBattle = (enemy) => { //Working
    if (instanceEnemy[0][1] <= 0){
        console.log(`Wow, you defeated the ${enemy}!`)
        enemyDefeated = true
        return enemyDefeated 
    }
    else {
        console.log(`The ${enemy} can still fight!`)
    }
}

const badEnd = () => { //Working
    if (playerStatus[0][1] <= 0 ){
        console.log("You died :(")
    }
}

const chooseEnemy = () => { //Making
    let enemyDefeated = false
    if (enemyDefeated) {
        enemies.shift()
        let enemy = enemies[0]
        enemyDefeated = false
        return enemy
    }
    else{
        let enemy = enemies[0]
        return enemy
    }
}

//El orden sería choose > assign > main battle > attackCalc > winBattle > defenseCalc > badEnd y loop

const mainBattle = (enemy) =>{ //Working
    attackCalc(enemy)
    console.log(`Checking if the creature is still alive...`)
    winBattle(enemy)
    if (enemyDefeated){
        console.log("After the creature's death you rest for a bit before continuing your mission")
        playerStatus.splice(0,1,["HP", 100])
    }
    else{
        defenseCalc(enemy)
        badEnd()
    }
}
//loops and Calls

//---------Start of the game---------
nameEdit(prompt(":D that is you, someone looking for treasure and stuff, but...\nYou never said your name, what should I call you?"))
console.log(`${playerStatus[3][1]}, you have entered the forbidden cave, where great treasures await for those who are brave enough.\n`)

//switch para el menú principal
let loop = true
    while (loop) {
    switch (prompt("What are you going to do?\n1 to check your inventory\n2 to check your stats\n3 to advance through the cave\n4 to exit the game.")){
        case "1":
            inventoryCheck()
            let decisionEq = prompt("Do you want to equip an item? yes or no").toLowerCase()
            if (decisionEq == "yes"){
                equip(prompt("Grab an item from your inventory and equip it to your hand!\n").toLowerCase())
            }
            else{
                console.log("Returning to main menu.")
            }
            break
        case "2":
            statCheck()
            break
        case "3":
            console.log("Not yet.") //start the fight loop, think about rewards and where implement them, maybe a separate function inside win?
            loop = false
            break
        case "4":
            console.log("Goodbye, see you soon :)")
            loop = false
            break
        default:
            console.log("Please choose an available option.")
    }
}


//Testing

//nameEdit(prompt('Please type your name or press "Ok" to continue with the default value: \n'))

// equip(prompt("Grab an item from your inventory and equip it to your hand!\n").toLowerCase())
// console.log(`This is your current equipped item: ${equippedItem}\n`)
// statCheck()
// inventoryCheck()

//critAtk()
//critDef()
// attackCalc("Goblin")
// assignEnemy("Goblin")
// defenseCalc("Goblin")




//badEnd()

// let prueba = playerStatus[1][1] + itemStatDatabase[0][1]
// playerStatus.splice(1,1,["ATK",prueba])
// console.log(playerStatus)
// let prueba = prompt("Que tipo de dato devuelve un prompt vacio?")
// console.log(prueba)
// console.log (typeof prueba)