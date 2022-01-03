// 變數 ===========================================
let story_page1_path = './images/UI/intro/story.png';
let story_page2_path = './images/UI/intro/story.png';
let story_page3_path = './images/UI/intro/story.png';
let story_page4_path = './images/UI/intro/story.png';

let next_button_path = './images/UI/intro/next.png'; // 尚未使用
// let pre_button_path = './images/UI/intro/pre.png'; // 尚未使用
let start_game_button_path = './images/UI/intro/start.png'; // 尚未使用

let introImgs = [];
let now = 0;
// ===============================================

// p5js ==========================================
function preload() {
    introImgs[0] = loadImage(story_page1_path);
    introImgs[1] = loadImage(story_page2_path);
    introImgs[2] = loadImage(story_page3_path);
    introImgs[3] = loadImage(story_page4_path);
}

function setup() {
    createCanvas(1000, 600);
    /* 建立所需 buttom 並隱藏*/
    pre_button = createButton("Prev"); //上一頁
    pre_button.position(130, 520); 
    pre_button.style('font-size', '30px');
    pre_button.hide();

    next_button = createButton("Next"); //下一頁
    next_button.position(900, 520); 
    next_button.style('font-size', '30px');
    // next_button.style('background-color', color(128, 128, 128, 50));
    next_button.hide();

    start_button=createButton('Start'); // 開始遊戲
    start_button.position(900,520);
    start_button.style('font-size', '30px');
    start_button.hide();
}

function draw() {
    /* 各頁面顯示按鈕條件與動作 */
    // 不是第一頁時
    if (now>0) {
        pre_button.show();
        pre_button.mousePressed(() => now = now-1);
    } else {
        pre_button.hide();
    }
    
    // 不是最後一頁時
    if (now<introImgs.length-1){
        next_button.show();
        next_button.mousePressed(() => now = now+1);
    } else {
        next_button.hide();
    }

    // 最後一頁
    if (now===introImgs.length-1){
        start_button.show();
        start_button.mousePressed(() => window.location.href = "game.html"); // 進入遊戲
    } else{
        start_button.hide();
    }

    /* 顯示當前頁面 */
    background(introImgs[now]);

    // 識別文字
    textSize(140);
    textAlign(CENTER, CENTER);
    text(`${now+1}`, 500, 300);
}

// ===============================================
