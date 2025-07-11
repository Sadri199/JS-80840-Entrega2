//i - (i * 2) to change negative to positive
// Player Data 
const inventory = ["short sword", "banana"]

const equippedItem = []

const playerStatus = { //Array to Object Change
    Name: "Hero",
    HP: 100,
    ATK: 20,
    DEF: 10
}

let atkCounter = 0
let defCounter = 0

// Enemy Data
let instanceEnemy = []

let enemyDefeated = false
 
const enemies = []

class Enemy {
    static ID = 0
    constructor (Name, HP, ATK, DEF, averageGold){
        this.ID = ++Enemy.ID
        this.Name = Name
        this.HP = HP
        this.ATK = ATK
        this.DEF = DEF
        this.averageGold = averageGold
    }
}

const enemyPush = (Name, HP, ATK, DEF, averageGold) => { //I don't know a way to DRY this part.
    let enemyData = new Enemy (Name, HP, ATK, DEF, averageGold)
    enemies.push(enemyData)
}

const enemy1 = enemyPush("Goblin", 25, 5, 5, 10)
const enemy2 = enemyPush("Bear", 75, 25, 20, 30) //How does a bear carries gold?
const enemy3 = enemyPush("Dragon", 750, 75, 100, 500)

console.log(enemies)
//General Data

const weapons =[]

class Weapon {
    static ID = 0
    constructor (Name, ATK, DEF, Price){
        this.ID = ++Weapon.ID
        this.Name = Name
        this.ATK = ATK
        this.DEF = DEF
        this.Price = Price
    }
}

const weaponPush = (Name, ATK, DEF, Price) => { //I don't know a way to DRY this part.
    let weaponData = new Weapon (Name, ATK, DEF, Price)
    weapons.push(weaponData)
}

const weapon1 = weaponPush("Short Sword", 10, 5, 15)
const weapon2 = weaponPush("Banana", 5, 0, 2)
const weapon3 = weaponPush("Gattling Gun", 999, 25, 1500)

console.log(weapons)

let loop = false //Change to true to activate the Switch

// Functions
const nameEdit = (name) => { //Edit!
    if (name != "" && name != null){
        playerStatus.splice(3,1,["Name",name])
        alert("Your name will be" + " " + playerStatus[3][1])
    }
    else{
        alert("Your name will be" + " " + playerStatus[3][1])
    }
}

function statCheck () { //Edit!
    console.log("Here are your Stats:\n")
    for (let playerStat of playerStatus){
        console.log(playerStat.join(" - "))
    }
}

function inventoryCheck (){ //Edit!
    console.log("Here is your Inventory:\n")
    console.log(inventory.join(" - "))
}

const equipAtk = (item) => { //Edit!
    for (let [name,stat] of itemStatDatabase){
        let validate = name.includes(item)

        if (validate){
            playerStatus.splice(1,1,["ATK",20])
            let sumAtk = playerStatus[1][1] + stat
            playerStatus.splice(1,1,["ATK",sumAtk])
        }
    }
}

function equip (item){ //Edit!
    let exist = inventory.indexOf(item)

    if (exist != -1){
        inventory.splice(exist,1)
        equippedItem.push(item)
        alert(`You removed ${item} from inventory! \nYou added ${item} to your hand!\n`)
        equipAtk(item)
    }
    else{
        console.log("You don't have that item in your inventory.\n")
    }
}

