class Cloud extends MovableObject {
    y = 20;
    width = 450;
    height = 200;
    speed = Math.random() / 5;

    constructor(x) {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    };

    /**moves the clouds to the left in relation to the speed */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    };


}