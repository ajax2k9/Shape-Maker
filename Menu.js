class ColorBox{
    constructor(_y,_parent){
        this.r = 0;
        this.g = 0;
        this.b = 0;

        this.red = createSlider(0,255,255);
        this.red.parent(_parent);
        this.red.addClass("red");
        this.red.position(10,_y);
        
        this.green = createSlider(0,255,0);
        this.green.parent(_parent);
        this.green.addClass("green");
        this.green.position(10,_y + 20);

        this.blue = createSlider(0,255,0);
        this.blue.parent(_parent);
        this.blue.addClass("blue");
        this.blue.position(10,_y+40);

        this.box = createElement("colorbox");
        this.box.size(40,40);
        this.box.parent(_parent);
        this.box.position(140,_y);

        this.xIcon = createImg("x.png","x");
        this.xIcon.parent(this.box);
        this.xIcon.position(8,8);
        this.xIcon.size(24,24);
        this.xIcon.hide();
        this.toggle = true;

        this.box.mousePressed(()=>{
            this.toggle = !this.toggle;
            if(this.toggle){
                this.xIcon.hide();
            } else {
                this.xIcon.show();
            }
        });

    }

    Draw(){

        this.r = this.red.value();
        this.g = this.green.value();
        this.b = this.blue.value();

        this.box.style("background-color","rgb("+this.r+","+this.g+","+this.b+")");

    }
}

class Label{
    constructor(_name,_parent,_x,_y,_color){
        this.label = createP(_name);
        this.label.parent(_parent);
        this.label.position(_x,_y);
        this.label.style("color",_color);
    }
    Draw(value){
        this.label.html(value);
    }
}

class Slider{
    constructor(_name,_parent,_x,_y,_maxVal,_minVal = 0){
        this.label = new Label(_name,_parent,_x,_y);
        this.slider = createSlider(_minVal,_maxVal,_minVal);
        this.slider.parent(_parent);
        this.slider.position(_x,_y + 45);
        this.slider.size(110,2);

        this.sliderBox = createP("00");
        this.sliderBox.parent(_parent);
        this.sliderBox.position(_x +120,_y+23);
        this.sliderBox.style("color","white");
    }

    Draw(){
        this.sliderBox.html(this.slider.value());
    }
}

class Menu{
    constructor(){
        this.page = createElement("menu");
        this.page.position(820,-8);
        this.menuBox = createElement("menuBox");
        this.menuBox.parent(this.page);
        this.line = createButton("line");
        this.circle = createButton("circle");
        this.polygon = createButton("polygon");

        this.rect = createButton("rect");
        this.button5 = createButton("");
        this.button6 = createButton("");


        this.line.mousePressed(()=>ChangeState("line"));
        this.rect.mousePressed(()=>ChangeState("rect"));
        this.circle.mousePressed(()=>ChangeState("circle"));
        this.polygon.mousePressed(()=>ChangeState("poly"));

        this.page.addClass("menu");
        this.menuBox.addClass("menubox");

        this.line.parent(this.menuBox);
        this.circle.parent(this.menuBox);
        this.polygon.parent(this.menuBox);

        this.rect.parent(this.menuBox);
        this.button5.parent(this.menuBox);
        this.button6.parent(this.menuBox);

        this.strokeBox = new Label("Stroke",this.page,10,95,"white");

        this.stroke = new ColorBox(140,this.page);

        this.fillBox = new Label("Fill",this.page,10,240,"white");

        this.fill = new ColorBox(280,this.page);


        this.gridToggle = createCheckbox('Grid On', true);
        this.gridToggle.parent(this.page);
        
        this.gridToggle.style("color","white");
        this.gridToggle.style("position","absolute");
        this.gridToggle.style("bottom","4px");
        this.gridToggle.style("left","4px");
        
        this.gridToggle.changed(()=>{
            gridOn = this.gridToggle.checked();
        });

        this.thick = new Slider("thickness",this.page,10,190,10,1);
        
        this.exportJS = createButton("Export JS");
        this.exportJS.parent(this.page);
        this.exportJS.position(10,350);
        this.exportJS.mousePressed(Export);

        this.exportImg = createButton("Export PNG");
        this.exportImg.parent(this.page);
        this.exportImg.position(10,380);
        this.exportImg.mousePressed(SavePicture);

        this.input = createInput("example");
        this.input.parent(this.page);
        this.input.position(80,350);
        this.input.size(100,23); 
        
        this.rotation = new Slider("Repeat",this.page,10,400,32,1);
        this.radius = new Slider("Radius",this.page,10,450,32,1);
    }

    Draw(){
        this.stroke.Draw();
        this.fill.Draw();
        this.thick.Draw();
        this.rotation.Draw();
        this.radius.Draw();
    }
}

function ChangeState(_mode){
    state = DrawingState.OFF;
    mode = _mode;
    console.log("mode changed to "+ mode);
}

function SavePicture(){
    saveCanvas(menu.input.value(), 'png');
}