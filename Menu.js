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
class Menu{
    constructor(){
        this.page = createElement("menu");
        this.page.position(820,-8);
        this.menuBox = createElement("menuBox");
        this.menuBox.parent(this.page);
        this.line = createButton("line");
        this.circle = createButton("circle");
        this.polygon = createButton("");

        this.button4 = createButton("");
        this.button5 = createButton("");
        this.button6 = createButton("");


        this.line.mousePressed(()=>ChangeState("line"));
        this.circle.mousePressed(()=>ChangeState("circle"));

        this.page.addClass("menu");
        this.menuBox.addClass("menubox");

        this.line.parent(this.menuBox);
        this.circle.parent(this.menuBox);
        this.polygon.parent(this.menuBox);

        this.button4.parent(this.menuBox);
        this.button5.parent(this.menuBox);
        this.button6.parent(this.menuBox);

        this.strokeBox = createP("Stroke");
        this.strokeBox.parent(this.page);
        this.strokeBox.position(10,95);
        this.strokeBox.style("color","white");

        this.stroke = new ColorBox(140,this.page);

        this.fillBox = createP("Fill");
        this.fillBox.parent(this.page);
        this.fillBox.position(10,220);
        this.fillBox.style("color","white");
        this.fill = new ColorBox(260,this.page);


        this.gridToggle = createCheckbox('Grid On', true);
        this.gridToggle.parent(this.page);
        
        this.gridToggle.style("color","white");
        this.gridToggle.style("position","absolute");
        this.gridToggle.style("bottom","4px");
        this.gridToggle.style("left","4px");
        
        this.gridToggle.changed(()=>{
            gridOn = this.gridToggle.checked();
        });

        this.thick = createSlider(1,10,0);
        this.thick.parent(this.page);
        this.thick.position(10,210);
        this.thick.size(110,2);
        this.thickBox = createP("00");
        this.thickBox.parent(this.page);
        this.thickBox.position(140,188);
        this.thickBox.style("color","white");

        this.exportJS = createButton("Export JS");
        this.exportJS.parent(this.page);
        this.exportJS.position(10,330);
        this.exportJS.mousePressed(Export);

        this.input = createInput("example");
        this.input.parent(this.page);
        this.input.position(80,330);
        this.input.size(100,23);        
    }

    Draw(){
        this.stroke.Draw();
        this.fill.Draw();
        this.thickBox.html(this.thick.value());
    }
}

function ChangeState(_mode){
    state = DrawingState.OFF;
    mode = _mode;
    console.log("mode changed to "+ mode);
}