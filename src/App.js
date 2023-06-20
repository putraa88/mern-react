import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes.constant";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            routes.map((i, index) =>
              <Route key={index} {...i} />
            )
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
