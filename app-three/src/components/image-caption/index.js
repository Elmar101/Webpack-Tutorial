import "./style.scss";

export class ImageCaption {
    render(text) {
        const div = document.createElement('div');
        div.textContent = text;
        div.classList.add('div');
        document.body.appendChild(div);
    }
}