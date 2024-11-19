import './image.scss';
import imgSrc from "../../assets/images/img1.png";

export class Image {
    render() {
        const body = document.querySelector('body');
        const img = document.createElement('img');
        img.className = 'img';
        img.src = imgSrc;
        body.appendChild(img);
    }
};