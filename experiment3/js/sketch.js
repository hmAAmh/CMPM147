/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      if(j % 2 == 0)
      {
        row.push("_");
      }
      else
      {
        row.push(".");
      }
    }
    grid.push(row);
  }
  
  return grid;
}

function drawGrid(grid) {
  background(128);
  //populateRooms(5, 3, 6, grid);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
        //placeTile(i, j, (floor(random(4))), 0);
      }
      if (gridCheck(grid, i, j, ".")) {
        placeTile(i, j, floor(random(4)), 0);
      } else {
        drawContext(grid, i, j, ".", 4, 0);
      }

    }
  }
  
  gridCode(grid, 0, grid[0].length - 1, grid[0][0]);
  
}

function drawRoom(grid, roomX, roomY, roomXSize, roomYSize) 
{
  
  let roomXEnd = roomX + roomXSize;
  let roomYEnd = roomY + roomYSize;
  for(let i = roomY; i < roomYEnd; i++) {
    for(let j = roomX; j < roomXEnd; j++) {
      
      //placeTile(i, j, 20, 23); //Default Tiles
      placeTile(i, j, 20, 23);
      
      if(i == roomY) //Top
      {
        placeTile(i, j, 26, 21);
      }
      else if(i == roomYEnd - 2 && j != roomY && j != roomYEnd - 1) // Bottom Corners
      {
        placeTile(i, j, 26, 23);
      }
      else if(i == roomYEnd - 1) //Bottom
      {
        placeTile(i, j, 21, 21 + floor(random(3)));
      }
      
      drawRoomSideWall(i, j, roomX, roomY, roomYEnd, 25, 21);
      drawRoomSideWall(i, j, roomXEnd - 1, roomY, roomYEnd, 27, 21);
    }
  }
}

function drawRoomSideWall(i, j, roomX, roomY, roomYEnd, tileX, tileY)
{
  //drawRoom helper function, renders the corners of rooms
  if(j == roomX)
  {
    if(i == roomY) //Top Corner
    {
      placeTile(i, j, tileX, tileY);
    }
    else if(i < roomYEnd - 2) //Side
    {
      placeTile(i, j, tileX, tileY + 1);
    }
    else if(i == roomYEnd - 2) //Bottom Corner
    {
      placeTile(i, j, tileX, tileY + 2);
    }  
  }  
}

function populateRooms(numRooms, minSize, maxSize, grid)
{
  let curRooms = 0;
  while(curRooms < numRooms)
  {
    
    //let roomSize = max(floor(random(maxSize)), minSize);
    let roomX = floor(random(grid.length));
    let roomY = floor(random(grid[0].length));
    let roomXSize = floor(random(maxSize)) + minSize;
    let roomYSize = floor(random(maxSize)) + minSize;
    
    drawRoom(grid, roomX, roomY, roomXSize, roomYSize)
    curRooms++;
  }
}

