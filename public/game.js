// 變數 ===========================================
/* 固定變數 */
let result_background_img;
let background_img_path = './images/background.jpg';
let palne_path = './images/plane_fly.png';
let people_path = './images/animal/chick.png'

/* 動態變數 */
// 角色
let sprite_list = [0,0,0,0,0,0,0,0,0,0];
// let xLable
let yLabel = 350; 

// 計時
let game1_timer = 10;
let game2_timer = 3;
let countDownSwitch = false;

// 計分
let score = 0;

// 頁面切換
let game2_frames = false;
let result_frames = false;
// ===============================================

// 變數 ==========================================
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
// ===============================================

function preload() {
    // result_background_img = loadImage('./images/annai_monitor_businessman.png');
    background_img = loadImage(background_img_path);
    plane = loadImage(palne_path)

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
        sprite_list[i].addImage(loadImage(people_path));
        sprite_list[i].scale =0.5;
        sprite_list[i].isClicked = false;
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

    /* 結果統計 - 回主頁面 */
    home_page_button = createButton("Home page");
    home_page_button.position(400, 500); 
    home_page_button.style('font-size', '50px');
    home_page_button.mousePressed(() => window.location.href = "index.html");
    home_page_button.hide()

    restart_button = createButton("Home page");
    restart_button.position(400, 500); 
    restart_button.style('font-size', '50px');
    restart_button.mousePressed(() => window.location.href = "index.html");
    restart_button.hide()
}

function draw() {
    if (result_frames) {
        /* 結果統計頁面 */
        background(0,0,0,25);
        fill(255, 255, 255, 10);
        textSize(140);
        textAlign(CENTER, CENTER);
        text(`Score: ${score}`, 500, 300);
        home_page_button.show()

    } else if (game2_frames) {
        /* 背景 */
        background(0,0,0,25);
        fill(255, 255, 255, 10);
        textSize(140);
        textAlign(CENTER, CENTER);
        text(`Game 2`, 500, 300);
        
        /* 計時 */
        textAlign(CENTER, CENTER);
        textSize(100);
        text(game2_timer, 70, 70);
        if (frameCount % 60 == 0 && game2_timer > 0){
            game2_timer--;
        }
        if (game2_timer==0){
            game2_frames = false;
            result_frames = true;
        }

    } else {
        /* 背景 */
        background(background_img);
        image(plane, 160,30);

        /* 計時 */
        textAlign(CENTER, CENTER);
        textSize(100);
        text(game1_timer, 70, 70);
        if (frameCount % 60 == 0 && game1_timer > 0){
            game1_timer--;
        }
        if (game1_timer==0){
            game2_frames = true;
        }

        /* 角色 */
        for (let j = 0;j < sprite_list.length;j++) {
            // Step 5: add code here to detect (add adjust) the mountains positions
            if (sprite_list[j].position.x >= 1000) {
                sprite_list[j].position.x = 0;
            }
        }   

        /* 玩家互動 */
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
        // console.log(score);
    }
}


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