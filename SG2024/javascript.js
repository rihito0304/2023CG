
//canvas要素を取得
const canvas = document.getElementById("gameCanvas");   
const ctx = canvas.getContext("2d");  

//画像読み込み
const rectImage = new Image();
rectImage.src = 'https://pbs.twimg.com/media/Fy9FwNLaUAAaJ5Y?format=jpg&name=medium';

const enemyImage = new Image();
enemyImage.src = 'https://orangepostreason.com/wp-content/uploads/2024/06/50557f586a8d045a921d1b820d3bf78f.webp';


//自機のサイズ
const rectWidth = 50;
const rectHeight = 55;

//自機の最初の位置
let rectX = canvas.width / 2 - rectWidth / 2;
let rectY = canvas.height - rectHeight - 5;


//四角形の移動速度
let speedX = 5;

let speedY = -4;

let enemyspeed = 2;

let leftPressed = false;  //左矢印キー
let rightPressed = false; //右矢印キー
let spacePressed = false;

let bullets = [];
let enemies = [];

let score = 0;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keypress", keyPressHandler);


//keydown イベントが発生したときに、押されたキーの情報を受け取る
function keyDownHandler(e) {
    
    //押されたキーが左矢印キーの場合
    if(e.key === "ArrowLeft" || e.key === "Left"){
        leftPressed = true;
    }
    //押されたキーが右矢印キーの場合
    else if(e.key === "ArrowRight" || e.key === "Right"){
        rightPressed = true;
    }

}

//keyup イベントが発生したときに、離されたキーの情報を受け取る
function keyUpHandler(e) {

    //離されたキーが左矢印キーの場合
    if(e.key === "ArrowLeft" || e.key === "Left"){
        leftPressed = false;
    }
    //離されたキーが右矢印キーの場合
    else if(e.key === "ArrowRight" || e.key === "Right"){
        rightPressed = false;
    }
    
}

//keypressイベントが発生したとき、押して離したキーの情報を受け取る
function keyPressHandler(e) {

    if(e.key === " " || e.key === "Spasebar"){
        bullets.push({x: rectX + rectWidth / 2 - 2.5, y: rectY, width: 5, height: 10});
    }

}

//押されているキーの方向へ四角形の描画位置を更新
function move() {
    //左へ動かす
    if (leftPressed && rectX > 0) {
        rectX -= speedX;
    }
    //右へ動かす
    if (rightPressed && rectX + rectWidth < canvas.width) {
        rectX += speedX;
    }

}
//自機を描画
function drawRect() {
    ctx.drawImage(rectImage, rectX, rectY, rectWidth, rectHeight);
}

//弾を描画
function drawBullets() {
    ctx.fillStyle = "#c71585";
    bullets.forEach((b, i) => {ctx.fillRect(b.x, b.y, b.width, b.height);
        b.y += speedY;
        if(b.y < 0){
        bullets.splice(i, 1); //bullets配列から削除
        }
    });
}


//敵を描画
function drawEnemies() {
    enemies.forEach((e, i) => {ctx.drawImage(enemyImage, e.x, e.y, e.width, e.height);
        e.y += enemyspeed;
        if(e.y > canvas.height){
        enemies.splice(i, 1);  //enemies配列から削除
        score -= 10
        }
    });       
}


//敵をランダムな位置に生成
function createEnemies(){
    let enemyX = Math.random() * canvas.width;
    if(Math.random() < 0.02){
        let enemyX = Math.random() * (canvas.width - 35);
        enemies.push({x: enemyX, y: 0, width: 35, height: 35});
    }
}

//弾と敵が衝突したら消える
function Collisions(){
    bullets.forEach((b, bulletIndex) =>{
        enemies.forEach((e, enemyIndex) =>{
            if(b.x < e.x + e.width && b.x + b.width > e.x &&
                b.y < e.y + e.height && b.y + b.height > e.y){

               // 衝突が検出された場合、弾と敵機を削除
               bullets.splice(bulletIndex, 1);
               enemies.splice(enemyIndex, 1);
               score += 20
            }
        });
    });
}

//スコア表示
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 23);
  }

//キャンバスに描画してアニメーションする
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    drawRect();
    drawBullets();
    drawEnemies();
    createEnemies();
    Collisions()
    drawScore()

    requestAnimationFrame(update);     //updateを繰り返してアニメーションになる
}

// ゲーム開始
document.addEventListener("DOMContentLoaded", (event) => {
    update();
});
