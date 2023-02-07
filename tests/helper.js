const path = require("path");
const fs = require("fs");

const imgToBase64 = (img) => {
  return fs.readFileSync(path.join(__dirname, img), "base64");
};

const initialSkills = [
  {
    title: "test title 1",
    description: "Lorem ipsum hello there!",
    tools: [
      {
        name: "test tool 1",
        img: imgToBase64("img1.jpg"),
      },
      {
        name: "test tool 2",
        img: imgToBase64("img2.jpg"),
      },
    ],
  },
  {
    title: "test title 2",
    description: "Lorem ipsum this is second!",
    tools: [
      {
        name: "test tool 1",
        img: imgToBase64("img1.jpg"),
      },
      {
        name: "test tool 2",
        img: imgToBase64("img2.jpg"),
      },
    ],
  },
];

const initialProjects = [
  {
    title: "project title 1",
    description: "Lorem ipsum hello there!",
    tools: [
      {
        name: "test tool 1",
        img: imgToBase64("img1.jpg"),
      },
      {
        name: "test tool 2",
        img: imgToBase64("img2.jpg"),
      },
    ],
	imgs: [imgToBase64("img1.jpg"), imgToBase64("img2.jpg")]	
  },
  {
    title: "project title 2",
    description: "Lorem ipsum this is second!",
    tools: [
      {
        name: "test tool 1",
        img: imgToBase64("img1.jpg"),
      },
      {
        name: "test tool 2",
        img: imgToBase64("img2.jpg"),
      },
    ],
	imgs: [imgToBase64("img1.jpg"), imgToBase64("img2.jpg")]
  },
];

const initialDetails = {
	phone: "8778226764",
	mail: "baratht1207@gmail.com",
	linkedin:"Barath-T",
	github: "Barath-T"
};

module.exports = {initialSkills, initialProjects, imgToBase64, initialDetails};
