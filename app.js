new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100,
            this.monsterHealth = 100
            this.turns = [];
        },
        
        attack() {
            let damage = this.calcDamage(2, 10);
            this.monsterHealth -= damage;
            if (this.checkWin()) return;
            this.turns.unshift({
                isPlayer: true,
                text: `Player attacks Monster for ${damage}`
            });

            this.monsterAttack();
        },
         
        specialAttack() {
            let damage = this.calcDamage(10, 20);
            this.monsterHealth -= damage;
            if (this.checkWin()) return;
            this.turns.unshift({
                isPlayer: true,
                text: `Player special attacks Monster for ${damage}`
            });

            this.monsterAttack();
        },
        
        heal() {
            this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100; 
            this.turns.unshift({
                isPlayer: true,
                text: `Player heals 10 points`
            });

            this.monsterAttack();
        },
        
        giveUp() {
            this.gameIsRunning = false;
        },

        monsterAttack() {
            let damage = this.calcDamage(5, 12);
            this.playerHealth -= damage; 
            this.checkWin();

            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits Player for ${damage}`
            });
        },
        
        calcDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin() {
            if(this.monsterHealth <= 0) {
                confirm('You won! New game?') ? this.startGame() : this.gameIsRunning = false;
                return true; 
            }

            if(this.playerHealth <= 0) {
                confirm('You lost! New game?') ? this.startGame() : this.gameIsRunning = false;
                return true;
            }

            return false;
        }
    }
});