class Chicken extends MovableObject {

    offset = {
        left: 5,
        top: 5,
        right: 5,
        bottom: 5
    };

    moveInterval;
    audioManager;

    chickenSoundHasPlayed = false;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x, audioManager) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.audioManager = audioManager;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 1 + Math.random() * 1;
        this.y = 365;
        this.height = 60;
        this.width = 40;
        this.energy = 2;
        this.animate();
    };

    /**animation of the chicken-enemies */
    animate() {
        this.chickenMoves();
        this.chickenReaction();
    };

    /**animation and move of the chicken-enemies */
    chickenMoves() {
        this.moveInterval =
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING, true);
            }, 200);

        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            };
        }, 1000 / 60);
    };

    /**the only reaction of the chicken-enemies: getting defeated */
    chickenReaction() {
        setInterval(() => {
            if (this.isDead()) {
                if (!this.chickenSoundHasPlayed) {
                    audioManager.playAudio('chicken_sound', 1)
                    this.chickenSoundHasPlayed = true;
                };
                clearInterval(this.moveInterval);
                this.loadImage(this.IMAGES_DEAD[0]);
            };
        }, 100)
    };
}