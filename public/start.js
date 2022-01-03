// 變數 ===========================================
let background_img_path = './images/background.jpg';
let start_game_button_path = './images/UI/start/game_start.png'; // 尚未使用

let intro_started = false;
let game_started = false;
// ===============================================

// p5js ==========================================
function preload() {
    background_img = loadImage(background_img_path);
}

function setup() {
    createCanvas(1000, 600);
    background(background_img);
    
    //Game _title 
    textSize(100);
    textAlign(CENTER);
    text('逃難者方舟',500, 200);
    
    // button:遊戲介紹
    intro_button = createButton("遊戲介紹");
    intro_button.position(400, 350); 
    intro_button.style('font-size', '50px');
    intro_button.mousePressed(() => intro_started = true);

    // button:遊戲開始
    start_button = createButton("開始遊戲");
    start_button.position(400, 430); 
    start_button.style('font-size', '50px');
    start_button.mousePressed(() => game_started = true);
}

function draw() {
    if (game_started) {
        window.location.href = "game.html" ;
    }
    if (intro_started) {
        // 法一: 直接跳轉到 intro.html，載入另外一個intro.js(註解掉所有法二程式碼+最上方法二的變數)  
        window.location.href = "intro.html";
    }
}
// ===============================================
