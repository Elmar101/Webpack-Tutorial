import {Image} from "./components/image/image";
import {Heading} from "./components/heading/heading";
import _ from "lodash";

const img = new Image();
const heading = new Heading();

heading.render(_.upperCase("image page"));
img.render();