//Parent component. Designed to allow extension if necessary.
class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }

 startGameLoop() {
   const step = () => {
     //Clear canvas.
     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

     //Establish the camera person
     const cameraPerson = this.map.gameObjects.hero;

     //Update all objects in the map.
     //Not indefinitely scalable. For larger games this is a performance problem.
     Object.values(this.map.gameObjects).forEach(object => {
       object.update({
         arrow: this.directionInput.direction
       });
     })

     //Draw Lower Layer
     this.map.drawLowerImage(this.ctx, cameraPerson);

     //Draw Game Objects Layer
    Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
    })

     //Draw Upper Layer
     this.map.drawUpperImage(this.ctx, cameraPerson);
     requestAnimationFrame(() => {
       step();
     })
   }
   step();
 }

 init() {
   this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
   this.directionInput = new DirectionInput();
   this.directionInput.init();
   this.startGameLoop();
   
    
 }

}