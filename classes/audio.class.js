class AudioManager {

    constructor() {
        this.loadAudio()
    };

    loadAudio() {
        this.audio = {
        throwing_sound: new Audio('assets/sounds/throw.mp3'),
        bottleSplash_sound: new Audio('assets/sounds/glass.mp3'),
        walking_sound: new Audio('assets/sounds/walk1.mp3'),
        hurt_sound: new Audio('assets/sounds/hurt.mp3'),
        snore_sound: new Audio('assets/sounds/snore.mp3'),
        dying_sound: new Audio('assets/sounds/dying.mp3'),
        jump_sound: new Audio('assets/sounds/jump.mp3'),
        chicken_sound: new Audio('assets/sounds/chicken.mp3'),
        chickenmutated_sound: new Audio('assets/sounds/chickenmutated.mp3'),
        endboss_mutating_sound: new Audio('assets/sounds/growing.mp3'),
        endboss_taming_sound: new Audio('assets/sounds/shrinking.mp3'),
        endboss_runaway_sound: new Audio('assets/sounds/runaway.mp3'),
        endboss_attack_sound: new Audio('assets/sounds/endbossattacks.mp3'),
        endboss_start_sound: new Audio('assets/sounds/endbossgettingcrazy.mp3'),
        collectCoin_sound: new Audio('assets/sounds/collectcoin.mp3'),
        collectBottle_sound: new Audio('assets/sounds/pickupbottle.mp3'),
        gameover_sound: new Audio('assets/sounds/gameover.wav'),
        game_music: new Audio('assets/sounds/music-menu.mp3'),
        won_sound: new Audio('assets/sounds/music-finish-1.mp3')
        };
    }

    dyingSoundHasPlayed = false;
    collectingCoinSoundHasPlayed = false;
    collectingBottleSoundHasPlayed = false;
    endbossMutatingSoundHasPlayed = false;
    endbossTamingSoundHasPlayed = false;
    endbossRunawaySoundHasPlayed = false;
    endbossAttackSoundHasPlayed = false;
    endbossStartSoundHasPlayed = false;
    musicMute;
    soundMute;
    
    /**function to start the @param: sound and the @param: volume  */
    playAudio(sound, vol) {
        this.audio[sound].play();
        this.audio[sound].volume = vol;
    };

    setBackAudio(sound) {
        this.audio[sound].currentTime = 0;
    }

    /**function to pause the @param: sound  */
    pauseAudio(sound) {
        this.audio[sound].pause();
    };

    /**function to reset the @param: sound  */
    resetAudio(sound) {
        this.audio[sound].currentTime = 0;
    };

    /**function to mute the all sound exception the game music */
    muteAudio() {
        this.audio['throwing_sound'].muted = true;
        this.audio['bottleSplash_sound'].muted = true;
        this.audio['walking_sound'].muted = true;
        this.audio['hurt_sound'].muted = true;
        this.audio['snore_sound'].muted = true;
        this.audio['dying_sound'].muted = true;
        this.audio['jump_sound'].muted = true;
        this.audio['chicken_sound'].muted = true;
        this.audio['chickenmutated_sound'].muted = true;
        this.audio['endboss_mutating_sound'].muted = true;
        this.audio['endboss_taming_sound'].muted = true;
        this.audio['endboss_runaway_sound'].muted = true;
        this.audio['endboss_attack_sound'].muted = true;
        this.audio['endboss_start_sound'].muted = true;
        this.audio['collectCoin_sound'].muted = true;
        this.audio['collectBottle_sound'].muted = true;
        this.audio['gameover_sound'].muted = true;
        this.audio['game_music'].muted = true;
        this.audio['won_sound'].muted = true;
        
    };

    /**function to unmute the all sound exception the game music */
    unMuteAudio() {
        this.audio['throwing_sound'].muted = false;
        this.audio['bottleSplash_sound'].muted = false;
        this.audio['walking_sound'].muted = false;
        this.audio['hurt_sound'].muted = false;
        this.audio['snore_sound'].muted = false;
        this.audio['dying_sound'].muted = false;
        this.audio['jump_sound'].muted = false;
        this.audio['chicken_sound'].muted = false;
        this.audio['chickenmutated_sound'].muted = false;
        this.audio['endboss_mutating_sound'].muted = false;
        this.audio['endboss_taming_sound'].muted = false;
        this.audio['endboss_runaway_sound'].muted = false;
        this.audio['endboss_attack_sound'].muted = false;
        this.audio['endboss_start_sound'].muted = false;
        this.audio['collectCoin_sound'].muted = false;
        this.audio['collectBottle_sound'].muted = false;
        this.audio['gameover_sound'].muted = false;
        this.audio['game_music'].muted = false;
        this.audio['won_sound'].muted = false;
    };

    /**function to mute the game music */
    muteMusic() {
        this.audio['game_music'].muted = true;
    };

    /**function to unmute the game music */
    unMuteMusic() {
        this.audio['game_music'].muted = false;
    };

}


