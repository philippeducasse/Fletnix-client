import { createRoot} from 'react-dom/client';
//import statement to bundle scss

import "./index.scss";

// Main components

const FletnixApp = () => {
    return (
        <div className = "fletnix">
            <div>Hello World</div>
        </div>
    );
};

// finds root of app

const container = document.querySelector("#root");
const root = createRoot(container);

// tell react to render app in the root DOM element

root.render(<FletnixApp />);
