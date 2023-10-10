import {createRoot} from 'react-dom/client';
//import statement to bundle scss
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import MainView from "./components/main-view/main-view"
import Container from 'react-bootstrap/Container';

// Main components

const FletnixApp = () => {
    return (
        <Container>
            <MainView />
        </Container>
        
    );
};

// finds root of app

const container = document.querySelector("#root");
const root = createRoot(container);

// tell react to render app in the root DOM element

root.render(<FletnixApp />);
