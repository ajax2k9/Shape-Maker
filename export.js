function Export(){
    nameStr = menu.input.value();
    const writer = createWriter(nameStr +'.js');
    
    writer.print("class "+nameStr+"{");
    writer.print("\t constructor(){");
    writer.print("\t\t this.x=0;");
    writer.print("\t\t this.y=0;");
    writer.print("\t\t this.angle=0;");
    writer.print("\t\t this.scale=1;");
    writer.print("\t }");
    writer.print("\tDraw(){");
    writer.print("\t\t push();");
    writer.print("\t\t translate(this.x,this.y);");
    writer.print("\t\t rotate(this.angle * PI / 180);");
    writer.print("\t\t scale(this.scale);");
    
    shapes.forEach(s=>{
        if(s[0] == "line"){
            writer.print("\t\t stroke("+s[5].r+","+s[5].g+","+s[5].b+");");
            writer.print("\t\t strokeWeight("+s[6]+");");
            writer.print("\t\t line("+s[1]+","+s[2]+","+s[3]+","+s[4]+");");
        }

        if(s[0] == "circle"){

            if(s[4].t){
                writer.print("\t\t strokeWeight("+s[6]+");");
                writer.print("\t\t stroke("+s[4].r+","+s[4].g+","+s[4].b+");");
            } else {
                writer.print("\t\t noStroke();");
            }

            if(s[5].t){
                writer.print("\t\t fill("+s[5].r+","+s[5].g+","+s[5].b+");");
            } else {
                writer.print("\t\t noFill();");
            }

            writer.print("\t\t circle("+s[1]+","+s[2]+","+s[3]+");");
        }
    })

    writer.print("\t\t pop();");
    writer.print("\t }");
    writer.print("}");


    writer.close();
    writer.clear();
  }
