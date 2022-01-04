// 變數 ===========================================
/* 路徑變數 */
// 遊戲中
let game_background_img_path = './images/background.jpg';
let game_palne_path = './images/UI/game/plane.png';
let game_palne_colse_path = './images/UI/game/plane_close.png'; // 尚未使用
let game_people_path = './images/role/people.png'
let game_bonus_soldier_path  = './images/role/soldier.png';
let game_stop_button_path = './images/UI/game/stop.png' // 尚未使用 // 進入暫停
let game_timebox_path = './images/UI/game/time_box.png' // 時間條得框  // 尚未使用
let game_timebox_now_path = './images/UI/game/time_now.png' // 時間條得內容物 // 尚未使用

// 暫停
let pause_continue_button_path = './images/UI/pause/continue.png' // 繼續遊戲
let pause_exit_button_path = './images/UI/pause/exit.png' // 回主頁面
let pause_restart_button_path = './images/UI/pause/restart.png' // 回主頁面
let pause_frame_path = './images/UI/pause/pause_list.png' // 暫停清單

// 結果統計
let result_exit_button_path = './images/UI/result/exit.png' // 回主頁面
let result_restart_button_path = './images/UI/result/restart.png' // 再玩一次
let result_success_frame_path = './images/UI/result/success.png' //成功頁面
let result_failed_frame_path = './images/UI/result/failed.png' //成功頁面


/* 遊戲變數 */
// 角色
let sprite_list = [0,0,0,0,0,0,0,0,0,0];
let sprite_list_bonus = [0]; //要加新角色就多用一個list
let sprite_list_all = [...sprite_list,...sprite_list_bonus];
// let xLable
let yLabel = 350; 
let yLabelList = [350,400,450,500,550];
let people_run_speed_base = 6; // 公式: Math.random()*100%5 + base speed
let soldier_run_speed_base = 18;

// 計時
let prepare_timer = 4; // 1秒視顯示 start
let game1_timer = 10;
let game1_special_role_show_timer = game1_timer/2;
let game2_timer = 3;
let countDownSwitch = false;

// 計分
let score = 0;
let people_score = 1;
let soldier_score = 2;


// 頁面切換
let pause_frames = false;

let prepare_frames = true;
let game1_frames = false;
let game2_frames = false;
let result_frames = false;
// ===============================================

// 涵式 ==========================================
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

function getRandomInt(num) {
    return Math.floor(Math.random() * num);  // %5 代表num = 5 ->只會輸出0 1 2 3 4
}

function popupFadeoutText(t, x, y) {
    let fade = 225;
    let fadeAmount = -20;

    textSize(100)
    fill(0, 255, 0, fade)
    text(`${t}`, x, y);
    fade += fadeAmount;
}

// p5js ==========================================
function preload() {
    background_img = loadImage(game_background_img_path);
    plane = loadImage(game_palne_path);

    for(let i = 0 ; i < sprite_list_all.length;i++){
        let ran = getRandomInt(yLabelList.length);

        /*如果要加角色要在這裡加入新的*/
        if (i < sprite_list.length){
            sprite_list_all[i] = createSprite(Math.random()*1000%1000+50, yLabelList[ran]);
            sprite_list_all[i].addImage(loadImage(game_people_path));
            sprite_list_all[i].role = "People";   
            sprite_list_all[i].scale =0.3;
            sprite_list_all[i].isClicked = false;            
        }
        else if (i >= sprite_list.length && i < sprite_list_all.length){
            sprite_list_all[i] = createSprite(Math.random()*1000%1000+50, yLabelList[ran]);
            sprite_list_all[i].addImage(loadImage(game_bonus_soldier_path));
            sprite_list_all[i].role = "Soldier";
            sprite_list_all[i].scale = 0.3;
            sprite_list_all[i].isClicked = false;
        }
    }
}

