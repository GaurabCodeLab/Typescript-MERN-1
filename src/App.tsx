import { useEffect } from "react";
import routes from "./route";
import { useRoutes } from "react-router-dom";
import { useGetCurrentPersonQuery } from "./redux/api/personApi";
import { useDispatch } from "react-redux";
import { loggedInPerson, removePerson } from "./redux/slices/personSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useGetCurrentPersonQuery();

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(loggedInPerson(data.data));
    } else if (isError) {
      dispatch(removePerson());
    }
  }, [isSuccess, isError, data, dispatch]);

  const element = useRoutes(routes);
  return <div>{element}</div>;
};

export default App;
