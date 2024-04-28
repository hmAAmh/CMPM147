"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

let waterPuddleSize = 3;

function p3_preload() {}

function p3_setup() 
{
  
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = new p5.TypedDict();

function p3_tileClicked(i, j) {
  
  let iMin = i - waterPuddleSize;
  let iMax = i + waterPuddleSize;

  let jMin = j - waterPuddleSize;
  let jMax = j + waterPuddleSize;

  for(let iOffset = iMin; iOffset < iMax; iOffset++)
  {
    for(let jOffset = jMin; jOffset < jMax; jOffset++)
    {
      let iEqualMin = iOffset == iMin;
      let iEqualMax = (iOffset == iMax - 1);
      let jEqualMin = jOffset == jMin;
      let jEqualMax = (jOffset == jMax - 1);

      let iEqualOr = (iEqualMin || iEqualMax);
      let jEqualOr = (jEqualMin || jEqualMax);

      if(!(iEqualOr && jEqualOr))
      {
        if(!((iEqualOr || jEqualOr) && random() > .5))
        {
          let key = [iOffset, jOffset];
          if(!clicks.hasKey(key))
          {
            clicks.create(key, random(100, 150));
          }
        }
      }
    }
  }


}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  /*if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    //fill(240, 200);
  } 
  else {
    //fill(255, 200);
    fill(0, 0, 255, 255);
  }*/
  
  let noiseVal = noise((XXH.h32("tile:" + [i, j], worldSeed)));
  if(noiseVal >= .8)
  {
    if(!clicks.hasKey([i, j]))
    {
      clicks.create([i, j], 2);
    }
  }

  let rValue = (XXH.h32("tile:" + [i, j], worldSeed) % 40);
  let gValue = (XXH.h32("tile:" + [i, j], worldSeed) % 45);
  let bValue = (XXH.h32("tile:" + [i, j], worldSeed) % 35);
  
  let key = [i, j];
  let yOffset = 0;

  
  let drawRock = false;
  if (XXH.h32("tile:" + [i, j], worldSeed) % 13 == 0)
  {
    drawRock = true;
  }
  let drawTree = false;

  if(!clicks.hasKey(key)) //Grass
  {
    fill(120 + rValue, 180 + gValue, 80 + bValue);
    yOffset = 0 - (XXH.h32("tile:" + [i, j], worldSeed) % 10);
    if (XXH.h32("tile:" + [i, j], worldSeed) % 14 == 0)
    {
      drawTree = true;
    }


    translate(0, yOffset);
  }
  else if(clicks.get([i, j]) >= 100) //Water
  {
    let prevClick = clicks.get([i, j]);

    fill(120 + rValue, 180 + gValue, 80 + bValue);
    yOffset = 0 - (XXH.h32("tile:" + [i, j], worldSeed) % 10) - (prevClick / 8);
    translate(0, yOffset);

    clicks.set([i, j], prevClick - 1);
    if(clicks.get([i, j]) <= 100)
    {
      clicks.set([i, j], 1);
    }
  }
  else if(clicks.get([i, j]) == 1) //Water
  {
    fill(10 + (sin(millis() / 900) * 10), 40 + (sin(millis() / 600) * 40), 180 + gValue);
    yOffset = 5 - (sin((millis() + (XXH.h32("tile:" + [i, j], worldSeed) % 200)) / 1000) * 5)
    translate(0, yOffset);
  }
  else if(clicks.get([i, j]) == 2) //Stones
  {
    fill(90 + rValue, 90 + gValue, 90 + bValue);
    yOffset = -20 - (XXH.h32("tile:" + [i, j], worldSeed) % 10);
    translate(0, yOffset);
  }

  push();



  beginShape(); //Below Shape
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(tw, th + 50);
  vertex(0, th - yOffset + 10);
  vertex(-tw, th - yOffset);
  endShape(CLOSE);

  beginShape(); // Main Shape
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  if(drawRock) //Rocks
  {
    if(!clicks.hasKey(key))
    {
      fill(0, 0, 0, 30);
      ellipse((XXH.h32("tile:" + [i, j], worldSeed) % 34), 0, 10, 5);
      translate(0, -10);
    }
    else if(clicks.get([i, j]) == 1)
    {
      fill(120 + rValue, 180 + gValue, 80 + bValue);
      let xOffset = (sin(((millis() / 500) + (XXH.h32("tile:" + [i, j], worldSeed) % 250))));
      let yOffset = (sin(((millis() / 800) + (XXH.h32("tile:" + [i, j], worldSeed) % 400)))) / 2;
      ellipse((XXH.h32("tile:" + [i, j], worldSeed) % 10) + xOffset, yOffset, 10 + (XXH.h32("tile:" + [i, j], worldSeed) % 9), 5 + (XXH.h32("tile:" + [i, j], worldSeed) % 9) / 2);
    }

  }

  if(drawTree) //Trees
  {
    fill(80 + rValue / 2, 80 + gValue / 2, 80 + bValue / 2);
    let treeHeight = 2 + (XXH.h32("tile:" + [i, j], worldSeed) % 3);
    let treeSize = 4;

    beginShape(); 
    vertex(-tw / treeSize, 0);
    vertex(-tw / treeSize, -th * (treeHeight + (1 / treeSize)));
    vertex(0, -th * treeHeight);
    vertex(0, th / treeSize);
    endShape(CLOSE);

    fill(80 + gValue / 2, 80 + bValue / 2, 80 + rValue / 2);
    beginShape(); 
    vertex(0, -th * treeHeight);
    vertex(tw / treeSize, -th * (treeHeight + (1 / treeSize)));
    vertex(tw / treeSize, 0);
    vertex(0, th / treeSize);
    endShape(CLOSE);

    fill(rValue / 3, 50 + gValue, bValue / 3, 245);
    beginShape(); 

    let windOffset = (sin((millis() + (XXH.h32("tile:" + [i, j], worldSeed) % 200)) / 1000) * 5) / 1.5;
    vertex(-tw - (tw / treeSize) + windOffset, -th * (treeHeight + (treeHeight / 2)));
    vertex(0 + (windOffset / 4), -th * (treeHeight * 2));
    vertex(tw + (tw / treeSize) + windOffset, -th * (treeHeight + (treeHeight / 2)));
    vertex(tw + (tw / treeSize) + (windOffset / 4), -th * ((treeHeight / 2)));
    vertex(0, -th * ((treeHeight / 2) - 1));
    vertex(-tw - (tw / treeSize) + (windOffset / 4), -th * ((treeHeight / 2)));
    endShape(CLOSE);
  }

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
