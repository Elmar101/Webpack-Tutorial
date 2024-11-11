import { Div } from "../div/div";
import "./button.css";

const div = new Div();
export class Button {
    buttonClass = 'button';
    
    render() {
        const body = document.querySelector('body');
        const button = document.createElement('button');
        button.innerHTML = 'Click';
        button.classList.add(this.buttonClass);

        button.addEventListener('click', () => {
            div.render();
        });

        body.appendChild(button);
    }
};