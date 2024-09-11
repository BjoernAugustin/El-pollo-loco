class Endboss extends MovableObject {

    lilChicMoving;
    crazyChicDies;
    shrinkingInterval;
    isMutatingInterval;
    triggerInterval;
    chickWalksInterval;
    chickMovesLeftInterval;
    chickMovesBackInterval;
    chickAttackInterval;

    audioManager;

    ragemode = false;

    isCrazy = false;
    isTamed = false;

    setAttack = false;

    offset = {
        left: 25,
        top: 70,
        right: 50,
        bottom: 60
    };

    IMAGES_LIL_CHIC_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_WAITING = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_MUTATING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/4_w.png'
    ];

    IMAGES_ATTACKING = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    constructor(audioManager) {
        super().loadImage('');
        this.audioManager = audioManager;
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_MUTATING);
        this.loadImages(this.IMAGES_LIL_CHIC_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 2700;
        this.height = 60;
        this.speed = 0.15;
        this.energy = 60;
        this.animate();
    };

    /**animations of the endboss: with a beginning intro, an alive part and a defeated part */
    animate() {
        this.startIntro();
        this.animationsWhileAlive();
        this.animationsAfterFight();
    };

    /**intro animation triggered bei startTriggerEndboss (character reaches declared X direction) */
    startIntro() {
        this.triggerInterval =
            setInterval(() => {
                if (this.startTriggerEndboss == true) {
                    this.chicIsGoingCrazy();
                };
            }, 100);
    };

    /**chicken is mutating to a crazy chicken after running right and left */
    chicIsGoingCrazy() {
        this.y = 365;
        this.height = 60;
        this.width = 40;
        this.speed = 3;
        clearInterval(this.triggerInterval);
        this.introMoves();
        setTimeout(() => {
            this.isMutating();
            setTimeout(() => {
                this.isCrazy = true;
            }, 4000);
        }, 6500);
    };

    /**chicken is running right and left */
    introMoves() {
        audioManager.playAudio('endboss_start_sound', 1);
        audioManager.endbossStartSoundHasPlayed = true;
        this.lilChicMoving =
            setInterval(() => {
                if (this.x > 2200 && this.otherDirection == false) {
                    this.moveLeft();
                } else if (this.x <= 2200) {
                    this.otherDirection = true;
                };
                if (this.otherDirection == true) {
                    this.moveRight();
                };
                if (this.x > 2350 && this.otherDirection == true) {
                    this.otherDirection = false;
                    this.moveLeft();
                };
            }, 1000 / 60);
    };

    /**mutating animation. chicken is growing up and turns to a bad one */
    isMutating() {
        this.y = 365;
        this.height = 60;
        this.width = 40;
        this.otherDirection = false;
        this.playMutatingSound();
        clearInterval(this.lilChicMoving);
        this.isMutatingInterval =
            setInterval(() => {
                if (this.height < 350) {
                    this.playAnimation(this.IMAGES_MUTATING, true);
                    this.height++;
                    this.width++;
                    this.y -= 0.87;
                    this.x -= 0.43;
                } else if (this.height = 350) {
                    audioManager.playAudio('chickenmutated_sound', 1)
                    clearInterval(this.isMutatingInterval);
                };
            }, 13);
    };

    /**play growing up sound */
    playMutatingSound() {
        if (audioManager.endbossMutatingSoundHasPlayed == false) {
            audioManager.playAudio('endboss_mutating_sound', 1);
            audioManager.endbossMutatingSoundHasPlayed = true;
        };
    }

    /**reaction while crazy chicken is alive. Animation when gets hurt and attack animations 7,5 seconds in a loop*/
    animationsWhileAlive() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT, true);
            } else if (!this.isDead() && this.isCrazy == false && this.isTamed == false && this.startTriggerEndboss == true) {
                this.playAnimation(this.IMAGES_LIL_CHIC_WALKING, true);
            } else if (!this.isDead() && this.isCrazy == true && this.setAttack == false) {
                this.playAnimation(this.IMAGES_WAITING, true);
            };
            if (this.energy < 30) {
                this.ragemode = true;
            };
        }, 110);

        setInterval(() => {
            if (this.isCrazy == true && this.ragemode == false && !this.isDead()) {
                this.attack();
            };
        }, 3000 + Math.random() * 3000);

        setInterval(() => {
            if (this.isCrazy == true && this.ragemode == true) {
                this.speed = 5;
                this.attack();
            };
        }, 2000 + Math.random() * 2000);
    };

    /**attack animation and sound */
    attack() {
        this.setAttack = true;
        audioManager.playAudio('endboss_attack_sound', 1);
        audioManager.endbossAttackSoundHasPlayed = true;

        this.chickMovesLeft();
        this.chickWalkAnimation();
        this.chickAttackAnimation();

        setTimeout(() => {
            clearInterval(this.chickAttackInterval);
            this.chickMovesBack();
            this.chickWalkAnimation();
        }, 2000);

        setTimeout(() => {
            this.setAttack = false;
            clearInterval(this.chickMovesBackInterval);
            clearInterval(this.chickWalksInterval);
        }, 2700);
    };

    /**load images for attack animation */
    chickAttackAnimation() {
        setTimeout(() => {
            clearInterval(this.chickWalksInterval);
            clearInterval(this.chickMovesLeftInterval);
            this.speedY = 20;
            this.chickAttackInterval =
                setInterval(() => {
                    this.playAnimation(this.IMAGES_ATTACKING, true);
                }, 110);
        }, 1000 + Math.random() * 1000);
    };

    /**load images for walk animation */
    chickWalkAnimation() {
        this.chickWalksInterval =
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING, true);
            }, 50);
    };

    /**moves chicken to the left */
    chickMovesLeft() {
        this.chickMovesLeftInterval =
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
    };

    /**moves chicken back to the right */
    chickMovesBack() {
        this.chickMovesBackInterval =
            setInterval(() => {
                this.moveRight();
            }, 1000 / 60);
    };

    /**shrink animations and sounds when defeated */
    animationsAfterFight() {
        clearInterval(this.chickWalksInterval);
        clearInterval(this.chickMovesLeftInterval);
        this.crazyChicDies =
            setInterval(() => {
                if (this.isDead() && this.isCrazy == true) {
                    this.chicIsShrinking();
                };
            }, 110);

        setInterval(() => {
            if (this.isDead() && this.isTamed == true) {
                this.runawayChic();
                this.playAnimation(this.IMAGES_LIL_CHIC_WALKING, true);
            };
        }, 50);
    };

    /**load images and sounds for shrink animation */
    chicIsShrinking() {
        this.isCrazy = false;
        if (audioManager.endbossTamingSoundHasPlayed == false) {
            audioManager.playAudio('endboss_taming_sound', 1);
            audioManager.endbossTamingSoundHasPlayed = true;
        };
        clearInterval(this.crazyChicDies);
        this.shrinkingInterval =
            setInterval(() => {
                if (this.height > 60) {
                    this.playAnimation(this.IMAGES_DEAD, true)
                    this.width -= 5;
                    this.height -= 5;
                    this.y += 4.5;
                    this.x += 2.3;
                } else if (this.height <= 60) {
                    this.isTamed = true;
                    clearInterval(this.shrinkingInterval);
                };
            }, 50);
    };

    /** animation and sound of runaway, defeated chicken */
    runawayChic() {
        this.otherDirection = true;
        this.speed = 3
        if (audioManager.endbossRunawaySoundHasPlayed == false) {
            audioManager.playAudio('endboss_runaway_sound', 1);
            audioManager.endbossRunawaySoundHasPlayed = true;
        };
        setInterval(() => {
            this.moveRight();
        }, 50);
    };
}