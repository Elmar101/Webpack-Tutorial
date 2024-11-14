import "./heading.scss";
export class Heading {
    render(pageName) {
        this.h1Class = 'h1';
        const body = document.querySelector('body');
        const h1 = document.createElement('h1');
        h1.innerHTML = `Hello, World! ${pageName}`;
        h1.classList.add(this.h1Class);
        body.appendChild(h1);
    }
}