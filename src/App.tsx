import routes from "./route";
import { useRoutes } from "react-router-dom";

const App = () => {
  const element = useRoutes(routes);
  return <div>{element}</div>;
};

export default App;
