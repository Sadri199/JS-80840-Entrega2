//-----Downloaded Data----- //Im here, have to see if it works or not
const URL = "https://688e5da1a459d5566b14c3ac.mockapi.io/api/v1/" //Starting to build the connection

let weaponsDownloaded = false
let enemiesDownloaded = false
let toastData = [] //Empty array to capture all the values from dynamicFinally

function getEnemies (){
    fetch (URL + "enemy")
    .then(response => {
      if (response.ok){
        return response.json()}     
      throw new Error ("Something went wrong, data from Enemy Database couldn't not be accessed!") //The catch from below only triggers for type errors, not for http errors.
      })
    .then(data => {
        enemiesDownloaded = true
        toastData = dynamicFinally("Enemy Database")
        const enemyList = data
        confirmNotify("Enemy Database")
        return enemyList})
    .catch((err) => errorNotify(err),
      toastData = dynamicFinally("Weapon Database"))
    .finally(()=>  setTimeout(()=> {
      finallyNotify(toastData[0],toastData[1],toastData[2])}, 1500))
}
function getWeapons (){
    fetch (URL + "weapon")
    .then(response => {
      if (response.ok){
        return response.json()}     
      throw new Error ("Something went wrong, data from Weapon Database couldn't not be accessed!") //The catch from below only triggers for type errors, not for http errors.
      })
    .then(data => {
        weaponsDownloaded = true
        toastData = dynamicFinally("Weapon Database")
        const weaponList = data
        confirmNotify("Weapon Database")
        return weaponList})
    .catch((err) => errorNotify(err),
      toastData = dynamicFinally("Weapon Database"))
    .finally(() => 
      setTimeout(()=> {
      finallyNotify(toastData[0],toastData[1],toastData[2])}, 1500)
      )
}

//-----Toastify notifications go here-----
const errorNotify = (text) => { 
  Toastify({
    text: text,
    duration: -1,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    className: "pop-up",
    style:{
      background: "#91230aff",
      color: "#e8e0e0ff"
    },
  }).showToast();
}

const confirmNotify = (text) => { 
  Toastify({
    text: `Data from ${text} is being downloaded.`,
    duration: 1500,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    className: "pop-up",
    style:{
      background: "#230903",
    },
  }).showToast();
}

const finallyNotify = (text, duration, style) => { 
  Toastify({
    text: text,
    duration: duration,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    className: "pop-up",
    style: style
  }).showToast();
}

const dynamicFinally = (db) => {
  if (!enemiesDownloaded || !weaponsDownloaded){
    let text = `A Critical Error occured and the data from ${db} wasn't downloaded correctly. The game will not run.`
    let duration = -1
    let style = {
      background: "#91230aff",
      color: "#e8e0e0ff"
    }
    return [text, duration, style]
  }
  else if (enemiesDownloaded || weaponsDownloaded){
    let text = `All data from ${db} has being downloaded correctly.`
    let duration = 3500
    let style = {
      background: "#230903",
    }
    return [text, duration, style]
  }
}
const savedWeapon = getWeapons()
const savedEnemy = getEnemies()
//-----Downloaded Data-----

//-----Static Data-----
//-----Player Data-----
//Because i can't POST, all Player Data will be saved in localStorage

const inventory = []

const equippedItem = []

const score = {
    Goblin: 0,
    Bear: 0,
    Dragon: 0
}

const gameOver = {
    GoodEnding: false,
    BadEnding: false,
    ExitEnding: false
}

let worldCounter = 0

let playerStatus = { 
    Name: "Hero",
    HP: 100,
    ATK: 20,
    DEF: 10,
    Gold: 20
}

let atkCounter = 0
let defCounter = 0

//-----Enemy Data-----
let instanceEnemy = []

let enemyDefeated = false


const enemies = [ //Change from Constructor to Array of Object Literals
    {   
        ID: 0,
        Name: "Goblin",
        HP: 25,
        ATK: 5,
        DEF: 5,
        Gold: 10
    },
    {   
        ID: 1,
        Name: "Bear",
        HP: 75,
        ATK: 25,
        DEF: 20,
        Gold: 30
    },
    {   
        ID: 2,
        Name: "Dragon",
        HP: 750,
        ATK: 75,
        DEF: 50,
        Gold: 500
    }
]

