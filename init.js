//This function executes itself!
(function () {

  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  //Intializes the 'overworld instance'
  overworld.init();

})();