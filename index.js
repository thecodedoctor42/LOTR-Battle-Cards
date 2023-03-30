import characterData from "./data.js"
import Character from "./character.js"

let monstersArray = ["orc", "spider", "dragon"];
const wizard = new Character(characterData.hero)
let monster = getNewMonster()

document.getElementById('attack-btn').addEventListener ('click', attack)

function getNewMonster(){
    const nextMonsterData = characterData[(monstersArray.shift())]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack(){
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()
    if (monster.isDead){
        document.getElementById('attack-btn').removeEventListener('click', attack)
        if (monstersArray.length > 0){
            monster = getNewMonster()
            setTimeout(() => {
            render()
            document.getElementById('attack-btn').addEventListener('click', attack)
            },1500)
        }
        else{
            endgame()
        }       
    }
    else if (wizard.isDead) {
        document.getElementById('attack-btn').removeEventListener('click', attack)
        endgame()
    }
}

function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()   
}

render()

function endgame(){
    const endMessage = wizard.health === 0 && monster.health === 0 ?
                       `No victors, all are slaves to Morgoth now` :
                       wizard.health > 0 ? `${wizard.characterName} Wins` :
                       `${monster.characterName} is Victorious`
    const endImg = wizard.health === 0 && monster.health === 0 ? "images/morgoth.png" :
                     wizard.health > 0 ? `${wizard.CharacterAvatar}` : `${monster.CharacterAvatar}`
    const img = new Image(400, 400)
    img.src = endImg
    img.style.border = "0.5vw solid black"
    img.style.borderRadius = "5%"
    img.style.boxShadow = "0 0 10px white"
    setTimeout(() => {(document.body.innerHTML = `<div class="end-game">
                                                    <h2>Game Over</h2>
                                                    <h3>${endMessage}</h3>
                                                </div>` )
                      document.body.appendChild(img)}, 1500)
}
