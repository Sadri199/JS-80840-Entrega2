//i - (i * 2) to change negative to positive
// Player Data 
const inventory = []

const equippedItem = []

let playerStatus = { //Change from Array to Object
    Name: "Hero",
    HP: 100,
    ATK: 20,
    DEF: 10,
    Gold: 20
}

let atkCounter = 0
let defCounter = 0

//Enemy Data
let instanceEnemy = []

let enemyDefeated = false
 
const enemies = []

let worldCounter = 1

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

//General Data
//Weapons ==>
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
const weapon3 = weaponPush("Golden Sword", 25, 15, 175)
const weapon4 = weaponPush("Gattling Gun", 999, 25, 1500)

// //Items ==>
// const items = []

// class Item {
//     static ID = 0
//     constructor (Name, HP, Price){
//         this.ID = ++Item.ID
//         this.Name = Name
//         this.HP = HP
//         this.Price = Price
//     }
// }

// const itemPush = (Name, HP, Price) => { //I don't know a way to DRY this part.
//     let itemData = new Item (Name, HP, Price)
//     items.push(itemData)
// }

// const item1 = itemPush("Healing Potion", 20, 10)
// const item2 = itemPush("Egg", 5, 5)
// const item3 = itemPush("Scroll of Rejuvenation", 100, 200)

//Extras ==>
let loop = false //Change to true to activate the Switch

// Functions
const nameEdit = (name) => { //Working!
    if (name != "" && name != null){
        playerStatus.Name = name
        let notify = document.createElement("p")
        notify.setAttribute("class", "notify")
        notify.innerHTML = `Your name will be "${playerStatus.Name}" from now on.`
        screen.appendChild(notify)
        screen.removeChild(inputName)
    }
    else{
        let notify = document.createElement("p")
        notify.innerHTML = `I'll guess I will call you "${playerStatus.Name}" since you didn´t chose a name.`
        screen.appendChild(notify)
        screen.removeChild(inputName)
    }
}

function backpackCheck (){ //Working!
    let backpack = document.createElement("div") //This renders your current Backpack
    backpack.setAttribute("id", "backpack-open")
    backpack.innerHTML = `\nHere are the current things in your Backpack:\n`
    screen.appendChild(backpack)

    inventory.forEach(weapon => { //This renders each weapon in Inventory
        let itemLoop = document.createElement("p")
        itemLoop.setAttribute("class", "weapon")
        itemLoop.innerHTML = `\nID: ${weapon.ID}\n Name: ${weapon.Name}\n 
        Atk: ${weapon.ATK}\n Def: ${weapon.DEF}\n Price: ${weapon.Price}\n`
        backpack.appendChild(itemLoop)
    })

    if (equippedItem != 0){ //This is to render the currently equipped weapon //Edit order with CSS
        let itemInHand = document.createElement("p")
        itemInHand.setAttribute("class", "weapon__equip")
        itemInHand.innerHTML = `\nHere is the thing you currently have equipped:\n
        \nID: ${equippedItem[0].ID}\n Name: ${equippedItem[0].Name}\n 
        Atk: ${equippedItem[0].ATK}\n Def: ${equippedItem[0].DEF}\n Price: ${equippedItem[0].Price}\n`
        backpack.appendChild(itemInHand)
        }
}

function statCheck () { //Working!
    let stats = document.createElement("div") //This renders your Stats
    stats.setAttribute("id", "stats-show")
    stats.innerHTML = `\nHere are your Stats:\n`
    screen.appendChild(stats)

    for(let stat in playerStatus) { //This renders each Stat of playerStatus
        let statLoop = document.createElement("p")
        statLoop.setAttribute("class", "stat")
        statLoop.innerHTML = `\n ${stat} - ${playerStatus[stat]}\n`
        stats.appendChild(statLoop)
    }
}

const equipAtt = (atk, def) => { //Working!
    //---First the stats are reset to the base stats.
    let baseAtk = playerStatus.ATK = 20
    let baseDef = playerStatus.DEF = 10
    playerStatus = {...playerStatus, ATK: baseAtk, DEF: baseDef}
    //---Then the new stats are directly modified in the stats array.
    let sumAtk = playerStatus.ATK + atk 
    let sumDef = playerStatus.DEF + def
    playerStatus = {...playerStatus, ATK: sumAtk, DEF: sumDef}

}

