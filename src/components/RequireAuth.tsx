import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import type { ReactNode } from "react";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const person = useSelector((state: RootState) => state.person.personDetails);

  if (!person) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireAuth;
