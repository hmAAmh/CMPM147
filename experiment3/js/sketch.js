/* exported generateGrid, drawGrid */
/* global placeTile */

let outsideOffset = 3;
// --- CONST KEYCODES ---
const floorDungeon = ".";
const outsideDungeon = "_";
const pit = "0";


// --- CONST KEYCODES ---

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(pit);
    }
    grid.push(row);
  }

  populateRooms(5, 3, 6, grid);
  for(let numDust = 0; numDust < dustParticlesNum; numDust++)
  {
    dustParticles[numDust] = new dustParticle();
  }
  spawnWaterParticles(grid);

  return grid;
}

function drawGrid(grid) {
  background(128);
  
  
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {


      if(isDungeon) //DUNGEON MAP
      {
        if (gridCheck(grid, i, j, pit)) {
          placeTile(i, j, 20, 23);
        }

        if (gridCheck(grid, i, j, outsideDungeon)) 
        {
          placeTile(i, j, 11 + floor(random(3)), 21 + floor(random(3)));
        }
        else
        {
          drawContext(grid, i, j, outsideDungeon, 4, 9);
        }


        if (gridCheck(grid, i, j, floorDungeon)) 
        {
          let dirCheck = gridCode(grid, i, j, grid[i][j]);

          if(dirCheck == 6 || dirCheck == 7 || dirCheck == 5) // Top Decoration
          {
            if(random() < .92)
            {
              placeTile(i, j, 11, 21 + floor(random(3)));
            }
            else
            {
              placeTile(i, j, 15 + floor(random(3)), 25 + floor(random(2))); //Small chance to add doors
            }
          }
          else // Floor Tiles
          {
            
            if(random() > .5)
            {
              placeTile(i, j, 0, 3);
            }
            else
            {
              placeTile(i, j, 1 + floor(random(3)), 3);
            }
  
            if(random() > .96) // Stray Rocks
            {
              placeTile(i, j, 14, 3);
            }
          }

          if(random() > .9 && (dirCheck == 9 || dirCheck == 10 || dirCheck == 11 || dirCheck == 13 || dirCheck == 14)) //Chests
          {
            placeTile(i, j, 0 + floor(random(2)), 28 + floor(random(5)));
          }
        } 
        else 
        {
          drawContext(grid, i, j, floorDungeon, 15, 21);
        }
      }
      else //OVERWORLD MAP
      {



        if (gridCheck(grid, i, j, floorDungeon)) { // Water
          placeTile(i, j, 0, 13);
        } 

        if (gridCheck(grid, i, j, outsideDungeon)) { //Dirt

          if(random() > 0.5)
          {
            placeTile(i, j, random(0, 3), 3);
          }
          else
          {
            placeTile(i, j, random(1, 3), 3);
          }
          
        }  
        else 
        {
          drawContext(grid, i, j, outsideDungeon, 9, 3);
        }

        if (gridCheck(grid, i, j, pit)) { //Grass
          if(random() > 0.5)
          {
            placeTile(i, j, 0, 0);
          }
          else
          {
            placeTile(i, j, random(1, 3), 0);
          }

          if(random() > .95)
          {
            if(random() > .5)
            {
              placeTile(i, j, 14, 0);
            }
            else
            {
              placeTile(i, j, 14, 6);
            }
          }
        }  
        else 
        {
          drawContext(grid, i, j, pit, 4, 0);
        }

        if(gridCheck(grid, i, j, outsideDungeon) && random() > .95)
        {
          placeTile(i, j, 14, 3);
        }

      }
    }
  }
  
}

function spawnWaterParticles(grid)
{
  arrayOffset = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (gridCheck(grid, i, j, floorDungeon) && gridCode(grid, i, j, grid[i][j]) == 15) 
      { // Water
        let numToSpawn = random(0, 3);
        for(let x = 0; x < numToSpawn; x++)
        {
          xOffset = (j * 16) + random(-8, 8);
          uOffset = (i * 16) + random(-8, 8);
          waterParticles[arrayOffset] = new waterParticle(xOffset, uOffset); 
          arrayOffset++;
        }
      } 
    }
  }
}

function drawWater()
{
  for(let numWater = 0; numWater < waterParticles.length; numWater++)
  {
    waterParticles[numWater].draw();
  }
}

function drawDust()
{
  for(let numDust = 0; numDust < dustParticlesNum; numDust++)
  {
    dustParticles[numDust].move();
    dustParticles[numDust].draw();
  }
}


