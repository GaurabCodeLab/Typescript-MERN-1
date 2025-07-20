import type React from "react";
import routes from "./route";
import { useRoutes } from "react-router-dom";

const App: React.FC = () => {
  const element = useRoutes(routes);
  return <div>{element}</div>;
};

export default App;
