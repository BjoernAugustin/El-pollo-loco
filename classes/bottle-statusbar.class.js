class BottleStatusbar extends DrawableObject {

    IMAGES_SB_BOTTLES = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    amount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_SB_BOTTLES);
        this.x = 50;
        this.y = 95;
        this.width = 150;
        this.height = 50;
        this.setAmount(0);
    };

    /**sets the correct image of the bottlebar depending how much bottles were collected */
    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES_SB_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**sets the index of the image depending how much bottles were collected */
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