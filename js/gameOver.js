//---------Data Here---------
let userName = localStorage.getItem("playerName") //String
let userBackpack = JSON.parse(localStorage.getItem("backpack")) //JSON
let userEquipItem = JSON.parse(localStorage.getItem("weaponEquipped")) //JSON
let userScore = JSON.parse(localStorage.getItem("playerScore")) //JSON
let userGameOver = JSON.parse(localStorage.getItem("playerGameOver")) //JSON
let trueEnd = userGameOver.filter(elem => elem.keys() == true)

const reasonGameOver = () => { //Me quede acá

    console.log(trueEnd)
    if (userGameOver.ExitEnding){
        let flavorText = `You quitted the game by pressing the "Exit" button`
        return flavorText
    }
    else if (userGameOver.GoodEnding){
        let flavorText = `You beat the game by killing the Dragon. Nice!`
        return flavorText
    }
    else{

    }
}



//---------Render Here---------
const screen = document.getElementById("screen")

screen.innerText = `Hello ${userName}, I hope you enjoyed the game!
You arrived to this screen because you: ${reasonGameOver()}



`

//=> Borrada de localStorage
const clearData = document.createElement("button")
clearData.setAttribute("class", "button")
clearData.innerText = "Clear Data!"
screen.appendChild(clearData)
clearData.onclick = () => {
    screen.innerText = "Erasing all your data :("
    localStorage.clear()
}