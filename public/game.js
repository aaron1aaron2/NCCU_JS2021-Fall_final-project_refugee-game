// 變數 ===========================================
/* 路徑變數 */
// 遊戲中
let game_background_img_path = './images/background.jpg';
let game_palne_path = './images/UI/game/plane.png';
let game_palne_colse_path = './images/UI/game/plane_close.png'; 
let game_people_path = './images/role/people.png'
let game_bonus_soldier_path  = './images/role/soldier.png';

let game_timebox_path = './images/UI/game/time_box.png' // 時間條得框
let game_timebox_now_path = './images/UI/game/time_now.png' // 時間條得內容物

let game_stop_button_path = './images/UI/game/stop.png' // 進入暫停

let game_score_1_path='./images/UI/game/score_1.png';
let game_score_2_path='./images/UI/game/score_2.png';

let priority_list_path = './images/UI/game/list_1.png'

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
let time_bar_xSize = 315;
let time_bar_xPlace = 33;

let prepare_timer = 4; // 1秒視顯示 start
let game1_timer = 3;
let game1_special_role_show_timer = game1_timer/2;

let game2_timer = 3;
let total_game_timer = game1_timer + game2_timer;
let time_bar_reduce_freq = Math.floor(total_game_timer/10);

let result_wait_counter = 0;

let countDownSwitch = false;


// 計分
let score = 0;
let people_count = 0;
let soldier_count = 0;

let people_score = 1;
let soldier_score = 2;

// 其他
let click_detect_border_x = 30;
let click_detect_border_Y = 50;

let fireworks = [];
let max_firework_num = 10;

let popup_score = [];
let score_popup_sceond = 2;

// 頁面切換
let pause_frames = false;

let prepare_frames = true;
let game1_frames = false;
let game2_frames = false;
let result_frames = false;
// ===============================================

// 涵式 ==========================================
function getRandomInt(num) {
    return Math.floor(Math.random() * num);  // %5 代表num = 5 ->只會輸出0 1 2 3 4
}

function popupFadeoutScore(x, y, scoreImage) {
    let s=createSprite(x,y-10, 100, 100);
    s.addImage(scoreImage);
    s.setVelocity(0,-5);
    // s.life=1500;
    s.life_sec = score_popup_sceond;
    popup_score.push(s);
}

function click_detect() {
    for (let q = 0 ; q < sprite_list_all.length;q++){
        let x_loc = sprite_list_all[q].position.x
        let y_loc = sprite_list_all[q].position.y

        if(mouseX <= x_loc+click_detect_border_x+10 && mouseX >= x_loc-click_detect_border_x){
            if(mouseY <= y_loc+click_detect_border_Y && mouseY >= y_loc-click_detect_border_Y){
                sprite_list_all[q].position.x = 50;
                if (sprite_list_all[q].role == "People"){
                    score += people_score;
                    people_count += 1;
                    popupFadeoutScore(mouseX, mouseY, score1Image);
                    sprite_list_all[q].position.y = yLabelList[getRandomInt(yLabelList.length)];
                }
                else if (sprite_list_all[q].role == "Soldier"){
                    score += soldier_score;
                    soldier_count += 1;
                    popupFadeoutScore(mouseX, mouseY, score2Image);
                    sprite_list_all[q].position.y = yLabelList[getRandomInt(yLabelList.length)];
                }
            }
        }
    }
}

// function pressed_detect(q) {
//     if(mouseX <= sprite_list_all[q].position.x+30 && mouseX >= sprite_list_all[q].position.x-30){
//         if(mouseY <= sprite_list_all[q].position.y+30 && mouseY >= sprite_list_all[q].position.y-30){
//             if (mouseIsPressed){
//                 // mouseIsPressed
//                 sprite_list_all[q].position.x = 50;
//                 if (sprite_list_all[q].role == "People"){
//                     score += people_score;
//                     // popupFadeoutText(people_score, mouseX-100, mouseY+100);
//                     sprite_list_all[q].position.y = yLabelList[getRandomInt(yLabelList.length)];
//                 }
//                 else if (sprite_list_all[q].role == "Soldier"){
//                     score += soldier_score;
//                     // popupFadeoutText(soldier_score, mouseX-100, mouseY+100);
//                     sprite_list_all[q].position.y = yLabelList[getRandomInt(yLabelList.length)];
//                 }
//             }
//         }
//     }
// }

