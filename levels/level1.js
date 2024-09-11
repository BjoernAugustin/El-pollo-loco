let level1

function initLevel() {
level1 = new Level(
    [
    new Chicken(400),
    new Chicken(650),
    new ChickenSmall(750),
    new Chicken(900),
    new ChickenSmall(1100),
    new Chicken(1100),
    new Chicken(1350),
    new ChickenSmall(1400),
    new Chicken(1650),
    new ChickenSmall(1700),
    new Chicken(1900),
    new ChickenSmall(2000),
    new ChickenSmall(2300),
    new Chicken(2350),
    new Chicken(2900),
    new ChickenSmall(2900),
    new Chicken(3200),
    new ChickenSmall(3300),
    new Chicken(3350),
    new ChickenSmall(3500),
    new Endboss()
],
[
    new Cloud(Math.random() * 500),
    new Cloud(Math.random() * 1700),
    new Cloud(Math.random() * 3500),
    new Cloud(Math.random() * 4200),
    new Cloud(Math.random() * 6000)
],
[
    new BackgroundObject('assets/img/5_background/layers/air.png', -719),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719), 

    new BackgroundObject('assets/img/5_background/layers/air.png', 0),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('assets/img/5_background/layers/air.png', 719),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),
    
    new BackgroundObject('assets/img/5_background/layers/air.png', 719*2),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*2),

    new BackgroundObject('assets/img/5_background/layers/air.png', 719*3),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3),
],

[
    new Coin(500, 150),
    new Coin(750, 300),
    new Coin(1000, 150),
    new Coin(1250, 300),
    new Coin(1500, 150)
],

[
    new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 300),
    new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 625),
    new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 875),
    new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1125),
    new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1750)
]

);

}