function setup() {
    createCanvas(1000, 600);
    plane.width = 700;

    /* 角色移動 */ 
    for (let g = 0 ; g < sprite_list_all.length ; g++){
        if (sprite_list_all[g].role == "People"){
            sprite_list_all[g].setVelocity(Math.random()*100%5+people_run_speed_base, 0);
        }
        else if (sprite_list_all[g].role == "Soldier"){
            sprite_list_all[g].setVelocity(Math.random()*100%5+soldier_run_speed_base, 0);
        }
    }
    /* 暫停頁面 */
    pause_button = createButton("Pause");
    pause_button.position(500, 100); 
    pause_button.style('font-size', '20px');
    pause_button.mousePressed(() => pause_frames = true);
    pause_button.hide()

    pause_continute_button = createButton("Continute");
    pause_continute_button.position(200, 500); 
    pause_continute_button.style('font-size', '50px');
    pause_continute_button.mousePressed(() => pause_frames = false);
    pause_continute_button.hide()

    pause_exit_button = createButton("Exit");
    pause_exit_button.position(700, 500); 
    pause_exit_button.style('font-size', '50px');
    pause_exit_button.mousePressed(() => window.location.href = "index.html");
    pause_exit_button.hide()

    pause_restart_button = createButton("Restart");
    pause_restart_button.position(470, 500); 
    pause_restart_button.style('font-size', '50px');
    pause_restart_button.mousePressed(() => window.location.href = "game.html");
    pause_restart_button.hide()
    
    /* 結果統計  */
    home_page_button = createButton("Home page");
    home_page_button.position(230, 500); 
    home_page_button.style('font-size', '50px');
    home_page_button.mousePressed(() => window.location.href = "index.html");
    home_page_button.hide()

    restart_button = createButton("Play again");
    restart_button.position(630, 500); 
    restart_button.style('font-size', '50px');
    restart_button.mousePressed(() => window.location.href = "game.html");
    restart_button.hide()
}

function draw() {
    if (pause_frames) {
        /* 背景 */

        /* 按鈕 */
        pause_continute_button.show();
        pause_exit_button.show();
        pause_restart_button.show();
        pause_button.hide();
    

    } else if (prepare_frames) {
        /* 背景 */
        background(0,0,0,25);
        fill(255, 255, 255, 10);

        /* 計時 */
        textSize(140);
        textAlign(CENTER, CENTER);
        if (prepare_timer>1){
            text(prepare_timer-1, 500, 300);
        }

        if (frameCount % 60 == 0 && prepare_timer > 0){
            prepare_timer--;
        }
        if (prepare_timer==1){
            text('Start !', 500, 300);
        }
        
        /* 畫面切換 */
        if (prepare_timer==0){
            prepare_frames = false;
            game1_frames = true;
        }

    } else if (game1_frames) {
        /* 背景 */
        background(background_img);
        image(plane, 0, 90);
        pause_button.show();
        pause_continute_button.hide();
        pause_exit_button.hide();
        pause_restart_button.hide();

        /* 計時 */
        textSize(100);
        textAlign(CENTER, CENTER);
        text(game1_timer, 70, 70);
        if (frameCount % 60 == 0 && game1_timer > 0){
            game1_timer--;
            game1_special_role_show_timer--;
        }

        /* 畫面切換 */
        if (game1_timer==0){
            game1_frames = false;
            game2_frames = true;
        }

        /* 角色 */
        for (let j = 0;j < sprite_list_all.length;j++) {
            // S超出界線則重製
            if (sprite_list_all[j].position.x >= 1000) {
                sprite_list_all[j].position.x = 0;
                // 跑完一段後隨機改變跑道 
                let new_ran = getRandomInt(yLabelList.length);
                sprite_list_all[j].position.y = yLabelList[new_ran];
            }
            // 控制角色出現時間
            if (sprite_list_all[j].role == "People") {
                drawSprite(sprite_list_all[j]);
            } else {
                if (game1_special_role_show_timer <= 0){
                    drawSprite(sprite_list_all[j]);
                }
            }
        }

        /* 玩家互動 */
        for (let q = 0 ; q <sprite_list_all.length;q++){
            if(mouseX <= sprite_list_all[q].position.x+30 && mouseX >= sprite_list_all[q].position.x-30){
                if(mouseY <= sprite_list_all[q].position.y+30 && mouseY >= sprite_list_all[q].position.y-30){
                    if (mouseIsPressed){
                        sprite_list_all[q].position.x = 50;
                        if (sprite_list_all[q].role == "People"){
                            score += people_score;
                            // popupFadeoutText(people_score, mouseX-100, mouseY+100);
                        }
                        else if (sprite_list_all[q].role == "Soldier"){
                            score += soldier_score;
                            // popupFadeoutText(soldier_score, mouseX-100, mouseY+100);
                        }
                    }
                }
            }
        }

    } else if (game2_frames) {
        /* 背景 */
        background(0,0,0,25);
        pause_button.show();
        pause_continute_button.hide();
        pause_exit_button.hide();
        pause_restart_button.hide();

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

        /* 畫面切換 */
        if (game2_timer==0){
            game2_frames = false;
            result_frames = true;
        }

    } else {
        /* 結果統計頁面 */
        background(0,0,0,25);
        fill(255, 255, 255, 10);
        textSize(140);
        textAlign(CENTER, CENTER);
        text(`Score: ${score}`, 500, 300);
        home_page_button.show();
        restart_button.show();
        pause_button.hide();
        pause_continute_button.hide();
        pause_exit_button.hide();
        pause_restart_button.hide();
    }
}
// ===============================================


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