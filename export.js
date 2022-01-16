function Export(){
    let points = [];
    nameStr = menu.input.value();
    const writer = createWriter(nameStr +'.js');
    
    writer.print("class "+nameStr+"{");
    writer.print("\t constructor(){");
    writer.print("\t\t this.x=0;");
    writer.print("\t\t this.y=0;");
    writer.print("\t\t this.angle=0;");
    writer.print("\t\t this.scale=1;");
    writer.print("\t }");
    writer.print("\t Draw(){");
    writer.print("\t\t push();");
    writer.print("\t\t translate(this.x,this.y);");
    writer.print("\t\t rotate(this.angle * PI / 180);");
    writer.print("\t\t scale(this.scale);");
    
    shapes.forEach(s=>{
        if(s.name == "line"){
            writer.print("\t\t stroke("+s.stroke.r+","+s.stroke.g+","+s.stroke.b+");");
            writer.print("\t\t strokeWeight("+s.stroke.thick+");");
            writer.print("\t\t line("+s.p1.x+","+s.p1.y+","+s.p2.x+","+s.p2.y+");");
            points.push({x:s.p1.x,y:s.p1.y});
            points.push({x:s.p2.x,y:s.p2.y});
        }

        if(s.name == "circle"){

            if(s.stroke.toggle){
                writer.print("\t\t strokeWeight("+s.stroke.thick+");");
                writer.print("\t\t stroke("+s.stroke.r+","+s.stroke.g+","+s.stroke.b+");");
            } else {
                writer.print("\t\t noStroke();");
            }

            if(s.fill.toggle){
                writer.print("\t\t fill("+s.fill.r+","+s.fill.g+","+s.fill.b+");");
            } else {
                writer.print("\t\t noFill();");
            }

            writer.print("\t\t circle("+s.p1.x+","+s.p1.y+","+s.d+");");
        }

        if(s.name == "rect"){

            if(s.stroke.toggle){
                writer.print("\t\t strokeWeight("+s.stroke.thick+");");
                writer.print("\t\t stroke("+s.stroke.r+","+s.stroke.g+","+s.stroke.b+");");
            } else {
                writer.print("\t\t noStroke();");
            }

            if(s.fill.toggle){
                writer.print("\t\t fill("+s.fill.r+","+s.fill.g+","+s.fill.b+");");
            } else {
                writer.print("\t\t noFill();");
            }

            let w = abs(s.p2.x - s.p1.x);
            let h = abs(s.p2.y - s.p1.y);

            let x = min(s.p2.x,s.p1.x);
            let y = min(s.p2.y,s.p1.y);

            rect(x,y,w,h,s.radius);

            writer.print("\t\t rect("+x+","+y+","+w+","+h+","+s.radius+");");

            points.push({x:s.p1.x,y:s.p1.y});
            points.push({x:s.p2.x,y:s.p2.y});
            points.push({x:s.p1.x,y:s.p2.y});
            points.push({x:s.p2.x,y:s.p1.y});
        }

        if(s.name == "poly"){

            if(s.stroke.toggle){
                writer.print("\t\t strokeWeight("+s.stroke.thick+");");
                writer.print("\t\t stroke("+s.stroke.r+","+s.stroke.g+","+s.stroke.b+");");
            } else {
                writer.print("\t\t noStroke();");
            }

            if(s.fill.toggle){
                writer.print("\t\t fill("+s.fill.r+","+s.fill.g+","+s.fill.b+");");
            } else {
                writer.print("\t\t noFill();");
            }

            writer.print("\t\t beginShape();");
            s.points.forEach(e => {
                writer.print("\t\t vertex("+e.x+","+e.y+");");
                points.push({x:e.x,y:e.y});
            });
            writer.print("\t\t endShape();");
        }
    });

    writer.print("\t\t pop();");
    writer.print("\t }");

    writer.print("\t GetPoints(){");
    writer.print("\t\t if(this.points == undefined){");
    writer.print("\t\t\t this.points =[]; ");
    
    points.forEach(p=>{
        writer.print("\t\t\t this.points.push("+p.x+","+p.y+");");
    });
    writer.print("\t\t }");
    writer.print("\t\t return this.points; ");
    
    writer.print("\t }");

    writer.print("}");


    writer.close();
    writer.clear();
  }
