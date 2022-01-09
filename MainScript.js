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

let points = [];

let gridOn = true;
let menu;

let rotations = 16;

class ColorMode{
    constructor(color,thick){
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.toggle = color.toggle;
        this.thick = thick;
    }
}

function setup(){
    createCanvas(width,height);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
      }

     menu = new Menu();
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

function SetLine(_p1,_p2,_stroke){
    return {name:"line",p1:_p1,p2:_p2,stroke:_stroke};
}

function SetCircle(_p1,_d,_stroke,_fill){
    return {name:"circle",p1:_p1,d:_d*2,stroke:_stroke,fill:_fill};
}

function SetPoly(_points,_stroke,_fill){
    return {name:"poly",points:_points,stroke:_stroke,fill:_fill};
}

function SetRect(_p1,_p2,_stroke,_fill,_radius = 0){
    return {name:"rect",p1:_p1,p2:_p2,stroke:_stroke,fill:_fill,radius : _radius};
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
            if(mode == "poly"){
                points = [];
                points.push(p1);
            }
            state = DrawingState.CONT;
        } else if(state == DrawingState.CONT){
            let stroke = new ColorMode(menu.stroke,menu.thick.slider.value());
            let fill = new ColorMode(menu.fill,0);
            let d = 0;

            p2 = createVector(Smouse.x,Smouse.y);
            switch(mode){
                
                case "line":
                    shapes.push(SetLine(p1,p2,stroke));
                break;
                case "rect":
                    p2 = createVector(Smouse.x,Smouse.y);
                    shapes.push(SetRect(p1,p2,stroke,fill,menu.radius.slider.value()));
                    state = DrawingState.OFF;
                break;
                case "circle":
                    p2 = createVector(Smouse.x,Smouse.y);
                    d = max(dist(p1.x, p1.y, p2.x, p2.y),5);
                    shapes.push(SetCircle(p1,d,stroke,fill));
                    state = DrawingState.OFF;
                break;
                case "poly":
                    p2 = createVector(Smouse.x,Smouse.y);
                    d = dist(points[0].x, points[0].y, p2.x, p2.y);
                    console.log(d);

                    points.push(p2);
                    if(d<1){
                        shapes.push(SetPoly(points,stroke,fill));
                        state = DrawingState.OFF;
                    }
                break;
            }

            p1 = createVector(Smouse.x,Smouse.y);
            
        }
      }
      if (mouseButton === RIGHT) {
        state = DrawingState.OFF;
      }

      return false;
  }

  function drawShapes(){
      shapes.forEach(s=>{

      rotations = menu.rotation.slider.value();
    if(s.name == "circle" && s.p1.x == 0 && s.p1.y == 0){
        rotations = 1;
    }
    
    for(let i = 0; i<rotations; i++){
        let angle = (PI * 2  / rotations);
        rotate(angle);
        if(s.name == "line"){
            stroke(s.stroke.r,s.stroke.g,s.stroke.b);
            strokeWeight(s.stroke.thick);
            line(s.p1.x,s.p1.y,s.p2.x,s.p2.y);
        }

        if(s.name == "rect"){
            if(s.stroke.toggle){
                strokeWeight(s.stroke.thick);
                stroke(s.stroke.r,s.stroke.g,s.stroke.b);
            } else {
                noStroke();
            }

            if(s.fill.toggle){
                fill(s.fill.r,s.fill.g,s.fill.b);
            } else {
                noFill();
            }

            let w = abs(s.p2.x - s.p1.x);
            let h = abs(s.p2.y - s.p1.y);

            let x = min(s.p2.x,s.p1.x);
            let y = min(s.p2.y,s.p1.y);

            rect(x,y,w,h,s.radius);

        }

        if(s.name == "circle"){

            if(s.stroke.toggle){
                strokeWeight(s.stroke.thick);
                stroke(s.stroke.r,s.stroke.g,s.stroke.b);
            } else {
                noStroke();
            }

            if(s.fill.toggle){
                fill(s.fill.r,s.fill.g,s.fill.b);
            } else {
                noFill();
            }

            circle(s.p1.x,s.p1.y,s.d);
        }

        if(s.name == "poly"){

            if(s.stroke.toggle){
                strokeWeight(s.stroke.thick);
                stroke(s.stroke.r,s.stroke.g,s.stroke.b);
            } else {
                noStroke();
            }

            if(s.fill.toggle){
                fill(s.fill.r,s.fill.g,s.fill.b);
            } else {
                noFill();
            }

            beginShape();
            s.points.forEach(e => {
                vertex(e.x,e.y);
            });
            vertex(s.points[0].x,s.points[0].y);
            endShape();
        }
      }
      });
  }

function drawCurrentShape(){

    rotations = menu.rotation.slider.value();
    if(p1 != undefined && mode == "circle" && p1.x == 0 && p1.y == 0){
        rotations = 1;
    }

    for(let i = 0; i<rotations; i++){
        let angle = (PI * 2  / rotations);
        rotate(angle);

    if(menu.stroke.toggle){
        strokeWeight(menu.thick.slider.value());
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
            case "rect":
                let radius = menu.radius.slider.value();
                
                let w = abs(Smouse.x - p1.x);
                let h = abs(Smouse.y - p1.y);

                let x = min(Smouse.x,p1.x);
                let y = min(Smouse.y,p1.y);

                rect(x,y,w,h,radius);
                break;
            case "circle":
                let d = dist(p1.x,p1.y,Smouse.x,Smouse.y)
                circle(p1.x,p1.y,d*2);
                break;
            case "poly":
                let v1;
                let count = 0;

                strokeWeight(1);
                stroke(100,100,100);
                drawingContext.setLineDash([5]);

                points.forEach(e=>{
                    if(count > 0){
                        line(v1.x,v1.y,e.x,e.y);
                        
                    }
                    v1 = e;
                    count++;
                });
                
                if(points.length > 0){
                    let vf = points[points.length - 1];
                    line(vf.x,vf.y,Smouse.x,Smouse.y);
                }
                drawingContext.setLineDash([]);
                break;
            default:
                break
        }
    }
}
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