class CharacterStatusbar extends DrawableObject {

    IMAGES_SB_ENERGY = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_SB_ENERGY);
        this.x = 50;
        this.y = 15;
        this.width = 150;
        this.height = 50;
        this.setPercentage(100);
    };

    /**sets the correct image of the healthbar depending how much energy is left */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_SB_ENERGY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**returns an index of the image dependin much much energy is left */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        };
    };
}