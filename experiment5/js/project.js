/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
    { 
      name: "Masked Dancers: Concern in So Many Things You Forget Where You Are", 
      assetUrl: "https://cdn.glitch.global/e91c9f8b-0247-45d7-ba73-e849b7ea41ff/bla.jpg?v=1715037062845",
      credit: "Andrew Ryan, 2009"
    },
    { 
      name: "Moonworld Playground", 
      assetUrl: "https://cdn.glitch.global/e91c9f8b-0247-45d7-ba73-e849b7ea41ff/cat.png?v=1715131578287",
      credit: "Ayane Sato, 2022"
    },
    { 
      name: "the first glass beach album", 
      assetUrl: "https://cdn.glitch.global/e91c9f8b-0247-45d7-ba73-e849b7ea41ff/gb.png?v=1715112603074",
      credit: "Daxe Schaeffer, 2019"
    },
  ];
}

function initDesign(inspiration) {
  resizeCanvas(inspiration.image.width / 4, inspiration.image.height / 4);
  
  let design = {
    bg: 0,
    fg: []
  }
  let numToRender = 100;
  let maxSize = 50;
  
  //let imgToRender = loadImage(inspiration.assetUrl);
  switch(inspiration.name)
  { //----------- BRAVE LITTLE ABACUS 1 //-----------
  case "Masked Dancers: Concern in So Many Things You Forget Where You Are":
    numToRender = 1200;
      
    maxSize = (width / 1.5) * (100 / numToRender);
  
    for(let i = 0; i < numToRender; i++) {
      let xToPush = random(width);
      let yToPush = random(height);
      let wSizeToPush = random(maxSize / 4, maxSize);
      let hSizeToPush = random(maxSize / 4, maxSize);
      let fillToPush = (inspiration.image).get(xToPush * 4, yToPush * 4);
      fillToPush[3] = 175;

      //print(`Color at pixel ${xToPush}, ${yToPush}:` + c);

      design.fg.push({x: xToPush,
                      y: yToPush,
                      w: wSizeToPush,
                      h: hSizeToPush,
                      fill: fillToPush})
    }
    break;
  case "Moonworld Playground": //----------- CAT //-----------
    numToRender = 1000;
      
    maxSize = (width / 2) * (100 / numToRender);
  
    for(let i = 0; i < numToRender; i++) {
      let xToPush = random(width);
      let yToPush = random(height);
      let wSizeToPush = random(maxSize / 4, maxSize);
      let hSizeToPush = random(maxSize / 4, maxSize);
      let fillToPush = (inspiration.image).get(xToPush * 4, yToPush * 4);
      fillToPush[3] = 125;

      //print(`Color at pixel ${xToPush}, ${yToPush}:` + c);

      design.fg.push({x: xToPush,
                      y: yToPush,
                      w: wSizeToPush,
                      h: hSizeToPush,
                      fill: fillToPush})
    }
    break;
  case "the first glass beach album": //----------- GLASS BEACH //-----------
    numToRender = 1600;
      
    maxSize = (width / 1.5) * (100 / numToRender);
  
    for(let i = 0; i < numToRender; i++) {
      let xToPush = random(width);
      let yToPush = random(height);
      let wSizeToPush = random(maxSize / 4, maxSize);
      let hSizeToPush = random(maxSize / 4, maxSize);
      let fillToPush = (inspiration.image).get(xToPush * 4, yToPush * 4);
      fillToPush[3] = 125;

      design.fg.push({x: xToPush,
                      y: yToPush,
                      w: wSizeToPush,
                      h: wSizeToPush
                      ,
                      fill: fillToPush})
    }
    break;
  default:
    break;  
  }
  

  return design;
}

function renderDesign(design, inspiration) {
  
  background(design.bg);
  noStroke();
  
  let i = 0;
  for(let box of design.fg) {
    fill(box.fill, 128);
    if(i % 2 == 0)
    {
      switch(inspiration.name)
      { //----------- BRAVE LITTLE ABACUS 1 //-----------
      case "Masked Dancers: Concern in So Many Things You Forget Where You Are":
        rect(box.x, box.y, box.w, box.h);
        break;
      case "Moonworld Playground": //----------- CAT //-----------
        triangle(box.x, box.y, box.x + box.w, box.y, box.x + (box.w / 2), box.y + box.h);
        break;
      case "the first glass beach album": //----------- GLASS BEACH //-----------
        ellipse(box.x, box.y, box.w, box.h);
        break;
      default:
        break;
      }
      
    }
    else
    {
      rect(box.x, box.y, box.w, box.h);
    }
    i++;
  }
  
}

function mutateDesign(design, inspiration, rate) {
  let colorOffset = 20;
  let sizeOffset = 75;
  //design.bg = mut(design.bg, 0, 255, rate);
  for(let box of design.fg) {
    let r = box.fill[0];
    let g = box.fill[1];
    let b = box.fill[2];
    
    let rMut = mut(r, r - colorOffset, r + colorOffset, rate);
    let gMut = mut(g, g - colorOffset, g + colorOffset, rate);
    let bMut = mut(b, b - colorOffset, b + colorOffset, rate);
    
    box.fill[0] = rMut;
    box.fill[1] = gMut;
    box.fill[2] = bMut;
    
    box.x =  mut(box.x, box.x, box.x + width, rate);
    if(box.x > width)
    {
      box.x -= width;
    }
    
    box.y =  mut(box.y, box.y, box.y + height, rate);
    if(box.y > height)
    {
      box.y -= height;
    }
  
    box.w = mut(box.w, box.w, box.w + sizeOffset, rate);
    box.h = mut(box.h, box.h - sizeOffset, box.h, rate);
    box.h = mut(box.h, 0, height/2, rate);
  }
}


function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}
