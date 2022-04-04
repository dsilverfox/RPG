class Person extends GameObject {
    constructor(config) {
        super(config);
        //This keeps characters locked to the grid. They can move through the grid, but they cannot stop between cells.
        this.movingProgressRemaining = 0;
        //This allows you to set one player at a time. You can change players by changing the state of their isPlayerControlled flag.
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.directionUpdate = {
            "up": ['y', -1],
            "down": ['y', 1],
            "left": ['x', -1],
            "right": ['x', 1],
        }
    }
    update(state) {
        this.updatePosition();
        this.updateSprite(state);
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
           this.direction = state.arrow;
           this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state){
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow){
        this.sprite.setAnimation("idle-"+this.direction);
        return
        }

        if(this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);  
        }
    }
}