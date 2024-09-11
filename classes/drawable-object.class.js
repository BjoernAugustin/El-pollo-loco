class DrawableObject{
    x = 120;
    y = 230;
    height = 200;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    offset = {
        left: 10,
        top: 10,
        right: 30,
        bottom: 20
    };

    /**draw images in our canvas */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    /**load an image with the @param (path of the image) */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**load all images of an array with the @param (array) */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    constructor() {
    };
}