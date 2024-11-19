import "./style.scss";

export class NavigationBar {
    render(navigationItems) {
        const listItem = navigationItems.map(item => {
            return `<li><a href="${item.url}">${item.title}</a></li>`
        });

        const ul = document.createElement('ul');
        ul.innerHTML = listItem.join('');
        ul.classList.add('navigation-bar');
        document.body.appendChild(ul);
    }
};