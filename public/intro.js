let introImgs=[];
let click = 1;
let now=0;
let last_intro_page=false;
let end_intro=false;



function preload() {
    introImgs[0] = loadImage('./images/intro/notebook.png');
    introImgs[1] = loadImage('./images/intro/Inkednotebook_LI.jpg');
    introImgs[2] = loadImage('./images/intro/Inkednotebook_LI3.jpg');
    introImgs[3] = loadImage('./images/intro/Inkednotebook_LI4.jpg');
}

function setup() {
    createCanvas(1000, 600);

}

function draw() {

    if(now<introImgs.length-1){
        
        next_button = createButton("下一頁");
        next_button.position(900, 550); 
        next_button.mousePressed(() => now = now+1);
        background(introImgs[now]);

        if(now===introImgs.length-1){
            next_button.hidee();
        }
    }
    else if(now===introImgs.length-1){
        // next_button.hide();
        last_intro_page=true;
    }
    if (last_intro_page){
        next_button.hide();
        start_button=createButton('開始遊戲');
        start_button.position(900,550);
        start_button.mousePressed(() => end_intro = true);
    }
    if (end_intro){
        window.location.href = "index.html";
    }
    
}

