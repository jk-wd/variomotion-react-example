import { useEffect } from 'react';
import './App.css';

// Import the variomotion package
import variomotion from "@variomotion/core";

// Import the animation definition
import animationData from "./animation.json";

// Create a project
const { project: varioProject, target } =
  variomotion.project("variomotion-react-example");

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
    <main>
	    <div data-v={target('circle')} className="cricle"></div>
    </main>
  );
}


export default App;
