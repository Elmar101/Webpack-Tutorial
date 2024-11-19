import "./div.scss";
export class Div {
    render(){
        const div = document.createElement('div');
        div.innerHTML = 'Hello, World!';
        div.className ='div';
        document.body.appendChild(div);
    };
}