function equip (id){ //Working!
    let item = inventory.find(obj => obj.ID === id)
    let onlyId = inventory.findIndex(obj => obj.ID === id)

    if (onlyId != -1){
            if (equippedItem != 0){
                inventory.push(equippedItem[0])
            }
            inventory.splice(onlyId,1)
            equippedItem.push(item)

            let notify = document.createElement("p")
            notify.setAttribute("class", "notify")
            notify.innerHTML = `You removed ${item} from your Backpack! \nYou added ${equippedItem[0]} to your hand!\n`
            screen.appendChild(notify)
            equipAtt(item.ATK, item.DEF)
            screen.innerText = `\nDone equipping, returning to main menu.\n`
    }
    else{
        screen.innerText = `You don't have that item in your inventory, returning to main menu.\n`
    }
}

const critAtk = () => { //Working!
    atkCounter = Math.floor(Math.random()*4)

    let notify = document.createElement("p")
        notify.setAttribute("class", "notify")

    if (atkCounter == 2){
        let currentAtk = playerStatus.ATK * 1.5
        notify.innerHTML = `Your Attack rises! \n`
        screen.appendChild(notify)
        return currentAtk
    }
    else if (atkCounter == 3){        
        let currentAtk = playerStatus.ATK * 2
        notify.innerHTML = `Your Attack reaches its limits! \n`
        screen.appendChild(notify)
        return currentAtk
    }
    else{
        let currentAtk = playerStatus.ATK 
        notify.innerHTML = `Your Attack stays the same. \n`
        screen.appendChild(notify)
        return currentAtk
    }
}

const critDef = () => { //Working!
    defCounter = Math.floor(Math.random()*4)

    let notify = document.createElement("p")
        notify.setAttribute("class", "notify")

    if (defCounter == 2){
        let currentDef = playerStatus.DEF * 1.5
        notify.innerHTML = `Your Defense rises! \n`
        screen.appendChild(notify)
        return currentDef
    }
    else if (defCounter == 3){
        let currentDef = playerStatus.DEF * 2
        notify.innerHTML = `Your Defense reaches its limits! \n`
        screen.appendChild(notify)
        return currentDef
    }
    else{
        let currentDef = playerStatus.DEF 
        notify.innerHTML = `Your Defense stays the same. \n`
        screen.appendChild(notify)
        return currentDef
    }
}

