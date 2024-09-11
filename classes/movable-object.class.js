class MovableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    startTriggerEndboss = false;
    canvasHeight = document.getElementById('canvas').height;
    canvasWidth = document.getElementById('canvas').width;


    /**decreases the Y direction depending on speedY in relation to acceleration */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**set position of the character if he is just standing on the ground */
    setGroundPosition() {
        setInterval(() => {
            if (!this.isAboveGround()) {
                this.y  = 225;
            };
        }, 1000 / 25);
        
    }

    /**set the maximum Y of the objects */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 370;
        } else if (this instanceof ChickenSmall) {
            return this.y < 375;
        } else {
            return this.y < 225;
        };
    };

    isAboveEnemy(enemy) {
        return (this.y + this.height - this.offset.bottom) < enemy.y + enemy.offset.top + 10;
    }


    /**plays a loop of an array of images by using modulo */
    playAnimation(images, playLoop) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (playLoop == true) {
            this.currentImage++;
        } else if (this.currentImage <= images.length) {
            return;
        };
    };

    /**moves to right direction in relation to the speed */
    moveRight() {
        this.x += this.speed;
    };

    /**moves to left direction in relation to the speed */
    moveLeft() {
        this.x -= this.speed;
    };

    /**sets the speedY of an object to "jump" */
    jump() {
        this.speedY = 18;
    };

    /**checks if the movable object(character) is colliding with the @param(object) */
    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        );
    };

    isCollidingToKill(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        );
    };

    /**set the reaction if a movable object is hurt and decrease the energy and set the time the last hit was happened*/
    hit() {
        if (!this.isHurt()) {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        };
    };

    /**if the object is hurt there is a time of one second "unhurtable" */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //differenz in Ms
        timepassed = timepassed / 1000; // differenz in sec
        return timepassed < 1;
    };

    /**returns energy equals 0 */
    isDead() {
        return this.energy == 0;
    };
}