class ThrowableObject extends MovableObject {

  IMAGES_BOTTLEROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_BOTTLESPLASH = [
    '',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];

  thrownBottle;

  offset = {
    left: 15,
    top: 15,
    right: 15,
    bottom: 15
  };

  constructor(x, y) {
    super().loadImage('');
    this.loadImages(this.IMAGES_BOTTLEROTATION);
    this.loadImages(this.IMAGES_BOTTLESPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;
    this.energy = 1;
    this.throw();
    this.animate();
  };

  /**gravity, speed and direction of the thrown object */
  throw() {
    this.speedY = 20;
    this.applyGravity();
    this.moveToOtherDirection();
  };

  /**check if character looks in the other direction */
  moveToOtherDirection() {
    let otherDirection = world.character.otherDirection;
    if (otherDirection) {
      this.x = this.x - 100;
      this.y = this.y - 100;
    };
    setInterval(() => {
      if (otherDirection) {
        if (!this.isDead()) {
          this.x -= 10;
        };
      } else {
        if (!this.isDead()) {
          this.x += 10;
        };
      };
    }, 50);
  };

  /**animation of a flying or splashing bottle*/
  animate() {
    let i = 0;
    this.thrownBottle =
      setInterval(() => {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_BOTTLESPLASH, true);
          i++;
          if (i >= 8) {
            clearInterval(this.thrownBottle);
          };
        } else {
          this.playAnimation(this.IMAGES_BOTTLEROTATION, true);
        };
      }, 50);
  };
}

