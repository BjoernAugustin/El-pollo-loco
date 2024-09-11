let ctx;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let mobilebuttonsInterval;

let soundMute;

let mobileDetected; // boolean, if mobile device, true
let gameIsRunning = false; // boolean, if game is running, true
let landscapeScreen;
let startMenu;
let gameIsWon;
let gameIsLost;
let touchScreen = false;

/**initialize the game*/
function init() {
    detectMobileDevice();
    startMenu = true;
    setTouchButtons();
};

/**starts the game and hide the endscreen */
function startGame() {
    gameIsRunning = true;
    startMenu = false;
    gameIsWon = false;
    gameIsLost = false;
    detectMobileDevice();
    loadWorld();
    gameDisplay();
    checkGameOver();
    playGameAudio();
    showMobileButtons();
};

/**show mobile controls if there is a touchscreen device */
function showMobileButtons() {
    clearInterval(mobilebuttonsInterval);
    mobilebuttonsInterval = 
    setInterval(() => {
        if(touchScreen == false || startMenu == true || gameIsLost == true || gameIsWon == true || landscapeScreen == false){
            mobilecontrols.style = 'display: none';
        } else if(touchScreen == true && startMenu == false && gameIsLost == false && gameIsWon == false && landscapeScreen == true) {
            mobilecontrols.style = 'display: flex';
        } else {
            mobilecontrols.style = 'display: none';
        };
    }, 100);
}

/**checks if the game is over and how */
function checkGameOver() {
    setInterval(() => {
        if (world.character.isDead()) {
            gameIsLost = true;
        };
        if (world.endboss.isDead()) {
            gameIsWon = true;
        };
        if (gameIsWon == true || gameIsLost == true) {
            showGameOverScreen();
        };
    }, 100)
}

/**hide startscreen and show mobile buttons */
function gameDisplay() {
    startScreen.classList.add('d-none');
    endScreenLost.classList.add('d-none');
    endScreenWon.classList.add('d-none');
    soundcontrols.style = 'display: flex';
};

/**if game is over endscreen has to be shown depends on player has won or lost */
function showGameOverScreen() {
    if (gameIsLost == true) {
        lostScreen();
    } else if (gameIsWon == true) {
        wonScreen();
    };
};

/**endscreen and behavior if character has lost */
function lostScreen() {
    if (landscapeScreen == true) {
        endScreenLost.classList.remove('d-none');
        /* mobilecontrols.style = 'display: none'; */
        audioManager.pauseAudio('game_music');
        clearAllIntervals();
    } else {
       /*  mobilecontrols.style = 'display: none'; */
        audioManager.pauseAudio('game_music');
        clearAllIntervals();
    };
};

/**endscreen and behavior if character has Won */
function wonScreen() {
    if (landscapeScreen == true) {
        /* mobilecontrols.style = 'display: none'; */
        audioManager.playAudio('won_sound', 1);
        audioManager.pauseAudio('game_music');
        setTimeout(() => {
            endScreenWon.classList.remove('d-none');
            clearAllIntervals();
        }, 4000)
    };
};

/**checks if it runs on a landscape screen */
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);

window.addEventListener('resize', showMobileButtons);
window.addEventListener('orientationchange', showMobileButtons);
window.addEventListener('load', showMobileButtons);

function potraitDisplay() {
    turnDeviceScreen.classList.remove('d-none');
    canvas.classList.add('d-none');
    endScreenLost.classList.add('d-none');
    endScreenWon.classList.add('d-none');
    /* mobilecontrols.style = 'display: none'; */
    soundcontrols.style = 'display: none';
    startScreen.classList.add('d-none');
}

function landscapeDisplay() {
    turnDeviceScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    if (gameIsLost == true) {
        endScreenLost.classList.remove('d-none');
    };
    if (gameIsWon == true) {
        endScreenWon.classList.remove('d-none');
    };
    if (gameIsRunning == true) {
        soundcontrols.style = 'display: flex';
    };
    if (startMenu == true) {
        startScreen.classList.remove('d-none');
    };
}

/**display a note to turn device if there is no landscape screen */
function checkOrientation() {
    if (window.innerWidth < 1200 && window.innerHeight > window.innerWidth) {
        landscapeScreen = false;
        potraitDisplay();
    } else {
        landscapeScreen = true;
        landscapeDisplay();
    };
};

window.addEventListener('resize', detectMobileDevice);
window.addEventListener('orientationchange', detectMobileDevice);
window.addEventListener('load', detectMobileDevice);

