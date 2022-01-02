let width = 800;
let height = 800;
let spacing  = 30;
let offsX = width / 2;
let offsY = height / 2;
let state = 0;
let p1,p2;
let Smouse;
let mode = "line";
let shapes =[];
let nameStr = "";
let DrawingState = {
    OFF:0,
    ON:1,
    CONT:2
}

let gridOn = true;
let menu;
let test;

function setup(){
    createCanvas(width,height);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
      }

     menu = new Menu();
     test = new Test();
}

function drawGrid(_spacing){
    let linesX = width / _spacing;
    let linesY = height / _spacing;
    stroke(50,50,50);
    strokeWeight(1);
    for(let i = 0; i <= linesX; i++){
        let x = i*_spacing; 
        line(x ,-offsY,x,height);
        line(-x ,-offsY,-x,height);
    }

    for(let j = 0; j <= linesY; j++){
        let y = j*_spacing; 
        line(-offsX,y, width,y);
        line(-offsX,-y, width,-y);
    }

}

function drawAxes(){
    stroke(100,200,100);
    strokeWeight(1);
    line(0,0,width,0);
    line(0,0,0,height);
    line(0,0,-width,0);
    line(0,0,0,-height);
    fill(100,100,200);
    circle(0,0,5);
    

}

function mousePressed() {
    if(mouseX < 0 || mouseX > width){
        return;
    }

    if(mouseY < 0 || mouseY > height){
        return;
    }


    if (mouseButton === LEFT) {
        if(state == DrawingState.OFF){
            p1 = createVector(Smouse.x,Smouse.y);
            state = DrawingState.CONT;
        } else if(state == DrawingState.CONT){
            let s = menu.stroke;
            let f = menu.fill;
            let t = menu.thick.value();
            switch(mode){
                
                case "line":
                    p2 = createVector(Smouse.x,Smouse.y);
                    shapes.push(["line",p1.x,p1.y,p2.x,p2.y,{r:s.r,g:s.g,b:s.b},t]);
                    p1 = createVector(Smouse.x,Smouse.y);
                break;
                case "circle":
                    p2 = createVector(Smouse.x,Smouse.y);
                    let d = dist(p1.x, p1.y, p2.x, p2.y);
                    shapes.push(["circle",p1.x,p1.y,d*2,{r:s.r,g:s.g,b:s.b,t:s.toggle},{r:f.r,g:f.g,b:f.b,t:f.toggle},t]);
                    state = DrawingState.OFF;
                break;
            }
            
        }
      }
      if (mouseButton === RIGHT) {
        state = DrawingState.OFF;
      }

      return false;
  }

  function drawShapes(){
      shapes.forEach(s=>{
          
        if(s[0] == "line"){
            stroke(s[5].r,s[5].g,s[5].b);
            strokeWeight(s[6]);
            line(s[1],s[2],s[3],s[4]);
        }

        if(s[0] == "circle"){

            if(s[4].t){
                strokeWeight(s[6]);
                stroke(s[4].r,s[4].g,s[4].b);
            } else {
                noStroke();
            }

            if(s[5].t){
                fill(s[5].r,s[5].g,s[5].b);
            } else {
                noFill();
            }

            circle(s[1],s[2],s[3]);
        }
      });
  }

function drawCurrentShape(){
    if(menu.stroke.toggle){
        strokeWeight(menu.thick.value());
        stroke(menu.stroke.r,menu.stroke.g,menu.stroke.b);
    } else {
        noStroke();
    }
    if(menu.fill.toggle){
        fill(menu.fill.r,menu.fill.g,menu.fill.b);
    } else {
        noFill();
    }
    
    
    if(state == DrawingState.CONT){
        switch(mode){
            case "line":
                line(p1.x,p1.y,Smouse.x,Smouse.y);
                break;
            case "circle":
                let d = dist(p1.x,p1.y,Smouse.x,Smouse.y)
                circle(p1.x,p1.y,d*2);
                break;
            default:
                break
        }
    }
}

function drawMouse(){
    
}

function draw(){
    background(0,0,0);
    
    if(keyIsDown(65)){///A (left)
        offsX-=1;
    } else if(keyIsDown(68)) {///D (right)
        offsX+=1;
    }

    if(keyIsDown(87)){///A (left)
        offsY-=1;
    } else if(keyIsDown(83)) {///D (right)
        offsY+=1;
    }
    
Smouse = createVector(mouseX,mouseY);
Smouse.x = Math.round((Smouse.x - offsX) / spacing) * spacing

Smouse.y = Math.round((Smouse.y - offsY) / spacing) * spacing;

noFill();
translate(offsX,offsY);

if(gridOn){
    drawGrid(spacing);
    drawAxes();
}

drawShapes();
drawCurrentShape();
circle(Smouse.x,Smouse.y,10);

menu.Draw();
}