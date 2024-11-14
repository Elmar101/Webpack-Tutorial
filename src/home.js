import { Button } from "./components/button/button";
import { Heading } from "./components/heading/heading";
import imgSrc from "./assets/images/img1.png";
import React from "react";
import _ from "lodash";

const img = document.createElement("img");
img.width = 100;
img.src = imgSrc;
document.body.appendChild(img);

const heading = new Heading();  
heading.render(_.upperCase('index page'));
const button = new Button();
button.render();

if (process.env.NODE_ENV === 'production') {
    console.log("Production rejimindəyik");
} else {
    console.log("development rejimindəyik");
}

// Qəsdən səhv:
// nonExistentFunction();