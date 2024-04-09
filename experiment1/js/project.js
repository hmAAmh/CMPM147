// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    adventurer: [
      "Blanchard's Cricket Frog ",
      "Eastern Cricket Frog",
      "Southern Cricket Frog",
      "Tusked Frog",
      "Eastern American Toad",
      "Boreal Toad",
      "California Toad",
      "Arroyo Toad",
      "Yosemite Toad",
      "Great Plains Toad",
      "Western Chihuahuan Green Toad",
    ],
    pre: ["old", "new", "dirty"],
    post: ["pond", "lake", "creek", "river"],
    people: [
      "slimy",
      "large",
      "flat",
      "jumpy",
      "hungry",
    ],
    loots: [
      "flies",
      "bugs",
      "worms",
      "plants",
    ],
    baddies: [
      "lion",
      "crocodile",
      "mean frog",
      "axolotl",
      "hyena",
      "dragonfly",
    ],
    message: [
      "croaking",
      "eating",
      "jumping",
      "sleeping",
    ],
  };
  
  const template = `I just stumbled across a $adventurer who is $message right of the coast of the $pre
  $post! It's look especially $people, and like it's probably trying to hunt for $loots. 
  I hope it doesn't run into a $baddies.
  `;
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
//main();