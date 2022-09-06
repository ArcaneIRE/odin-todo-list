import ViewController from "./view/ViewController";
import normalizeCss from "./normalize.css";
import css from "./index.css";

const root = document.getElementById('app');
const view = new ViewController(root);
view.updateView();