/* 第一階段: 角色控制 */
function role_step(q) {
    // S超出界線則重製
    if (sprite_list_all[q].position.x >= 1000) {
        sprite_list_all[q].position.x = 0;
        // 跑完一段後隨機改變跑道 
        sprite_list_all[q].position.y = yLabelList[getRandomInt(yLabelList.length)];
    }
    // 控制角色出現時間
    if (sprite_list_all[q].role == "People") {
        drawSprite(sprite_list_all[q]);
    } else {
        if (game1_special_role_show_timer <= 0){
            drawSprite(sprite_list_all[q]);
        }
    }
    
    for (let q = 0 ; q < popup_score.length;q++) {
        if (frameCount % 60 == 0) {
            popup_score[q].life_sec --;
        }
        drawSprite(popup_score[q]);
    }

    popup_score = popup_score.filter((i => i.life_sec!=0))

    // pressed_detect(q); // 判斷滑鼠按著
}

// p5js ==========================================
function preload() {
    background_img = loadImage(game_background_img_path);
    plane = loadImage(game_palne_path);
    plane_close = loadImage(game_palne_colse_path);

    score1Image = loadImage(game_score_1_path);
    score2Image = loadImage(game_score_2_path);

    prioritylistImage = loadImage(priority_list_path);
    timeBoxImage = loadImage(game_timebox_path);
    timeNowImage = loadImage(game_timebox_now_path);

    result_success_frame = loadImage(result_success_frame_path);
    
    peopleImage = loadImage(game_people_path);
    soldierImage = loadImage(game_bonus_soldier_path);

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
    // 按鈕
    pause_button = createImg(game_stop_button_path);
    pause_button.position(410, 90); 
    pause_button.mousePressed(() => pause_frames = true);
    pause_button.hide()
    
    pause_list_frame = createImg(pause_frame_path);
    pause_list_frame.position(300, 100); 
    pause_list_frame.hide()

    pause_continute_button = createImg(pause_continue_button_path);
    pause_continute_button.position(420, 280); 
    pause_continute_button.mousePressed(() => pause_frames = false);
    pause_continute_button.hide()

    pause_restart_button = createImg(pause_restart_button_path);
    pause_restart_button.position(420, 350); 
    pause_restart_button.mousePressed(() => window.location.href = "game.html");
    pause_restart_button.hide()

    pause_exit_button = createImg(pause_exit_button_path);
    pause_exit_button.position(420, 420); 
    pause_exit_button.mousePressed(() => window.location.href = "index.html");
    pause_exit_button.hide()

    /* 結果統計  */

    home_page_button = createImg(result_exit_button_path);
    home_page_button.position(320, 500); 
    home_page_button.mousePressed(() => window.location.href = "index.html");
    home_page_button.hide()

    restart_button = createImg(result_restart_button_path);
    restart_button.position(550, 500); 
    restart_button.mousePressed(() => window.location.href = "game.html");
    restart_button.hide()
}

