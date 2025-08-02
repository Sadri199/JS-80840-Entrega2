//---------Data Here---------
let userName = localStorage.getItem("playerName") //String
let userBackpack = JSON.parse(localStorage.getItem("backpack")) //JSON
let userEquipItem = JSON.parse(localStorage.getItem("weaponEquipped")) //JSON
let userScore = JSON.parse(localStorage.getItem("playerScore")) //JSON
let userGameOver = JSON.parse(localStorage.getItem("playerGameOver")) //JSON

ending = ""
let arrayEndings = Object.entries(userGameOver)
for(let [key,value] of arrayEndings){
    if (value === true){
        ending = key
    }
}

const reasonGameOver = (ending) => {
    let flavorText = ""
    switch (ending){
        case "ExitEnding":
            flavorText = `You quitted the game by pressing the "Exit" button!!`
            return flavorText
        case "GoodEnding":
            flavorText = `You beat the game by killing the Dragon!\nNow the game is over, you got the good ending!`
            return flavorText
        case "BadEnding":
            flavorText = `You lost all your HP and died :(\nGame over! This is the bad ending :(`
            return flavorText
        default:
            flavorText = "How did you get here??????"
            return flavorText
    }
}

//---------Render Here---------
const screen = document.getElementById("screen")

screen.innerText = `Hello ${userName}, I hope you enjoyed the game!
You arrived to this screen because you: ${reasonGameOver(ending)}\n
You killed: Goblins => ${userScore.Goblin}\nBears=> ${userScore.Bear}\nDragon => ${userScore.Dragon}\n
Press the button below to erase all your data.`
const home = document.createElement("button")
home.setAttribute("class", "button")
home.innerText = "Go Back"

//=> localStorage delete
const clearData = document.createElement("button")
clearData.setAttribute("class", "button")
clearData.innerText = "Clear Data!"
screen.appendChild(clearData)
clearData.onclick = () => {
    screen.innerText = "Erasing all your data :("
    localStorage.clear()
    screen.appendChild(home)
    home.onclick = () => {
        location.replace("../index.html")
}

}

//=> Return to Index
screen.appendChild(home)
home.onclick = () => {
    screen.innerText = "Going back"
    location.replace("../index.html")
}