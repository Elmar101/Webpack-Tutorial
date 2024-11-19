import {NavigationBar} from "./components/navigation-bar/index";

const url = window.location.pathname;

const navigationItems = [
    {
        url: "/home",
        title: "Home"
    },
    {
        url: "/image",
        title: "Image"
    }
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

if (url === "/home") {
    import("appOne/HomePage").then(module => {
        const HomePage = module.default;
        const homePage = new HomePage();
        homePage.render();
    }).catch(err => console.error(err));
}else if(url==="/image"){
    import("appTwo/ImagePage").then(module => {
        const ImagePage = module.default;
        const imagePage = new ImagePage();
        imagePage.render();
    }).catch(err => console.error(err));
}else{
    
}