function draw() {
    if (pause_frames) {
        /* 背景 */

        /* 按鈕 */
        pause_list_frame.show();
        pause_continute_button.show();
        pause_exit_button.show();
        pause_restart_button.show();
        pause_button.hide();
    

    } else if (prepare_frames) {
        /* 背景 */
        background(0,0,0,25);

        fill(255, 255, 255, 50);

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
        // 遊戲一 ----------------------------------


        /* 背景 */
        // background(0,0,0,25);
        background(background_img);
        image(plane, 0, 90);

        pause_button.show();
        pause_continute_button.hide();
        pause_exit_button.hide();
        pause_restart_button.hide();
        pause_list_frame.hide();

        /*優先名單*/
        image(prioritylistImage,800,30,180,230);
        image(timeBoxImage,30,0,320,100);
        image(timeNowImage,time_bar_xPlace,10,time_bar_xSize,85);

        /* 計時 */
        if (frameCount % 60 == 0 && game1_timer > 0){
            game1_timer--;
            game1_special_role_show_timer--;
            if (frameCount % time_bar_reduce_freq == 0) {
                time_bar_xSize -= 30;
                time_bar_xPlace += 0.7;
            }
        }

        /* 畫面切換 */
        if (game1_timer==0){
            game1_frames = false;
            game2_frames = true;
        }

        /* 玩家互動 */
        for (let q = 0 ; q < sprite_list_all.length;q++){
            role_step(q);
        }

    } else if (game2_frames) {
        // 遊戲二 ----------------------------------

        /* 預設背景 */
        // background(0,0,0,25);
        // fill(255, 255, 255, 10);
        // textSize(140);
        // textAlign(CENTER, CENTER);
        // text(`Game 2`, 500, 300);

        /* 背景 */
        background(background_img);
        image(plane_close, 0, 90);

        pause_button.show();
        pause_continute_button.hide();
        pause_exit_button.hide();
        pause_restart_button.hide();
        pause_list_frame.hide();

        /*優先名單*/
        image(prioritylistImage,800,30,180,230);

        /* 時間條 */
        image(timeBoxImage,30,0,320,100);
        image(timeNowImage,time_bar_xPlace,10,time_bar_xSize,85);
        /* 計時 */
        if (frameCount % 60 == 0 && game2_timer > 0){
            game2_timer--;
            if (frameCount % time_bar_reduce_freq == 0) {
                time_bar_xSize -= 30;
                time_bar_xPlace += 0.7;
            }
        }

        /* 畫面切換 */
        if (game2_timer==0){
            game2_frames = false;
            result_frames = true;
        }

        /* 玩家互動 */
        for (let q = 0 ; q < sprite_list_all.length;q++){
            role_step(q);
        }
        
    } else {
        // 結果頁面 ----------------------------------
        /* 結果統計頁面 */
        pause_button.hide();
        pause_continute_button.hide();
        pause_exit_button.hide();
        pause_restart_button.hide();

        // 等3秒才顯示按鈕
        if (result_wait_counter > 3) {
            background(result_success_frame);
            // image(result_success_frame, 250, 50)
            image(peopleImage, 400, 200, 50, 90)
            image(soldierImage, 400, 300, 50, 90)

            home_page_button.show();
            restart_button.show();

            textSize(60);
            fill(0, 0, 0, 150);
            textAlign(LEFT, CENTER);
            text(`X ${people_count}`, 500, 250);
            text(`X ${soldier_count}`, 500, 350);
        } else {
            background(0,0,0,25);
            fill(255, 255, 255, 10);
            textSize(140);
            textAlign(CENTER, CENTER);
            text(`Score: ${score}`, 500, 300);
        }

        // 最後將所有累積的煙火放出來
        for (let f of fireworks) f.step()

        // 計時
        if (frameCount % 60 == 0){result_wait_counter++}
    }
}
// ===============================================

function mouseReleased() {
    let target = {
        x: mouseX,
        y: mouseY
    }
    // 只留10個，多的隨機移除
    if (fireworks.length > max_firework_num) {
        let rm_idx = getRandomInt(max_firework_num);
        fireworks.splice(rm_idx, 1);
    }
    fireworks.push(new Firework(target)); // 玩遊戲時點擊會累積煙火
}

function mouseClicked() {
    click_detect();
}

// function mouseDragged() {
//     chick.position.x = mouseX;
//     chick.position.y = mouseY;
// }