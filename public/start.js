let background_img;
let intro_started = false;
let game_started = false;

// // 法二:直接在同一個js進入遊戲介紹所需的變數
// let introImgs=[];
// let now=1;
// let end=false;



function preload() {
    background_img = loadImage('./images/background.jpg');
    // buttun 素材

    // 法二:intron所需的素材
    introImgs[1] = loadImage('./images/notebook.png');
    introImgs[2] = loadImage('./images/Inkednotebook_LI.jpg');
    introImgs[3] = loadImage('./images/Inkednotebook_LI3.jpg');
    introImgs[4] = loadImage('./images/Inkednotebook_LI4.jpg');
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
        
        // // 法二:進入intro 場景
        // // 1.隱藏按鈕、清空背景
        // start_button.hide();
        // intro_button.hide();
        // background(255);
        // background(introImgs[now]);

      }
}