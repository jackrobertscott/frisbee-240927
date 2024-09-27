import {createRoot} from "react-dom/client"

const app = <div style={{color: "white", padding: 100}}>Hello world</div>

createRoot(document.getElementById("root")!).render(app)
