/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let dustParticles = [];
let waterParticles = [];
let dustParticlesNum = 50;
let isDungeon = true;
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  waterParticles = [];
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function swapTerrain()
{
  isDungeon = !isDungeon;
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#swapTerrain").mousePressed(swapTerrain);
  select("#asciiBox").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);

  if(isDungeon)
  {
    drawDust();
  }
  else
  {
    drawWater();
  }

}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

function gridCheck(grid, i, j, target) {

  if(i >= 0 && i < grid.length && j >= 0  && j < grid[i].length)
  {
    if(grid[i][j] == target)
    {
      return true;
    }
  }
  return false;
}

function gridCode(grid, i, j, target) {
  let bitNorth = gridCheck(grid, i, j - 1, target);
  let bitSouth = gridCheck(grid, i, j + 1, target);
  let bitWest  = gridCheck(grid, i - 1, j, target);
  let bitEast  = gridCheck(grid, i + 1, j, target);

  return (bitNorth<<0)+(bitSouth<<1)+(bitEast<<2)+(bitWest<<3);
}

function drawContext(grid, i, j, target, ti, tj) {
  code = gridCode(grid, i, j, target);
  //print("______");
  //print("Code: " + code);
  //print("Lookup: " + lookup[code]);
  const [tiOffset, tjOffset] = lookup[code];
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}

const lookup = [
  [30,1], // 0 None
  [0, 1], // 1 Right Face
  [2, 1], // 2 Left Face
  [30,1], // 3
  [1,2], // 4 Top Face
  [0,2], // 5 Bottom Left Corner
  [2,2], // 6 Bottom Right Corner
  [30,2], // 7 
  [1,0], // 8 Bottom Face
  [0,0], // 9 Top Left Corner
  [2,0], // 10 Top Right Corner
  [30,1], // 11 
  [30,1], // 12
  [30, 1], // 13 
  [30, 1], // 14
  [30,1] // 15 None
];

