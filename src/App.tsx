import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Import the variomotion package
import variomotion from "@variomotion/core";

// Import the animation definition
import animationData from "./animation.json";

// Create a project
const { project: varioProject, target } =
  variomotion.project("variomotion-site");

function App() {
    useEffect(() => {
      async function initVariomotion() {
        // Connect to the Variomotion Editor in development mode
        if (process.env.NODE_ENV === "development") {
          // Connect the editor
          const { connectEditor } = await import("@variomotion/editor-connect");

          await connectEditor(async () => {
            return varioProject.init(animationData);
          });
        } else {
          // For production, we dont want to connect to the editor
          await varioProject.init(animationData);
        }
      }
      initVariomotion();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Expose the image for animation using the data-v attribute  */}
        <div data-v={target("logo")}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
