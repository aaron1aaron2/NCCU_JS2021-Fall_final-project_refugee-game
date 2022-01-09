// 變數 ===========================================
let background_img_path = './images/background.jpg';
let background_clouds_img_path='./images/UI/start/clouds.png'; //白雲
let background_cloud_img_path='./images/UI/start/cloud.png'; //白雲

let start_game_button_path = './images/UI/start/game_start.png'; // 尚未使用
let intro_game_button_path = './images/UI/start/introduction.png'; 
let game_title_path='./images/UI/start/title.png';

let clouds=[];

let intro_started = false;
let game_started = false;
// ===============================================

// p5js ==========================================
function preload() {
    background_img = loadImage(background_img_path);
    clouds[0]=createSprite(900, 190);
    clouds[0].addImage(loadImage(background_clouds_img_path));
    
    clouds[1]=createSprite(200, 400);
    clouds[1].addImage(loadImage(background_clouds_img_path));

    
    clouds[2]=createSprite(50, 50);
    clouds[2].addImage(loadImage(background_cloud_img_path));

   
    // clouds[3]=createSprite(50, 100);
    // clouds[3].addImage(loadImage(background_cloud_img_path));
}

function setup() {
    createCanvas(1000, 600);
    background(background_img);
    game_title = createImg(game_title_path);
    game_title.position(265, -20); 

    // background cloud的 移動
    clouds[0].setVelocity(-0.4, 0);
    clouds[1].setVelocity(-0.3, 0.02);
    clouds[2].setVelocity(-0.2, 0);
    // clouds[3].setVelocity(-0.3, 0);
    // button:遊戲介紹
    // intro_button = createButton("遊戲介紹");
    // intro_button.position(400, 350); 
    intro_button = createImg(intro_game_button_path);
    intro_button.position(415, 430); 
    intro_button.style('font-size', '50px');
    intro_button.mousePressed(() => intro_started = true);

    // button:遊戲開始
    // start_button = createButton("開始遊戲");
    // start_button.position(400, 430); 
    
    start_button = createImg(start_game_button_path);
    start_button.position(415, 510); 
    start_button.style('font-size', '50px');
    start_button.mousePressed(() => game_started = true);
}

function draw() {
    // 加入會動的白雲
    background(background_img);
    if (clouds[0].position.x <= -500) {
        clouds[0].position.x = 1500;
    }
    if (clouds[1].position.x <= 400) {
        clouds[1].position.x = 1500;
    }

    if (clouds[2].position.x <= -200) {
        clouds[2].position.x = 1000;
    }

    // if (clouds[3].position.x <= -30) {
    //     clouds[3].position.x = 1000;
    // }

    // 標題
    drawSprites();
    // textSize(100);
    // textAlign(CENTER);


    if (game_started) {
        window.location.href = "game.html" ;
    }
    if (intro_started) {
        // 法一: 直接跳轉到 intro.html，載入另外一個intro.js(註解掉所有法二程式碼+最上方法二的變數)  
        window.location.href = "intro.html";
    }
}
// ===============================================
