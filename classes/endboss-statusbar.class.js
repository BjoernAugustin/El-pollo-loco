class EndbossStatusbar extends DrawableObject {

    IMAGES_SB_ENERGY = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_SB_ENERGY);
        this.x = 530;
        this.y = -100;
        this.width = 150;
        this.height = 50;
        this.setPercentage(60);
    };

    /**sets the correct image of the healthbar depending how much energy is left */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_SB_ENERGY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**returns an index of the image dependin much much energy is left */
    resolveImageIndex() {
        if (this.percentage == 60) {
            return 5;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        };
    };
}