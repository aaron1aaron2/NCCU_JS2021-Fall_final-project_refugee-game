// 變數 ===========================================
let background_img_path = './images/background.jpg';
let background_clouds_img_path='./images/UI/start/clouds.png'; //白雲
let background_cloud_img_path='./images/UI/start/cloud.png'; //白雲

let start_game_button_path = './images/UI/start/game_start.png'; // 尚未使用
let intro_game_button_path = './images/UI/start/introduction.png'; 

let intro_started = false;
let game_started = false;
// ===============================================

// p5js ==========================================
function preload() {
    background_img = loadImage(background_img_path);
    background_clouds_img=createSprite(900, 250);
    background_clouds_img.addImage(loadImage(background_clouds_img_path));

    background_cloud_img=createSprite(900, 270);
    background_cloud_img.addImage(loadImage(background_cloud_img_path));
}

function setup() {
    createCanvas(1000, 600);
    background(background_img);

    // background cloud的 移動
    background_clouds_img.setVelocity(-0.6, 0);
    background_cloud_img.setVelocity(-0.8, 0);


    // button:遊戲介紹
    // intro_button = createButton("遊戲介紹");
    // intro_button.position(400, 350); 
    intro_button = createImg(intro_game_button_path);
    intro_button.position(350, 350); 
    intro_button.style('font-size', '50px');
    intro_button.mousePressed(() => intro_started = true);

    // button:遊戲開始
    // start_button = createButton("開始遊戲");
    // start_button.position(400, 430); 
    start_button = createImg(start_game_button_path);
    start_button.position(350, 430); 
    start_button.style('font-size', '50px');
    start_button.mousePressed(() => game_started = true);
}

function draw() {
    // 加入會動的白雲
    background(background_img);
    if (background_clouds_img.position.x <= 0) {
        background_clouds_img.position.x = 1500;
    }
    if (background_cloud_img.position.x <= -200) {
        background_cloud_img.position.x = 1200;
    }
    // 標題
    drawSprites();
    textSize(100);
    textAlign(CENTER);
    text('逃難者方舟',500, 200);

    if (game_started) {
        window.location.href = "game.html" ;
    }
    if (intro_started) {
        // 法一: 直接跳轉到 intro.html，載入另外一個intro.js(註解掉所有法二程式碼+最上方法二的變數)  
        window.location.href = "intro.html";
    }
}
// ===============================================
