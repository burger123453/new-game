

function program() {
    
    title("game");
    size(600, 600);
    
    // All code goes here
	//go to "the forest explorer"
	//thats where i used a lot of my code
	//https://www.khanacademy.org/computer-programming/the-forest-explorer/5605448944762880
	//also inspired by oneshot (except not really)
	//jshint ignore: start
	let scene="main-menu";
	let keys=[];
	keyPressed=function() {
	    keys[keyCode]=true;};
	keyReleased=function() {
	    keys[keyCode]=false;};
	let sprites={
	    p1pix:[
	        "bbbbb",
	        "bbbbb",
	        "bbbbb",
	        "bbbbb",
	        "bbbbb",
	    ],
	};
	let p1={
	    x:278,
	    y:88,
	    w:25,
	    h:25,
	    speed:2,
	    shoes:"off",
	    colors:{
	        b:color(0, 0, 0),
	    },
	    display:function() {
	        if(scene!="die-game") {
	            fill(255, 0, 0);
	            rect(this.x,this.y,this.w,this.h);
	            for(var i=0;i<sprites.p1pix.length;i++) {
	                for(var j=0;j<sprites.p1pix[i].length;j++) {
	                    fill(this.colors[sprites.p1pix[i][j]]);
	                    noStroke();
	                    rect(this.x+(j*5),this.y+(i*5),6,6);
	                }
	            }
	        }
	        if(this.shoes=="on") {
	            this.speed=5;
	        } else {
	            this.speed=2;}
	    },
	    move:function() {
	        if(scene!="die-game") {
	            if(keys[UP]) {
	                this.y-=this.speed;}
	            if(keys[DOWN]) {
	                this.y+=this.speed;}
	            if(keys[LEFT]) {
	                this.x-=this.speed;}
	            if(keys[RIGHT]) {
	                this.x+=this.speed;}
	        }
	    },
	};
	let iws=[];
	function iW(x,y,w,h,side)/*invisble wall*/ {
	    this.x=x;
	    this.y=y;
	    this.w=w;
	    this.h=h;
	    this.side=side;
	    //temporary showing walls
	    this.display=function() {
	        stroke(0, 0, 0);
	        fill(255, 255, 255);
	        rect(this.x,this.y,this.w,this.h);
	        noStroke();
	    };
	    this.bloc=function() {
	        if(collide(this,p1)) {
	            if(this.side=="UP") {
	                p1.y=this.y-p1.h;}
	            else if(this.side=="DOWN") {
	                p1.y=this.y+this.h;}
	            else if(this.side=="LEFT") {
	                p1.x=this.x-p1.w;}
	            else if(this.side=="RIGHT") {
	                p1.x=this.x+this.w;}
	        }
	    };
	}
	//object that makes you go to the next scene
	let SceNes=[];
	function nextScene(x,y,side) {
	    this.x=x;
	    this.y=y;
	    this.w=25;
	    this.h=25;
	    this.side=side;
	    this.display=function() {
	        fill(255, 255, 255);
	        //noStroke();
	        //stroke for now because no backround
	        stroke(0, 0, 0);
	        rect(this.x,this.y,this.w,this.h);
	    };
	    this.collidep1=function() {
	        if(p1.collide(this)) {
	            spliceman();
	            //scene="something" or scene++; or something like that
	            //side makes so when next scene loads it puts the player in a specific place
	            if(this.side=="up") {
	                
	            }
	            else if(this.side=="down") {
	                
	            }
	            else if(this.side=="left") {
	                
	            }
	            else /*probably gonna be "right" direction (doesn't necessarily mean correct)*/{
	                
	            }
	        }
	    }
	}
	function bg() {
	    if(scene=="main-menu") {
	        background(255, 255, 255);}
	    if(scene=="die-game") {
	        background(0, 0, 0);
	        noLoop();}
	    if(scene=="map1") {
	        background(255, 255, 255);}
	}
	let playobj;
	let dontplayobject;
	let onetime=true;
	let aaa=true;
	function showScene() {
	    if(scene=="main-menu") {
	        playobj={
	            x:200,
	            y:200,
	            w:46,
	            h:30,};
	        dontplayobj={
	            x:327,
	            y:200,
	            w:46,
	            h:30,};
	        //play
	        stroke(0, 0, 0);
	        fill(255, 255, 255);
	        rect(200,200,46,30);
	        fill(0, 0, 0);
	        //textSize(12);
	        textSize(22);
	        text("play",204,221);
	        
	        //don't play
	        stroke(0, 0, 0);
	        fill(255, 255, 255);
	        rect(327,200,46,30);
	        fill(0, 0, 0);
	        //textSize(12);
	        textSize(12);
	        text("don't\nplay",337,210);
	        if(onetime) {
	            iws.push(new iW(114,88,25,203,"RIGHT"));
	            iws.push(new iW(139,63,297,25,"DOWN"));
	            iws.push(new iW(436,88,25,202,"LEFT"));
	            iws.push(new iW(139,291,296,25,"UP"));
	            onetime=false;
	        }
	        if(collide(playobj,p1)) {
	            scene="map1";}
	        if(collide(dontplayobj,p1)) {
	            scene="die-game";}
	    }
	    if(scene=="die-game") {
	        textSize(40);
	        fill(255, 0, 0);
	        text("YOU DIED",248,67);
	    }
	    if(scene=="map1") {
	        if(aaa) {
	            p1.x=0;
	            p1.y=0;
	            spliceman();
	            aaa=false;}
	    }
	}
	function collide(o1,o2) {
	    return(o1.x<o2.x+o2.w&&
	    o1.x+o1.w>o2.x&&
	    o1.y<o2.y+o2.h&&
	    o1.y+o1.h>o2.y);}
	function spliceman() {
	    for(var i=iws.length-1;i>=0;i--) {
	        iws.splice(i);}
	    for(var i=SceNes.length-1;i>=0;i--) {
	        SceNes.splice(i);}
	}
	cursor('none');
	function cam() {
	    translate(round(-(p1.x - width/2.05)), 0);
	    translate(0, round(-(p1.y - height/2)));
	}
	function game() {
	    textSize(12);
	    cam();
	    ellipseMode(CORNER);
	    noStroke();
	    bg();
	    showScene();
	    p1.display();
	    if(scene!="die-game") {
	    
	    
	    if(true) {
	        p1.move();
	    }
	    for(var i=iws.length-1;i>=0;i--) {
	        var a=iws[i];
	        a.display();
	        a.bloc();
	        
	    }
	    for(var i=SceNes.length-1;i>=0;i--) {
	        var a=SceNes[i];
	        a.display();
	        a.collidep1();}
	    var a = undefined;
	    
	    }
	}
	spliceman();
	draw = function() {
	    game();//lol
	}
}

runPJS(program);

// Add reload button on KA --> <script>
