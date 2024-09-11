class World {

    character = new Character();

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    characterStatusbar = new CharacterStatusbar();
    endbossStatusbar = new EndbossStatusbar();
    coinStatusbar = new CoinStatusbar();
    bottleStatusbar = new BottleStatusbar();
    throwableObjects = [];
    collectableObjects = [];
    audioManager;
    coolDown = false;

    constructor(canvas, keyboard, audioManager) {
        this.audioManager = audioManager;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.setStartTrigger();
        this.enemies = this.level.enemies;
    };

    /**connects the way to the world from characters class */
    setWorld() {
        this.character.world = this;
    };

    /**runs the world. Checks collissions, throws and collects by an interval*/
    run() {
        setInterval(() => {
            this.checkEnemyCollision();
            this.checkThrowObject();
            this.checkCollectCoin();
            this.checkCollectBottle();
            this.checkBottleCollision();
            this.checkJumpOnCollision();
        }, 50);
    }

    /**sets a trigger to start the endboss animation */
    setStartTrigger() {
        setInterval(() => {
            if (this.character.x >= 1800) {
                this.endboss.startTriggerEndboss = true;
                this.character.stayAwake = true;
            }
            if (this.character.x >= 1800) {
                this.endbossStatusbar.y = 21;
            }
        }, 50)
    }

    /**checks if objects were thrown, decrease the amount of collected bottles and sets a throwing sound */
    checkThrowObject() {
        if (this.keyboard.E && this.character.collectedBottles > 0 && this.coolDown == false) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            audioManager.playAudio('throwing_sound', 1);
            this.character.collectedBottles--;
            this.bottleStatusbar.setAmount(this.character.collectedBottles);
            this.throwCoolDown();
        };
    }

    throwCoolDown() {
        this.coolDown = true;
        setTimeout(() => {
            this.coolDown = false;
        }, 800);
    }

    /**checks if a bottle is colliding with enemy or ground */
    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.isAboveGround() && !bottle.isDead()) {
                this.getCollidingReaction(bottle);
            };
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    this.getCollidingReaction(bottle);
                    this.getDamageReaction(enemy);
                };
            });
        });
    }

    /**checks if the character is jump on an enemy to defeat him. if so than is a feedback by a slightly jumping effect */
    checkJumpOnCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingToKill(enemy) && this.character.isAboveEnemy(enemy) && enemy !== this.endboss && this.character.speedY < 0) {
                this.getDamageReaction(enemy);
                this.character.speedY = 14;
            };
        });
    };

    /**the damage reaction of enemies when they were hit */
    getDamageReaction(enemy) {
        enemy.hit();
        if(enemy !== this.endboss){
        enemy.speed = 0;
        };
        this.deleteEnemy(enemy);
        if (this.endboss) {
            this.endbossStatusbar.setPercentage(this.endboss.energy);
        };
    };

    /**reaction of bottles if there hit enemies or ground */
    getCollidingReaction(bottle) {
        bottle.speedY = 0;
        bottle.acceleration = 0;
        audioManager.playAudio('bottleSplash_sound', 1);
        bottle.hit();
        this.deleteThrowableObject(bottle);
    };

    /**undisplay the thrown bottles if there are thrown and hits a target */
    deleteThrowableObject(bottle) {
        setTimeout(() => {
            this.throwableObjects = this.throwableObjects.filter((to) => {
                if (to === bottle) {
                    return false;
                } else {
                    return true;
                };
            });
        }, 250);
    };

    /**undisplay enemies when they are defeated */
    deleteEnemy(enemy) {
        if (enemy.isDead() && enemy !== this.endboss) {
            setTimeout(() => {
                this.level.enemies = this.level.enemies.filter((defeated) => {
                    if (defeated === enemy) {
                        return false;
                    } else {
                        return true;
                    };
                });
            }, 1000);
        };
    };

    /**checks if enemies are colliding with character and hurt him */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveEnemy(enemy) && !enemy.isDead() && !this.character.isDead()) {
                this.character.hit()
                this.characterStatusbar.setPercentage(this.character.energy);
                audioManager.playAudio('hurt_sound', 1);
            };
        });
    };

    /**checks if coin is collected by character */
    checkCollectCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectedCoins++;
                this.collectCoin(coin);
                audioManager.playAudio('collectCoin_sound', 1);
                audioManager.collectingCoinSoundHasPlayed = true;
                this.coinStatusbar.setAmount(this.character.collectedCoins);
            }
        });
    };

    /**checks if bottle is collected by character */
    checkCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectedBottles++;
                this.collectBottle(bottle);
                audioManager.playAudio('collectBottle_sound', 1);
                audioManager.collectingBottleSoundHasPlayed = true;
                this.bottleStatusbar.setAmount(this.character.collectedBottles);
            }
        });
    };

    /**undisplay collected coin */
    collectCoin(coin) {
        this.level.coins = this.level.coins.filter((collected) => {
            if (collected === coin) {
                return false;
            } else {
                return true;
            };
        });
    };

    /**undisplay collected bottle */
    collectBottle(bottle) {
        this.level.bottles = this.level.bottles.filter((collected) => {
            if (collected === bottle) {
                return false;
            } else {
                return true;
            };
        });
    };

    /**create/draw all objects on our canvas */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.characterStatusbar);
        this.addToMap(this.endbossStatusbar);
        this.addToMap(this.coinStatusbar);
        this.addToMap(this.bottleStatusbar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    /**add all objects in array to the map */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    /** add movable objects to the map */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        };
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
    };

    /** flips the image if the object needs to look in the other direction */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    /** flips the image back if the object needs to look in the previous direction */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    };
}