let bearToken = false
let dragonMedal = false

//-----Weapon Data-----

const weapons =[ //Change from Constructor to Object Literal
    {
        ID: 0,
        Name: "Short Sword",
        ATK: 10,
        DEF: 5,
        Price: 15
    },
    {
        ID: 1,
        Name: "Banana",
        ATK: 5,
        DEF: 0,
        Price: 2
    },
    {
        ID: 2,
        Name: "Golden Sword",
        ATK: 25,
        DEF: 15,
        Price: 175
    },
    {
        ID: 3,
        Name: "Gattling Gun",
        ATK: 999,
        DEF: 25,
        Price: 1500
    },
]
//-----Static Data-----

//-----Functions-----
const nameEdit = (name) => { //Working!
        if (name != "" && name != null){
            playerStatus.Name = name
            let notify = document.createElement("p")
            notify.setAttribute("class", "notify")
            notify.innerHTML = `Your name will be "${playerStatus.Name}" from now on.`
            screen.appendChild(notify)
            screen.removeChild(inputName)
            }
    }

function backpackCheck (){ //Working!
    let backpack = document.createElement("div") //This renders your current Backpack
    backpack.setAttribute("id", "backpack-open")
    let backpackMessage = document.createElement("p")
    backpackMessage.setAttribute("class", "tempMessage")
    backpackMessage.setAttribute("id", "backpackMessage")
    backpackMessage.innerHTML = `\nHere are the current things in your Backpack:\n`
    screen.appendChild(backpack)
    backpack.appendChild(backpackMessage)

    inventory.forEach(weapon => { //This renders each weapon in Inventory
        let itemLoop = document.createElement("p")
        itemLoop.setAttribute("class", "weapon")
        itemLoop.setAttribute("id", "itemLoop")
        itemLoop.innerHTML = `\nID: ${weapon.ID}\n Name: ${weapon.Name}\n 
        Atk: ${weapon.ATK}\n Def: ${weapon.DEF}\n Price: ${weapon.Price}\n`
        backpack.appendChild(itemLoop)
    })

    if (equippedItem != 0){ //This is to render the currently equipped weapon
        let itemInHand = document.createElement("p")
        itemInHand.setAttribute("class", "weapon__equip")
        itemInHand.setAttribute("id", "itemInHand")
        itemInHand.innerHTML = `\nHere is the thing you currently have equipped:\nName: ${equippedItem[0].Name}\n 
        Atk: ${equippedItem[0].ATK}\n Def: ${equippedItem[0].DEF}\n`
        backpack.appendChild(itemInHand)
        }
}

