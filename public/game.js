let background_img;
let palne;
let score = 0;
let sprite_list = [0,0,0,0,0,0,0,0,0,0];
let xLable
let yLabel = 350; 

function random_move(character, heightlimit) {
    if (character.position.x >= width - character.width / 2) {
        character.velocity.x = -random(12);
    } else if (character.position.x <= 0 + character.width / 2) {
        character.velocity.x = random(12);
    } else if (character.position.y >= height - (character.height/2) ) {
        character.velocity.y = -random(7);
    } else if (character.position.y <= heightlimit + character.height / 2) {
        character.velocity.y = random(7);
    } 
}

function touch_detection(i) {
    x_dif = Math.abs(mouseX - i.position.x);
    y_dif = Math.abs(mouseY - i.position.y);
    if (x_dif < 30 && y_dif < 30) {
        i.position.x = mouseX;
        i.position.y = mouseY;
    } else {
        random_move(i, 300)
    }
}

function preload() {
    background_img = loadImage('./images/background.jpg');
    plane = loadImage('./images/plane_fly.png')

    for(let i = 0 ; i < sprite_list.length ; i++){
        let way = i % 6;
        switch(way){
            case 0 :
                yLabel = 350 ;
                break;
            case 1 :
                yLabel = 400 ;
                break
            case 2 :
                yLabel = 450 ;
                break    
            case 3 :
                yLabel = 500 ;
                break    
            case 4 :
                yLabel = 500 ;
                break 
            case 5 :
                yLabel = 550 ;
                break 
            }
        sprite_list[i] = createSprite(Math.random()*1000%1000+50 ,yLabel);
        sprite_list[i].addImage(loadImage('./images/animal/chick.png'));
        sprite_list[i].scale =0.5;
        sprite_list[i].isClicked = false;
        
        //sprite_list[i].setSpeed(random(5), random(360));
    }
    
    console.log(sprite_list);
}

function setup() {
    createCanvas(1000, 600);
    plane.width = 700;
    image(plane,0,0);
    for (let g = 0 ; g < sprite_list.length ; g++){
        sprite_list[g].setVelocity(Math.random()*100%5+6, 0);
    }
}

function draw() {
    background(background_img);
    image(plane, 160,30);
    for (let j = 0;j < sprite_list.length;j++) {
        // Step 5: add code here to detect (add adjust) the mountains positions
        if (sprite_list[j].position.x >= 1000) {
            sprite_list[j].position.x = 0;
        }
    }   
    // for (let k = 0 ; k < sprite_list.length;k++){
    //     random_move(sprite_list[k],350);
    //     drawSprite(sprite_list[k]);
    // }    
    for (let q = 0 ; q <sprite_list.length;q++){
        if(mouseX <= sprite_list[q].position.x+30 && mouseX >= sprite_list[q].position.x-30){
            if(mouseY <= sprite_list[q].position.y+30 && mouseY >= sprite_list[q].position.y-30){
                if (mouseIsPressed){
                    sprite_list[q].position.x = 50;
                    score += 1;
                }
            }
        }
    }
    drawSprites();
    console.log(score);
}

// function mouseClicked() {
//     if(mouseX <= chick.position.x+30 && mouseX >= chick.position.x-30){
//         if(mouseY <= chick.position.y+30 && mouseY >= chick.position.y-30){
//             score = score +1 ;
//             // for (let i of sprite_list) {
//             //     chick.position.x = mouseX;
//             //     chick.position.y = mouseY;
//             // }
//         }
//     }
// }


//界線：1000 250

// function mouseDragged() {
//     chick.position.x = mouseX;
//     chick.position.y = mouseY;
// }
// function mousePressed() {
//     shape1.pressed();
//     shape2.pressed();
// }

// function mouseReleased() {
//     shape1.released();
//     shape2.released();
// }