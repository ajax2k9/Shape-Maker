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
let deleteMode = false;
let gridOn = true;
let menu;

let rotations = 16;
let recording = false;
let recorder;
let chunks = [];

const fr = 30;
var canvas;
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
    let p5canvas = createCanvas(width,height);
    canvas = p5canvas.canvas; 

    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
      }

     menu = new Menu();
     record();
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
        if(deleteMode){
            DeleteShape();
        }else if(state == DrawingState.OFF){
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




function record() {
  chunks.length = 0;
  
  let stream = document.querySelector('canvas').captureStream(fr);
  
  recorder = new MediaRecorder(stream);
  
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  
  recorder.onstop = exportVideo;
  
}

function keyPressed() {
    
    // toggle recording true or false
    recording = !recording
    console.log(recording);
    
    // 82 is keyCode for r 
    // if recording now true, start recording 
    if (keyCode === 82 && recording ) {
      
      console.log("recording started!");
      recorder.start();
    } 
    
    // if we are recording, stop recording 
    if (keyCode === 82 && !recording) {  
      console.log("recording stopped!");
      recorder.stop();
    }
    
  }
  

function exportVideo(e) {
  var blob = new Blob(chunks, { 'type' : 'video/webm' });

    // Draw video to screen
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", Date.now());
    videoElement.controls = true;
    document.body.appendChild(videoElement);
    videoElement.src = window.URL.createObjectURL(blob);
  
  // Download the video 
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'newVid.webm';
  a.click();
  window.URL.revokeObjectURL(url);

}


function OnLine(_p1,_p2,_s){
    if(_p1.dist(_s)<2) return true;
    if(_p2.dist(_s)<2) return true;

    if(_s.x < min(_p1.x,_p2.x)) return false;
    if(_s.x > max(_p1.x,_p2.x)) return false;

    if(_s.y < min(_p1.y,_p2.y)) return false;
    if(_s.y > max(_p1.y,_p2.y)) return false;

    let v1 = createVector(_p2.x -_p1.x,_p2.y - _p1.y);
    let v2 = createVector(_p2.x -_s.x,_p2.y - _s.y);
    
    let ang = abs(v1.angleBetween(v2));
    console.log(ang);

    return ang < 0.05;

}


function DeleteShape(){
    let index = -1;

    for(let i = 0; i<shapes.length; i++){
        if(shapes[i].name=="circle"){
            let d = dist(shapes[i].p1.x,shapes[i].p1.y,Smouse.x,Smouse.y)
            if(shapes[i].fill.toggle){
                if(d < shapes[i].d/2){
                    index = i;
                    break;
                }
            }else{
                if(abs(d *2 - shapes[i].d)<2){
                    index = i;
                    break;
                }
            }
        }

        if(shapes[i].name=="line"){
            let s = shapes[i];
            if(OnLine(s.p1,s.p2,Smouse)){
                index = i;
                break;
            }
        }

        if(shapes[i].name=="rect"){
            let d =[];
            let s = shapes[i];
            if(s.fill.toggle){
                let found = Smouse.x >= s.p1.x && Smouse.x <= s.p2.x;
                    found = found && Smouse.y >= s.p1.y && Smouse.y <= s.p2.y;

                if(found){
                    index = i;
                    break;
                }

            }else{
                let v1 = createVector(s.p1.x,s.p1.y);
                let v2 = createVector(s.p1.x,s.p2.y);
                let v3 = createVector(s.p2.x,s.p2.y);
                let v4 = createVector(s.p2.x,s.p1.y);
                
                if(OnLine(v1,v2,Smouse)){index = i; break}
                if(OnLine(v2,v3,Smouse)){index = i; break}
                if(OnLine(v3,v4,Smouse)){index = i; break}
                if(OnLine(v4,v1,Smouse)){index = i; break}
            }
        }

        if(shapes[i].name=="poly"){
            let s = shapes[i];
            let found = false;
            s.points.forEach(  e=>{
            let d = dist(e.x,e.y,Smouse.x,Smouse.y);
                if (d<2){
                    found = true;
                }
            });

            if(found){
                index = i;
                break;
            }
        }
    }

    if(index != -1){
        shapes.splice(index,1);
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


function EncodeLine(_l){
    let obj = {};

    obj.name = "line";
    obj.p1x = _l.p1.x;
    obj.p1y = _l.p1.y;
    obj.p2x = _l.p2.x;
    obj.p2y = _l.p2.y;
    obj.s = _l.stroke;

    return obj;
}

function DecodeLine(_l){
    return SetLine(createVector(_l.p1x,_l.p1y),createVector(_l.p2x,_l.p2y),_l.s);
}

function EncodeCircle(_l){

    let obj = {};

    obj.name = "circle";
    obj.p1x = _l.p1.x;
    obj.p1y = _l.p1.y;
    obj.d = _l.d/2;
    obj.s = _l.stroke;
    obj.f = _l.fill;

    return obj;
}

function DecodeCircle(_l){
    return SetCircle(createVector(_l.p1x,_l.p1y),_l.d,_l.s,_l.f)
}

function EncodePoly(_l){
    let obj = {};

    obj.name = "poly";
    obj.points = [];
    _l.points.forEach(p=>{
        obj.points.push({x:p.x,y:p.y});
    });

    obj.s = _l.stroke;
    obj.f = _l.fill;
    return obj;
}
function DecodePoly(_l){
    let p = [];
    _l.points.forEach(e=>{
        p.push(createVector(e.x,e.y));
    });

    return SetPoly(p,_l.s,_l.f);
}



function EncodeRect(_l){
    let obj = {};

    obj.name = "rect";
    obj.p1x = _l.p1.x;
    obj.p1y = _l.p1.y;
    obj.p2x = _l.p2.x;
    obj.p2y = _l.p2.y;
    obj.s = _l.stroke;
    obj.f = _l.fill;
    obj.r = _l.radius;


    return obj;
}

function DecodeRect(_l){
    return SetRect(createVector(_l.p1x,_l.p1y),createVector(_l.p2x,_l.p2y),_l.s,_l.f,_l.r)
}

function saveData(){
    let conv = [];    
    shapes.forEach(s=>{
        if(s.name =="line"){
            conv.push(EncodeLine(s));
        }        
        if(s.name =="circle"){
            conv.push(EncodeCircle(s));
        }
        if(s.name =="rect"){
            conv.push(EncodeRect(s));
        }
        if(s.name =="poly"){
            conv.push(EncodePoly(s));
        }
    });


localStorage.setItem("shapes_file",JSON.stringify(conv));
}

function LoadData(){
    let conv = [];
    shapes = [];
   conv = JSON.parse(localStorage.getItem("shapes_file"));
   conv.forEach(c=>{

    if(c.name == "line"){
        shapes.push(DecodeLine(c));
    }
    if(c.name == "circle"){
        shapes.push(DecodeCircle(c));
    }
    if(c.name == "rect"){
        shapes.push(DecodeRect(c));
    }
    if(c.name == "poly"){
        shapes.push(DecodePoly(c));
    }
   });
}