const critAtk = () => { //Edit!
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

const critDef = () => { //Edit!
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

const chooseEnemy = () => { //Edit!
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

const assignEnemy = (enemy) =>{ //Edit!
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
            goodEnd(enemy)
    }
    return instanceEnemy
}

const notNegative = (value) => { //Edit!
    if (value < 0){
        let newValue = value - (value * 2)
        return newValue
    }
    else{
        return value
    }
}

const attackCalc = (enemy) =>{ //Edit!
    console.log(`You attack the ${enemy}!!`)
    let extraAtk = critAtk()
    let atkDifference = extraAtk - instanceEnemy[2][1]
    let realAtk = notNegative(atkDifference)
    console.log(`The difference between your attack "${extraAtk}" and the enemy's defense "${instanceEnemy[2][1]}" is ${realAtk} !`)
    let hpRemain = instanceEnemy[0][1] - realAtk
    console.log(`The current HP of the ${enemy} is ${hpRemain} !`)
    instanceEnemy.splice(0,1,["HP", hpRemain])
}

const defenseCalc = (enemy) =>{ //Edit!
    console.log(`The ${enemy} attacks you!!`)
    let extraDef = critDef()
    let defDifference = extraDef - instanceEnemy[1][1]
    let realDef = notNegative(defDifference)
    console.log(`The difference between your defense "${extraDef}" and the enemy's attack "${instanceEnemy[1][1]}" is ${realDef} !`)
    let hpRemain = playerStatus[0][1] - realDef
    console.log(`Your current HP are ${hpRemain} !`)
    playerStatus.splice(0,1,["HP", hpRemain])
}

const winBattle = (enemy) => { //Edit!
    if (instanceEnemy[0][1] <= 0){
        console.log(`Wow, you defeated the ${enemy}!`)
        reward(enemy)
        enemyDefeated = true
        atkCounter = 0
        defCounter = 0
        return enemyDefeated 
    }
    else {
        console.log(`The ${enemy} can still fight!`)
    }
}

const badEnd = () => { //Edit!
    if (playerStatus[0][1] <= 0 ){
        console.log("You died :(\nGame over, please reload the page to start again!")
        loop = false
    }
}

const goodEnd = (enemy) =>{ //Edit!
    if (!enemy){
        console.log("Wow, you made it, you killed everybody!\n You also got some gold, but I forgot to add it to your inventory, so just pretend :)\nNow the game is over, you got the good ending!")
        loop = false
    }
}

const reward = (enemy) => { //Edit!
    if (enemy == "Bear" && instanceEnemy[0][1] <= 0){
        console.log("The bear dropped a 'gattling gun'.")
        inventory.push("gattling gun")
    }
}

const mainBattle = (enemy) =>{ //Edit!
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

const loopBattle = () =>{ //Edit!
    //El orden sería choose > assign > main battle > attackCalc > winBattle > defenseCalc > badEnd y loop
    console.log("You go further inside the cave.\nA shady figure is in front of you.\nYou illuminate with your torch and see a...")
    let actualEnemy = chooseEnemy()
    console.log(`A ${actualEnemy} appeared!`)
    assignEnemy(actualEnemy)
    let decision = (prompt("What will you do, would you 'fight' or will you try to escape?").toLowerCase())
        switch (decision){
            case "fight":
                console.log("Get ready to fight!\n")
                mainBattle(actualEnemy)
                break
            default:
                console.log("Going back to the main menu.")
                break
        }
}
//loops and Calls

//---------Start of the game---------
//nameEdit(prompt(":D that is you, someone looking for treasure and stuff, but...\nYou never said your name, what should I call you?"))
//console.log(`${playerStatus[3][1]}, you have entered the forbidden cave, where great treasures await for those who are brave enough.\n`)

//---------Main Menu---------
while (loop) {
switch (prompt("What are you going to do?\n1 to check your inventory\n2 to check your stats\n3 to advance through the cave\n4 to exit the game.")){
    case "1":
        inventoryCheck()
        let decisionEq = prompt("Do you want to equip an item? yes or no").toLowerCase()
        if (decisionEq == "yes"){
            equip(prompt("Grab an item from your inventory and equip it to your hand!\n").toLowerCase())
        }
        else{
            console.log("No? Ok! Returning to main menu.\n")
        }
        break
    case "2":
        statCheck()
        break
    case "3": 
        loopBattle()
        break
    case "4":
        console.log("Goodbye, see you soon :)")
        loop = false
        break
    case "5":
        console.log("Debug mode, it gives a gattling gun.")
        inventory.push("gattling gun")
        break
    default:
        console.log("Please choose an available option.")
}
}

//---------Testing---------

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
// let changeHP = playerStatus.HP - 10
// playerStatus.HP = changeHP
// console.log(playerStatus.HP)