var DDATest = DDATest || {};

DDATest.Menu = function(game) {

};

DDATest.Menu.prototype.create = function() {
  // show the cursor
  document.getElementById("gameContainer").style.cursor = "default";
  // set the background to white
  this.stage.backgroundColor = "#000000";
  // start button
  this.spacetrek = this.add.image(this.world.centerX, this.world.centerY, 'background');
  this.spacetrek.anchor.set(0.5, 0.5);
  this.spacetrek.inputEnabled = true;
  this.spacetrek.events.onInputUp.add(function() {
    this.state.start('MeteorShower');
  }, this);
  // instructions
  this.add.bitmapText(350, 20, 'carrier-command', 'METEOR SHOWER', 20);
  this.add.bitmapText(250, 80, 'carrier-command', 'USE THE LEFT AND RIGHT ARROWS TO MOVE', 10);
  this.add.bitmapText(250, 110, 'carrier-command', 'GET 1 POINT FOR EVERY STAR YOU CAN CATCH', 10);
  this.add.bitmapText(250, 140, 'carrier-command', 'AVOID THE METEORS!!', 10);
  this.add.bitmapText(250, 170, 'carrier-command', 'HITTING A METEOR MEANS YOU LOSE A POINT', 10);
  this. startText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'carrier-command', 'CLICK HERE TO START', 20);
  this.startText.anchor.set(0.5, 0.5);
  // copyright
  this.add.bitmapText(250, this.world.height - 130, 'carrier-command', 'COPYRIGHT 2017 - 2021 NIGEL ROBB', 10);
  this.add.bitmapText(250, this.world.height - 100, 'carrier-command', 'ALL ASSETS SOURCED FROM PUBLIC DOMAIN', 10);
};
