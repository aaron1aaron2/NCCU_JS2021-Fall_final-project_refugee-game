let introImgs = [];
let now = 0;

function preload() {
    introImgs[0] = loadImage('./images/intro/notebook.png');
    introImgs[1] = loadImage('./images/intro/story.png');
    introImgs[2] = loadImage('./images/intro/story.png');
    introImgs[3] = loadImage('./images/intro/story.png');
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

    textSize(140);
    textAlign(CENTER, CENTER);
    text(`${now+1}`, 500, 300);
}

