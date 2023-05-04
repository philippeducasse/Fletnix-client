import { createRoot} from 'react-dom/client';
//import statement to bundle scss

import "./index.scss";
import {MainView} from "./components/main-view/main-view"

// Main components

const FletnixApp = () => {
    return (
        <MainView />
    );
};

// finds root of app

const container = document.querySelector("#root");
const root = createRoot(container);

// tell react to render app in the root DOM element

root.render(<FletnixApp />);
