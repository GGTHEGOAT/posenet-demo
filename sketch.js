let capture;
let poseNet;
let poses = [];

let pacinoImg, deniroImg, vitoImg;

function preload() {
  // Make sure these images are inside an "images" folder
  pacinoImg = loadImage('images/alpacino.png');
  deniroImg = loadImage('images/deniro.png');
  vitoImg = loadImage('images/vito corleone.png');
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("canvas-container");

  capture = createCapture(VIDEO);
  capture.size(800, 500);
  capture.hide();

  poseNet = ml5.poseNet(capture, () => console.log('✅ PoseNet loaded'));
  poseNet.on('pose', (results) => {
    poses = results;
  });
}

function draw() {
  background(0);

  // Draw webcam feed
  image(capture, 0, 0, width, height);

  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Draw keypoints
    fill(255, 0, 0);
    noStroke();
    for (let i = 0; i < pose.keypoints.length; i++) {
      let keypoint = pose.keypoints[i];
      if (keypoint.score > 0.2) {
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }

    // Draw skeleton
    stroke(0, 255, 0);
    strokeWeight(2);
    let skeleton = poses[0].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }

    // Overlay images on face (nose position)
    let noseX = pose.nose.x;
    let noseY = pose.nose.y;

    // You can adjust offsets for each image
    
    image(deniroImg, noseX - 40, noseY - 60, 100, 100);
   
  }
}
