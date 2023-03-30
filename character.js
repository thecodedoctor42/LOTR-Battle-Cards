import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from "./utils.js"

function Character(data){
    // this part of the function is only called once so any
    // object defined here will remain constant 

    // Object.assign(target, source) creates a copy of a source object and
    // assigns it to a new target object
    Object.assign(this, data)

    this.characterName = this.name
    this.CharacterAvatar = this.avatar
    // define each character's max health as their health 
    // before damage is taken
    this.maxHealth = this.health

    // define diceHtml as the empty placeholders for the
    // dice to fit into when rolled
    this.diceHtml = getDicePlaceholderHtml(this.diceCount)

    this.setDiceHtml = function(){
        // Using the .map() method to get an array of HTML code for generating the
        // dice rolls on the character cards
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map( num => 
            `<div class="dice">${num}</div>` ).join('')
    }

    this.takeDamage = function(attackScoreArray){
        // reduce the dice rolls to one value that is the sum of
        // all the dice rolls for that character's turn
        const totalAttackScore = attackScoreArray.reduce( (total, num) => total + num )
        this.health -= totalAttackScore
        // get character health remaining as percentage
        if (this.health <= 0){
            this.health = 0
            this.isDead = true
        }
    }

    this.getHealthBarHtml = function(){
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class='health-bar-outer'>
                    <div class="health-bar-inner ${percent < 26 ? 'danger' : ''}"
                        style="width: ${percent}%;">
                    </div>
                </div>`
    }

    this.getCharacterHtml = function(){
        // destructuring the character objects and using their
        // characteristics in rendering the character cards
        const {name, avatar, health, diceHtml} = this
        // define the health bar length
        const healthBar = this.getHealthBarHtml()
        //building the character cards and dice rolls
        return `                
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src=${avatar}>
                <p class="health">health: <b> ${health} </b></p>
                ${healthBar}
                <div class="dice-container">${diceHtml}</div>
            </div>   `
    }
}

// function for calculating percentage of character health 
// remaining 

export default Character