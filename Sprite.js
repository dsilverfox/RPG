class Sprite {
    constructor(config) {
        //Set up Image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Set up Shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false; 
        if(this.useShadow) {
         this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowsLoaded = true;
        }       


        //configuring Animation and Initial State
        this.animations = config.animations || {
           "idle-down": [
               [0,0]
           ],
            "idle-right": [
                [0, 1]
            ],
           "idle-up": [
               [0,2]
           ],
            "idle-left": [
                [0, 3]
            ],
           "walk-down": [
               [1,0],[0,0],[3,0],[0,0]
           ],
            "walk-right": [
                [1, 1], [0, 1], [3, 1], [0, 1]
            ],
            "walk-up": [
                [1, 2], [0, 2], [3, 2], [0, 2]
            ],
            "walk-left": [
                [1, 3], [0, 3], [3, 3], [0, 3]
            ]
        };

        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = config.currentAnimationFrame || 0;
        //This establishes walking cadence, adjust the number to speed up or slow down the object.
        this.animationFrameLimit = config.animationFrameLimit || 4;
        this.animationFrameProgress = config.animationFrameLimit;

        //Reference gameObject.
        this.gameObject = config.gameObject
    }

    get frame(){
      return this.animations[this.currentAnimation][this.currentAnimationFrame]  
    }

    setAnimation(key) {
        if(this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //Down tick animation frame progress
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset the counter

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }
    draw(ctx, cameraPerson) {
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowsLoaded && ctx.drawImage(this.shadow, x,y);

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image, 
            frameX * 32, frameY * 32,
            //this value can be passed in if the image is a different size.
            32,32,
            x,y, //Applying shadow separately allows you to jump or levitate characters by changing the y value. ie: y-16.
            32,32,
            );
        this.updateAnimationProgress();
    }
    
}