function drawRoom(grid, roomX, roomY, roomXSize, roomYSize) 
{
  
  let roomXEnd = roomX + roomXSize;
  let roomYEnd = roomY + roomYSize;
  for(let i = roomX; i < roomXEnd; i++) {
    for(let j = roomY; j < roomYEnd; j++) {
      
      if(i < grid.length && j < grid[0].length)
      {
        grid[i][j] = floorDungeon;

        drawRoomOutside(grid, i, j);
      }
    }
  }
}

function drawRoomOutside(grid, i, j)
{
  for(let iOffset = i - outsideOffset; iOffset < i + outsideOffset; iOffset++)
  {
    for(let jOffset = j - outsideOffset; jOffset < j + outsideOffset; jOffset++)
    {
      if(iOffset >= 0 && iOffset < grid.length && jOffset >= 0 && jOffset < grid[0].length && grid[iOffset][jOffset] != floorDungeon)
      {
        grid[iOffset][jOffset] = outsideDungeon;
      }
    }  
  }
}

function populateRooms(numRooms, minSize, maxSize, grid)
{
  let curRooms = 0;

  let prevRoomX = 0;
  let prevRoomY = 0;
  let prevRoomXSize = 0;
  let prevRoomYSize = 0;

  while(curRooms < numRooms)
  {
    let roomX = floor(random(grid.length));
    let roomY = floor(random(grid[0].length));
    let roomXSize = floor(random(maxSize)) + minSize;
    let roomYSize = floor(random(maxSize)) + minSize;
    
    drawRoom(grid, roomX, roomY, roomXSize, roomYSize);


    if(curRooms != 0) // Path Generator
    {
      if(random() > 0.5 && roomX != prevRoomX && roomY != prevRoomY)
      {
        let signedDirX = 1;
        if(prevRoomX < roomX)
        {
          signedDirX = -1;
        }
        let signedDirY = 1;
        if(prevRoomY < roomY)
        {
          signedDirY = -1;
        }
        let absDistX = abs(roomX - prevRoomX);
        let absDistY = abs(roomY - prevRoomY);

        finalXPos = 0.

        for(let curDist = 0; curDist < absDistX; curDist++)
        {
          finalXPos = roomX + (curDist * signedDirX);
          grid[finalXPos][roomY] = floorDungeon;
          grid[finalXPos][roomY + 1] = floorDungeon;
          drawRoomOutside(grid, finalXPos, roomY);
          drawRoomOutside(grid, finalXPos + 1, roomY);
        }

        for(let curDist = 0; curDist < absDistY; curDist++)
        {
          grid[finalXPos][roomY + (curDist * signedDirY)] = floorDungeon;
          grid[finalXPos + 1][roomY + (curDist * signedDirY)] = floorDungeon;
          drawRoomOutside(grid, finalXPos, roomY + (curDist * signedDirY));
          drawRoomOutside(grid, finalXPos + 1, roomY + (curDist * signedDirY));
        }   
      }
    }

    prevRoomX = roomX;
    prevRoomY = roomY;
    prevRoomXSize = roomXSize;
    prevRoomYSize = roomYSize;

    curRooms++;
  }
}

class dustParticle
{
  constructor()
  {
    this.x = random(16 * numCols);
    this.y = random(16 * numRows);
    this.yInit = this.y;
    this.offset = random(100, 100000);
    this.size = random(5, 10);
    this.speed = random(2.5, 5);
  }

  move()
  {
    this.x += (this.speed * noise(0.005 * frameCount + this.offset / 2));
    if(this.x >= 16 * numCols)
    {
      this.x = 0;
    }
    this.y = this.yInit * noise(0.005 * frameCount + this.offset) * 5;
  }

  draw()
  {
    stroke(68, 36, 52, 125);
    fill(68, 36, 52, 125);
    rect(this.x, this.y, this.size, this.size);
  }
}

class waterParticle 
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.yInit = this.y;
    this.offset = random(1000, 50000)
    this.size = random(2, 6);
    this.timeScale = random(2000, 5000);
  }

  draw()
  {
    let aValue = sin((millis() + this.offset) / this.timeScale);
    if(aValue >= .95)
    {
      aValue = 255;
    }
    else
    {
      aValue = 0;
    }
    stroke(150, 200, 255, aValue);
    fill(150, 200, 255, aValue);
    rect(this.x, this.y, this.size, this.size);
  }
}