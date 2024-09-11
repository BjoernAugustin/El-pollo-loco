class Character extends MovableObject {
    width = 100;
    height = 200;
    y = 0;
    speed = 7;
    collectedCoins = 0;
    collectedBottles = 0;
    offset = {
        left: 25,
        top: 100,
        right: 30,
        bottom: 0
    };

    sleepTimeOut;
    world;
    audioManager;
    
    isSleeping = false;
    stayAwake = false;

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png'
    ];

    IMAGES_FALLING = [
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor(audioManager) {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.audioManager = audioManager;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
        this.setGroundPosition();
    };

    /**animations of moves and reactions */
    animate() {
        this.moves();
        this.reactions();        
    };

    /**moves by using the keys */
    moves() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
                this.moveRight();
                this.otherDirection = false;
            };
            if (this.world.keyboard.LEFT && this.x > -600 && !this.isDead()) {
                this.moveLeft();
                this.otherDirection = true;
            };
            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead()) {
                this.jump();
            };
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    };

    /**reactions of the character */
    reactions() {
        setInterval(() => {
            if (this.isDead()) {
                if (!audioManager.dyingSoundHasPlayed) {
                    audioManager.playAudio('dying_sound', 1);
                    audioManager.playAudio('gameover_sound', 1);
                    audioManager.dyingSoundHasPlayed = true;                  
                };
                this.playAnimation(this.IMAGES_DEAD, false);
                this.isAwake();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT, true);
                this.isAwake();

            } else if (this.isAboveGround()) {
                this.isJumping();
                this.isAwake();

            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                audioManager.playAudio('walking_sound', 1);
                this.playAnimation(this.IMAGES_WALKING, true);
                this.isAwake();
            } else {
                this.isWaiting();
            };
        }, 200);
    };

    /**images and sound of jumping */
    isJumping() {
        if (this.speedY < 0) {
            this.playAnimation(this.IMAGES_FALLING, false);
        } else {
            audioManager.playAudio('jump_sound', 1);
            this.playAnimation(this.IMAGES_JUMPING, false);
        };
    };

    /**images and sound of idle */
    isWaiting() {
        if (this.isSleeping) {
            audioManager.playAudio('snore_sound', 1);
            this.playAnimation(this.IMAGES_LONGIDLE, true);
        } else {
            this.playAnimation(this.IMAGES_IDLE, true);
        };
    };

    /**images and sound of woke up character */
    isAwake() {
        this.clearSleepTimeOut();
        if (this.stayAwake == false) {
            this.sleepTimeOut = setTimeout(() => {
                this.isSleeping = true;
            }, 3000)
        }
    }

    /**set the sleep boolean back to false */
    clearSleepTimeOut() {
        if (this.sleepTimeOut !== null) {
            clearTimeout(this.sleepTimeOut);
            this.isSleeping = false;
        };
    };
}