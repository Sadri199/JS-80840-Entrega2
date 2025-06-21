// Main Data
const inventory = []
const playerStatus = [
    ["HP", 10],
    ["ATK", 20],
    ["DEF", 10]
]

const enemies = ["Goblin", "Bear", "Dragon"]

// Functions
function firstOne (index) {
    console.log(playerStatus[index])
}

//loops and Calls

firstOne(parseInt(prompt("0 to see Health Points, 1 to see Attack, 2 to see Defense")))