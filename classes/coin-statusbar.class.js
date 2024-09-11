class CoinStatusbar extends DrawableObject {

    IMAGES_SB_COINS = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    amount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_SB_COINS);
        this.x = 50;
        this.y = 55;
        this.width = 150;
        this.height = 50;
        this.setAmount(0);
    };

    /**sets the correct image of the coinbar depending how much coins were collected */
    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES_SB_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**sets the index of the image depending how much coins were collected */
    resolveImageIndex() {
        if (this.amount == 5) {
            return 5;
        } else if (this.amount == 4) {
            return 4;
        } else if (this.amount == 3) {
            return 3;
        } else if (this.amount == 2) {
            return 2;
        } else if (this.amount == 1) {
            return 1;
        } else {
            return 0;
        };
    };
}