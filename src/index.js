import { Button } from "./components/button/button";
import { Heading } from "./components/heading/heading";
import imgSrc from "./assets/images/img1.png";

const img = document.createElement("img");
img.width = 100;
img.src = imgSrc;
document.body.appendChild(img);

const heading = new Heading();  
heading.render();
const button = new Button();
button.render();