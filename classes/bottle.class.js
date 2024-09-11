class Bottle extends MovableObject {
    
    width = 70;
    height = 70;
    offset = {
        left: 25,
        top: 15,
        right: 25,
        bottom: 10
    };
    
    constructor(imagepath, x){
        super().loadImage(imagepath);
        this.x = x;
        this.y = this.canvasHeight/100*75;
    };
}