window.addEventListener('touchstart', function () {
    touchScreen = true;
});

/**check if there is using a mobile device. Checking by onload body and resize window. */
function detectMobileDevice() {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobileDetected = true;
        beMobileGame();
    } else {
        mobileDetected = false;
        beDesktopGame();
    };

};

function beMobileGame() {
    if (mobileDetected == true) {
        setTouchButtons();
        gameScreen.style = 'top: 0px';
    };
};

function beDesktopGame() {
    if (mobileDetected == false) {
        gameScreen.style = 'top: 100px';
    };
};

/**load the objects of the level (level1.js) */
function loadWorld() {
    initLevel();
    world = new World(canvas, keyboard);
    audioManager = new AudioManager();
};

function playGameAudio() {
    audioManager.setBackAudio('game_music');
    audioManager.playAudio('game_music', 0.3);
    audioManager.audio['game_music'].loop = true;
    if (soundMute == true) {
        gameSoundOffButton();
    } else {
        gameSoundOnButton();
    };
};

/**declare HTML elements */
function getElementIds() {
    startScreen = document.getElementById('startScreen');
    gameScreen = document.getElementById('gameScreen');
    endScreenLost = document.getElementById('endScreenLost');
    endScreenWon = document.getElementById('endScreenWon');
    mobilecontrols = document.getElementById('mobilecontrols');
    soundcontrols = document.getElementById('soundcontrols');
    mobileLeft = document.getElementById('moveleft');
    mobileRight = document.getElementById('moveright');
    mobileJump = document.getElementById('jump');
    mobileThrow = document.getElementById('throw');
    gameSoundButton = document.getElementById('gameSoundButton');
    instructionsOverlay = document.getElementById('instructionsOverlay');
    instructionsCloseLayer = document.getElementById('instructionsCloseLayer');
    turnDeviceScreen = document.getElementById('turnDeviceScreen');
    startButton = document.getElementById('startButton');
    youLost = document.getElementById('youLost');
    youWon = document.getElementById('youWon');
};

/**opens an instructions information overlay and an empty layer with a close function*/
function showInstructions() {
    instructionsOverlay.classList.toggle('d-none');
    instructionsCloseLayer.classList.toggle('d-none');
}

/**closing the instructions*/
function closeInstructions() {
    instructionsOverlay.classList.add('d-none');
    instructionsCloseLayer.classList.add('d-none');
}

/**stops the sound */
function gameSoundOff() {
    audioManager.muteAudio();

};
/**plays the sound */
function gameSoundOn() {
    audioManager.unMuteAudio();
};

/**change the button icon and proceed the function */
function gameSoundOffButton() {
    gameSoundButton.innerHTML = /*HTML*/`
    <img src="assets/img/Icons/soundoff.png" onclick="gameSoundOnButton()" alt="">
    `;
    gameSoundOff();
    soundMute = true;
};

/**change the button icon and proceed the function */
function gameSoundOnButton() {
    gameSoundButton.innerHTML = /*HTML*/`
    <img src="assets/img/Icons/soundon.png" onclick="gameSoundOffButton()" alt="">
    `;
    gameSoundOn();
    soundMute = false;
};

/**clears all Intervals by a for loop */
function clearAllIntervals() {
    setTimeout(() => {
        for (let i = 1; i < 9999999; i++) {
            window.clearInterval(i);
            clearTimeout(i);
        };
    }, 1000)
};

/**set the boolean true of pressed keys */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = true;
    };
    if (event.keyCode == 37 || event.keyCode == 65) {
        keyboard.LEFT = true;
    };
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    };
    if (event.keyCode == 69) {
        keyboard.E = true;
    };
});

/**set the boolean false of pressed keys */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39 || event.keyCode == 68 || event.mobileRight) {
        keyboard.RIGHT = false;
    };
    if (event.keyCode == 37 || event.keyCode == 65 || event.mobileLeft) {
        keyboard.LEFT = false;
    };
    if (event.keyCode == 32 || event.mobileJump) {
        keyboard.SPACE = false;
    };
    if (event.keyCode == 69 || event.mobileThrow) {
        keyboard.E = false;
    };
});

/**set the boolean true/false of held mobile controls */
function setTouchButtons() {
    document.getElementById('moveleft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('moveleft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('moveright').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('moveright').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.E = true;
    });
    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.E = false;
    });
};