function statCheck () { //Working!
    let stats = document.createElement("div") //This renders your Stats
    stats.setAttribute("id", "stats-show")
    stats.innerHTML = `\nHere are your Stats:\n`
    screen.appendChild(stats)

    Object.keys(playerStatus).forEach(key => {
        let statLoop = document.createElement("p")
        statLoop.setAttribute("class", "stat")
        statLoop.innerHTML = `\n ${key} - ${playerStatus[key]}\n`
        stats.appendChild(statLoop)
    })
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
            equippedItem.pop() //We take the previous object
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
        let currentAtk = Math.ceil(playerStatus.ATK * 1.5)
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
        let currentDef = Math.ceil(playerStatus.DEF * 1.5)
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

const chooseEnemy = () => { //Working!
    if (enemyDefeated) {
        let randomNumber = Math.floor(Math.random()*10)
        let enemy = enemyRandomizer(randomNumber)
        enemyDefeated = false
        return enemy
    }
    else{
        let enemy = enemyRandomizer() //First fight is a Goblin, mandatory, like a tutorial
        return enemy
    }
}

const enemyRandomizer = (randomNumber) =>{//Working!

    switch (worldCounter){
        case 0:
            let tutorial = enemies[0]
            return tutorial
        case 1:
            if (randomNumber <= 5) {
                let enemy = enemies[0]
                return enemy
            }
            else{
                let enemy = enemies[1] //Bear
                return enemy
            }
        case 2:
            if (randomNumber <= 2){
                let enemy = enemies[0]
                return enemy
            }
            else if (randomNumber >= 3){
                let enemy = enemies[1]
                return enemy
            }
        case 3:
            if (randomNumber < 6){
                let enemy = enemies[1]
                return enemy
            }
            else{
                let enemy = enemies[2]
                return enemy
            }
        default:
            let enemy = enemies[2]
            return enemy
        }
}

const assignEnemy = (enemy) =>{ //Working! not happy with this one...
    let enemyId = enemy.ID
    switch(enemyId){
        case 0:
            instanceEnemy = enemy //Golbin
            break
        case 1:
            instanceEnemy = enemy //Bear
            break
        case 2:
            instanceEnemy = enemy //Dragon
            break
        default: //If enemy is "undefined" we go here
            goodEnd()
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

const attackCalc = (enemy) =>{ //Working!
    let extraAtk = critAtk() //First calculates
    let atkDifference = extraAtk - enemy.DEF
    let realAtk = notNegative(atkDifference)
    let hpRemain = enemy.HP - realAtk
    enemy.HP = hpRemain
    
    let notify = document.createElement("p") //Then renders
    notify.setAttribute("class", "notify")
    notify.innerHTML = `You attack the ${enemy.Name}!!\n
    The difference between your attack "${extraAtk}" and the enemy's defense "${enemy.DEF}" is ${realAtk} !\n
    The current HP of the ${enemy.Name} is ${hpRemain} !\n`
    screen.appendChild(notify)
}

const defenseCalc = (enemy) =>{ //Working!
    let extraDef = critDef() //First calculates
    let defDifference = extraDef - enemy.ATK
    let realDef = notNegative(defDifference)
    let hpRemain = playerStatus.HP - realDef
    playerStatus.HP = hpRemain
    
    let notify = document.createElement("p") //Then renders
    notify.setAttribute("class", "notify")
    notify.innerHTML = `The ${enemy.Name} attacks you!!\n
    The difference between your defense "${extraDef}" and the enemy's attack "${enemy.ATK}" is ${realDef} !\n
    Your current HP are ${hpRemain} !\n`
    screen.appendChild(notify)
}

const winBattle = (enemy) => { //Working!
    if (enemy.HP <= 0){
        worldCounter ++
        enemyDefeated = true

        let notify = document.createElement("p")
        notify.setAttribute("class", "notify")
        notify.innerHTML = `Wow, you defeated the ${enemy.Name}!`
        screen.appendChild(notify)
        
        switch(enemy.Name){
            case "Bear":
                bearToken = true
                score.Bear ++
                break
            case "Dragon":
                dragonMedal = true
                score.Dragon ++
                break
            default:
                score.Goblin ++
        }
        
        reward(enemy)
        localStorage.setItem("playerScore", JSON.stringify(score))
        return enemyDefeated 
    }
    else {
        let notify = document.createElement("p")
        notify.setAttribute("class", "notify")
        notify.innerHTML = `The ${enemy.Name} can still fight!`
        screen.appendChild(notify)
    }
}

const badEnd = () => { //Working!
    if (playerStatus.HP <= 0 ){
        let notify = document.createElement("p")
        notify.setAttribute("class", "notify")
        notify.innerHTML = `You died :(\nGame over! Going to the next screen in 3 seconds!`
        screen.appendChild(notify)
        gameOver.BadEnding = true
        localStorage.setItem("playerGameOver", JSON.stringify(gameOver))
        setTimeout(() => {
            location.replace("./pages/gameOver.html")
            }, 3000)
    }
}

const goodEnd = () =>{ //Working!
    if (dragonMedal){
        let notify = document.createElement("p")
        notify.setAttribute("class", "notify")
        notify.innerHTML = `Wow, you made it, you killed everybody! Going to the next screen! Redirecting in 3 seconds!`
        screen.appendChild(notify)
        gameOver.GoodEnding = true
        localStorage.setItem("playerGameOver", JSON.stringify(gameOver))
        setTimeout(() => {
            location.replace("./pages/gameOver.html")
            }, 3000)
    }
}

const reward = (enemy) => { //Working!
    let droppedItem = Math.ceil(Math.random()*100)
    goldGained = instanceEnemy.Gold + Math.ceil(Math.random()*10)

    if (instanceEnemy.HP <= 0){
        let currentGold = playerStatus.Gold + goldGained
        playerStatus.Gold = currentGold
        
        let notify = document.createElement("p")
        notify.setAttribute("class", "notify")
        notify.innerHTML = `The ${enemy.Name} dropped ${goldGained} Gold. Now you have ${playerStatus.Gold} Gold.`
        screen.appendChild(notify)

        if(droppedItem >= 60 && !bearToken){
            inventory.push(weapons[2]) //Golden Sword
            
            let notify = document.createElement("p")
            notify.setAttribute("class", "notify")
            notify.innerHTML = `The ${enemy.Name} dropped a ${weapons[2].Name}.`
            screen.appendChild(notify)
        }
        else if (bearToken){
            inventory.push(weapons[3]) //Gattling Gun
            
            let notify = document.createElement("p")
            notify.setAttribute("class", "notify")
            notify.innerHTML = `The ${enemy.Name} dropped a ${weapons[3].Name}.`
            screen.appendChild(notify)
        }
        else{
            let notify = document.createElement("p")
            notify.setAttribute("class", "notify")
            notify.innerHTML = `The ${enemy.Name} didn't dropped any items :C`
            screen.appendChild(notify)
        }
    }
}

const mainBattle = (enemy) =>{ //Working!
    attackCalc(enemy)
    
    let notify = document.createElement("p")
    notify.setAttribute("class", "notify")
    notify.innerHTML = `Checking if the creature is still alive...`
    screen.appendChild(notify)

    winBattle(enemy)
    if (enemyDefeated){ //Sorry but i couldn't find how to restart the HP values of each creature
        playerStatus.HP = 100
        enemies[0].HP = 25 
        enemies[1].HP = 75
        enemies[2].HP = 750
        notify.innerHTML = `After the creature's death you rest for a bit before continuing your mission...\n
        Your HP are now ${playerStatus.HP}`
        screen.appendChild(notify)
        goodEnd()
    }
    else{
        defenseCalc(enemy)
        badEnd()
    }
}

const loopBattle = (actualEnemy) =>{ //Working!
    //Order is choose > assign > main battle > attackCalc > winBattle > defenseCalc > badEnd and loop
    screen.innerText = ""
    action.innerText = "Fight!"
    let notifyEnemy = document.createElement("p")
    notifyEnemy.setAttribute("class", "notifyEnemy")

    notifyEnemy.innerHTML = `You go further inside the cave.\nA shady figure is in front of you.\nYou illuminate with your torch and see a...\n
    A ${actualEnemy.Name} appeared!\n
    If you are ready to fight, press "Fight!"`
    screen.appendChild(notifyEnemy)
    notifyEnemy.innerHTML = `Get ready to fight against ${actualEnemy.Name}! Their current HP is ${actualEnemy.HP}!`
    mainBattle(actualEnemy)
}

//---------Start of the game---------
inventory.push(weapons[0], weapons[1]) //At the beginning of the game this items are added.
localStorage.setItem("backpack", JSON.stringify(inventory))

localStorage.setItem("playerScore", JSON.stringify(score))

const saveEquip = localStorage.setItem("weaponEquipped",JSON.stringify(equippedItem))

const screen = document.getElementById("screen")
screen.innerText = ":D \nThat is you, someone looking for treasure and stuff, but...\nYou never said your name, what should I call you?\n"

let inputName = document.createElement("form")
inputName.setAttribute("id", "name-form")
inputName.innerHTML = `<label for="name-field"> Enter your name here: </label>
<input type="text" id="name-field" name="name-field">
<input type="button" id="button-name" class="button" value="Done!"> `
screen.appendChild(inputName) //First the parent, then the child

let nameField = document.getElementById("name-field")
let nameButton = document.getElementById("button-name")
nameButton.onclick = () =>{
    const nameEntered = nameField.value.trim() //I don't like Regex and this was faster to implement, forces Only Whitespaces to be transformed in an empty string
    if (nameEntered === "" || nameEntered === null){
        Toastify({
                text: "Please enter a valid name, no empty text allowed!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                className: "pop-up",
                style:{
                    background: "#230903",
                },
                }).showToast();
        return false
    }
    nameEdit(nameEntered)
    screen.innerText = `\n${playerStatus.Name}, you have entered the forbidden cave, where great treasures await for those who are brave enough.\n` //reference for interactions
    localStorage.setItem("playerName", playerStatus.Name)
    const buttons = document.querySelectorAll(".hidden")
    buttons.forEach(button => {
        button.classList.remove("hidden")
    })
}

//---------Main Menu---------

//=> First goes "Inventory"
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
    tempButtonEquip.setAttribute("class", "button")
    tempButtonEquip.innerText = "Equip"
    screen.appendChild(tempButtonEquip)
    tempButtonEquip.onclick = () => {
        let inputItem = document.createElement("form")
        inputItem.setAttribute("id", "item-form")
        inputItem.innerHTML = `<label for="item-field"> Please enter the ID of the corresponding Item: </label>
        <input type="number" id="item-field" name="item-field">
        <input type="button" id="button-item"
        class="button" value="Equip!"> `
        screen.appendChild(inputItem)
        let itemField = document.getElementById("item-field")
        let itemButton = document.getElementById("button-item")
        itemButton.onclick = () =>{
            const itemId = parseInt(itemField.value)
            equip(itemId)
            localStorage.setItem("backpack", JSON.stringify(inventory))
            localStorage.setItem("weaponEquipped",JSON.stringify(equippedItem))
            }
        tempButtonEquip.remove()
        tempButtonReturn.remove()
    }
    //------Second decision, return
    let tempButtonReturn = document.createElement("button")
    tempButtonReturn.setAttribute("class", "button")
    tempButtonReturn.innerText = "Return"
    screen.appendChild(tempButtonReturn)
    tempButtonReturn.onclick = () => {
        screen.innerText = "Ok! Returning to main menu.\n"
        tempButtonEquip.remove()
        tempButtonReturn.remove()
        localStorage.setItem("backpack", JSON.stringify(inventory))
        localStorage.setItem("weaponEquipped",JSON.stringify(equippedItem)) 
    }
    //------Finally, save the current backpack.
    localStorage.setItem("backpack", JSON.stringify(inventory))
    localStorage.setItem("weaponEquipped",JSON.stringify(equippedItem))
}

//=> Second thing is Stats
const stats = document.getElementById("stats")
stats.onclick = () => {
    screen.innerText = ""
    statCheck()
}

//=> Third is Fight
const action = document.getElementById("action")
action.innerText = "Advance!"
action.onclick = () => {
    let actualEnemy = chooseEnemy()
    assignEnemy(actualEnemy)
    loopBattle(actualEnemy)
}

//=> Fourth is Exit
const exit = document.getElementById("exit")
exit.onclick = () => {
    screen.innerText = "Are you sure you want to quit? You will be redirected to the Game Over screen directly!"
    let tempButtonYes = document.createElement("button")
    tempButtonYes.setAttribute("class", "button")
    tempButtonYes.innerText = "Yes"
    screen.appendChild(tempButtonYes)
    let tempButtonNo = document.createElement("button")
    tempButtonNo.setAttribute("class", "button")
    tempButtonNo.innerText = "No"
    screen.appendChild(tempButtonNo)

    tempButtonYes.onclick = () => {
        gameOver.ExitEnding = true
        localStorage.setItem("playerGameOver", JSON.stringify(gameOver))
        location.replace("./pages/gameOver.html")
    }
    tempButtonNo.onclick = () => {
        screen.innerText = "Ok! Returning to main menu.\n"
    }
}
