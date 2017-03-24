var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var RADIUS;
var MARGIN_LEFT;
var MARGIN_TOP;

var endTime = new Date();
var currShowTimeSeconds = 0;

var balls = [];
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444"];

window.onload = function(){
	
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	console.log(WINDOW_WIDTH);
	console.log(WINDOW_HEIGHT);
	
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/110)-1;
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	currShowTimeSeconds = getCurrentShowTimeSeconds();//ret 相差秒数
	setInterval(function(){
		render(context);
		update();
	},50);
}
//显示当前时间差
function getCurrentShowTimeSeconds(){
	var currTime = new Date();
	var ret = currTime.getHours()*3600 + currTime.getMinutes()*60 + currTime.getSeconds();
	return ret;
}
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt(nextShowTimeSeconds%(60*60)/60);
	var nextSeconds = parseInt(nextShowTimeSeconds%60);
	
	var currHours = parseInt(currShowTimeSeconds/3600);
	var currMinutes = parseInt(currShowTimeSeconds%(60*60)/60);
	var currSeconds = parseInt(currShowTimeSeconds%60);
	
	if(nextSeconds != currSeconds){
		if(parseInt(nextHours/10) != parseInt(currHours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nextHours/10));
		}
		if(parseInt(nextHours%10) != parseInt(currHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nextHours%10));
		}
		if(parseInt(nextMinutes/10) != parseInt(currMinutes/10)){
			addBalls(MARGIN_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
		}
		if(parseInt(nextMinutes%10) != parseInt(currMinutes%10)){
			addBalls(MARGIN_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes%10));
		}
		if(parseInt(nextSeconds/10) != parseInt(currSeconds/10)){
			addBalls(MARGIN_LEFT+80*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
		}if(parseInt(nextSeconds%10) != parseInt(currSeconds%10)){
			addBalls(MARGIN_LEFT+95*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
		}
		currShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
	
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		
		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
	var cnt = 0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length>cnt){
		balls.pop();
	}

	
	 
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+RADIUS+1,
					y:y+i*2*(RADIUS+1)+RADIUS+1,
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);

			}
		}
	}
	
}
//画出时间
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt(currShowTimeSeconds/3600);
	var minutes = parseInt(currShowTimeSeconds%(60*60)/60);
	var seconds = parseInt(currShowTimeSeconds%60);
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+70*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+80*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+95*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	
	for(var i=0;i<balls.length;i++){
		cxt.beginPath();
		cxt.fillStyle = balls[i].color;
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}
}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+RADIUS+1,y+i*2*(RADIUS+1)+RADIUS+1,RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
