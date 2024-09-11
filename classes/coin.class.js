class Coin extends MovableObject {

    width = 120;
    height = 120;
    offset = {
        left: 45,
        top: 45,
        right: 45,
        bottom: 45
    };

    IMAGES_BLINKING = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    constructor(x, y){
        super().loadImage(this.IMAGES_BLINKING[0]);
        this.loadImages(this.IMAGES_BLINKING);
        this.x = x;
        this.y = y;
        this.animate();
    };

    /**just a animation loop of a blinking coin */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BLINKING);
        }, 300);
    };
}