const chooseEnemy = () => { //Test, should work
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

const assignEnemy = (enemy) =>{ //Test, should work
    let difficulty = Math.ceil(Math.random()*worldCounter)
    let i = Math.ceil(Math.random()*10)

    switch(difficulty){
        case 1:
            instanceEnemy = enemies[0] //Goblin
            worldCounter ++
            break
        case 2:
            if (i < 5){
                instanceEnemy = enemies[0]
                worldCounter ++
            }
            else{
                instanceEnemy = enemies[1] //Bear
                worldCounter ++
            }
            break
        case 3:
            if (i < 2){
                instanceEnemy = enemies[0]
                worldCounter ++
            }
            else if(i > 3 && i < 7){
                instanceEnemy = enemies[1]
                worldCounter ++
            }
            else{
                instanceEnemy = enemies[2] //Dragon
                worldCounter ++
            }
            break
        default:
            goodEnd(enemy)
    }
    return instanceEnemy
}

const notNegative = (value) => { //Working!
    if (value < 0){
        let newValue = value - (value * 2)
        return newValue
    }
    else{
        return value
    }
}

const attackCalc = (enemy) =>{ //Test, should work
    let extraAtk = critAtk() //First calculates
    let atkDifference = extraAtk - instanceEnemy.DEF
    let realAtk = notNegative(atkDifference)
    let hpRemain = instanceEnemy.HP - realAtk
    instanceEnemy.HP = hpRemain
    
    let notify = document.createElement("p") //Then renders
    notify.setAttribute("class", "notify")
    notify.innerHTML = `You attack the ${enemy}!!\n
    The difference between your attack "${extraAtk}" and the enemy's defense "${instanceEnemy.DEF}" is ${realAtk} !\n
    The current HP of the ${enemy} is ${hpRemain} !\n`
    screen.appendChild(notify)
}

const defenseCalc = (enemy) =>{ //Test, should work
    let extraDef = critDef() //First calculates
    let defDifference = extraDef - instanceEnemy.ATK
    let realDef = notNegative(defDifference)
    let hpRemain = playerStatus.HP - realDef
    playerStatus.HP = hpRemain
    
    let notify = document.createElement("p") //Then renders
    notify.setAttribute("class", "notify")
    notify.innerHTML = `The ${enemy} attacks you!!\n
    The difference between your defense "${extraDef}" and the enemy's attack "${instanceEnemy.ATK}" is ${realDef} !\n
    Your current HP are ${hpRemain} !\n`
    screen.appendChild(notify)
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

//---------Start of the game---------
inventory.push(weapons[0], weapons[1]) //At the beginning of the game this items are added.

const screen = document.getElementById("screen")
screen.innerText = ":D \nThat is you, someone looking for treasure and stuff, but...\nYou never said your name, what should I call you?\n"

let inputName = document.createElement("form")
inputName.setAttribute("id", "name-form")
inputName.innerHTML = `<label for="name-field"> Enter your name here: </label>
<input type="text" id="name-field" name="name-field">
<input type="button" id="button-name" value="Done!"> `
screen.appendChild(inputName) //First the parent, then the child

let nameField = document.getElementById("name-field")
let nameButton = document.getElementById("button-name")
nameButton.onclick = () =>{
    const nameEntered = nameField.value
    nameEdit(nameEntered)
    screen.innerText = `\n${playerStatus.Name}, you have entered the forbidden cave, where great treasures await for those who are brave enough.\n` //reference for interactions
    localStorage.setItem("UserName", playerStatus.Name)
}

//---------Main Menu---------

//=> Primero va Inventory
const backpack = document.getElementById("backpack")
backpack.onclick = () => {
    //------Open Backpack, show what you have.
    screen.innerText = ""
    backpackCheck()
    let tempMessage = document.createElement("p")
    tempMessage.setAttribute("class", "tempMessage")
    tempMessage.innerText = "Do you want to equip an item?"
    screen.appendChild(tempMessage)
    //------First decision, equip
    let tempButtonEquip = document.createElement("button")
    tempButtonEquip.setAttribute("class", "temp")
    tempButtonEquip.innerText = "Equip"
    screen.appendChild(tempButtonEquip)
    tempButtonEquip.onclick = () => {
        let inputItem = document.createElement("form")
        inputItem.setAttribute("id", "item-form")
        inputItem.innerHTML = `<label for="item-field"> Please enter the ID of the corresponding Item: </label>
        <input type="number" id="item-field" name="item-field">
        <input type="button" id="button-item" value="Equip!"> `
        screen.appendChild(inputItem)
        let itemField = document.getElementById("item-field")
        let itemButton = document.getElementById("button-item")
        itemButton.onclick = () =>{
            const itemId = parseInt(itemField.value)
            equip(itemId)
            }
        tempButtonEquip.remove()
        tempButtonReturn.remove()
    }
    //------Second decision, return
    let tempButtonReturn = document.createElement("button")
    tempButtonReturn.setAttribute("class", "temp")
    tempButtonReturn.innerText = "Return"
    screen.appendChild(tempButtonReturn)
    tempButtonReturn.onclick = () => {
        screen.innerText = "Ok! Returning to main menu.\n"
        tempButtonEquip.remove()
        tempButtonReturn.remove()
    }
    //------Finally, save the current backpack.
    localStorage.setItem("Backpack", inventory)
}

//=> Segundo va Stats (esperemos que sea más corto)
const stats = document.getElementById("stats")
stats.onclick = () => {
    screen.innerText = ""
    statCheck()
}

//=> Tercero las peleas y el botón Dynamic (ahora viene lo heavy)
const action = document.getElementById("action")
action.onclick = () => {
    //milanesa
}






// while (loop) {
// switch (prompt("What are you going to do?\n1 to check your inventory\n2 to check your stats\n3 to advance through the cave\n4 to exit the game.")){
//     case "1":
//         backpackCheck()
//         let decisionEq = prompt("Do you want to equip an item? yes or no").toLowerCase()
//         if (decisionEq == "yes"){
//             equip(prompt("Grab an item from your inventory and equip it to your hand!\n").toLowerCase())
//         }
//         else{
//             console.log("No? Ok! Returning to main menu.\n")
//         }
//         break
//     case "2":
//         statCheck()
//         break
//     case "3": 
//         loopBattle()
//         break
//     case "4":
//         console.log("Goodbye, see you soon :)")
//         loop = false
//         break
//     case "5":
//         console.log("Debug mode, it gives a gattling gun.")
//         inventory.push("gattling gun")
//         break
//     default:
//         console.log("Please choose an available option.")
// }
// }

//---------Testing---------

//nameEdit(prompt('Please type your name or press "Ok" to continue with the default value: \n'))
// equip(prompt("Grab an item from your inventory and equip it to your hand!\n").toLowerCase())
// console.log(`This is your current equipped item: ${equippedItem}\n`)
// statCheck()
// backpackCheck()
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

// const testArray = [1, 2, 3]
// const testFind = testArray.find(pepino => pepino === 3)
// console.log(testFind)
