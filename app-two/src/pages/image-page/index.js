import {Image} from "../../components/image/image";
import {Heading} from "../../components/heading/heading";
import _ from "lodash";

class ImagePage {
    render() {
        const img = new Image();
        const heading = new Heading();
        heading.render(_.upperCase("image page"));
        img.render();
        
        import('appOne/Button').then(module => {
            const Button = module.Button;
            const button = new Button();
            button.render();
        }).catch(err => console.error(err));
    }
}

export default ImagePage;