class ChickenSmall extends MovableObject {

    offset = {
        left: 5,
        top: 5,
        right: 5,
        bottom: 5
    };

    moveInterval;
    moveAnimationInterval;
    jumpInterval;
    audioManager;

    chickenSoundHasPlayed = false;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x, audioManager) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.audioManager = audioManager;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 1 + Math.random() * 0.5;
        this.y = 375;
        this.height = 50;
        this.width = 40;
        this.energy = 2;
        this.animate();
    };

    /**animation of the small chicken-enemies */
    animate() {
        this.applyGravity();
        this.smallChickenMoves();
        this.smallChickenReaction();
    };

    /**animation and move of the small chicken-enemies */
    smallChickenMoves() {
        this.moveAnimationInterval =
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING, true);
            }, 200);
        this.moveInterval = 
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            };
        }, 1000 / 60);
        if (!this.isAboveGround() && !this.isDead()) {
            this.jumpInterval = 
            setInterval(() => {
                this.jump();
            }, 2000 + Math.random() * 2000)
        };
    };

    /**the only reaction of the small chicken-enemies: getting defeated */
    smallChickenReaction() {
        setInterval(() => {
            if (this.isDead()) {
                if (!this.chickenSoundHasPlayed) {
                    audioManager.playAudio('chicken_sound', 1)
                    this.chickenSoundHasPlayed = true;
                };
                clearInterval(this.moveInterval);
                clearInterval(this.moveAnimationInterval);
                clearInterval(this.jumpInterval);
                this.loadImage(this.IMAGES_DEAD[0]);
            };
        }, 100);
    };
}