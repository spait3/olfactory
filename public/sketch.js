
//Speaking positive words or negative words (easy words like good, nice, great, amazing, awesome, sad, bad, ugly, etc) , it takes the response and blooms accordingly, there might be delays in processing

let v = [];
let rows = 60, cols = 100;

let canvas;

let pNumSlider, pLenSlider, diameterSlider, pSharpSlider;
let petalNum, pLength, diameter, pSharpness;

let heightSlider, curvatureSlider1, curvatureSlider2;
let flowerHeight, curvature1, curvature2;

let bumpSlider, bumpNumSlider;
let bump, bumpNum;

let pNum, fD, pLen, pSharp;
let fHeight, curve1, curve2;
let b, bNum;

var totalScore = 0;

let dia = 10;


// Speech Object
let speech;
var afinn;


 const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'Hello, world!';

  



function preload() {
  afinn = loadJSON('afinn111.json');
  font = loadFont("./SourceSerifPro-BoldItalic.ttf");
  branch = loadModel("./branch.obj");
  t = loadImage("./img/texture.jpeg");
  lem = loadModel("./img/Lemon.obj");
  lemtext = loadImage("./img/lemtext.jpg");
}


function setup() {
  background("white");
  textFont(font);
  textSize(200);
  canvas = createCanvas(700, 800, WEBGL);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  noStroke();

  
  //console.log(afinn);
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = true;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);



  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    //console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // Show user
      console.log(said);
      
      //AFFINN PART
    var textinput = said;
    var words = textinput.split(/\W/);
    console.log(words);
    var scoredwords = [];
    for (var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        var score = afinn[word];
        console.log(word, score);

        totalScore += Number(score);
      
        scoredwords.push(word + ': ' + score + ' ');
      }
    }
    console.log(totalScore);
    dia = map(totalScore, 0, 25, 0, 25);
    console.log(dia);

    //console.log(txt.value());
  
      
    }
  }
}





function draw(){
  
  clear();
  textFont(font);
  textSize(70);
  background("black");
  

  //orbitControl(4, 4);
  branch1(dia);
  branch2(dia);
  branch3(dia);
  branch4(dia);
  lemon1(dia);
  flower2(dia);
  flower1(dia);
  

}



