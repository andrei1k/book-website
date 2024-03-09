import { Navigate, Outlet } from "react-router";
import { User } from "../services/userInfoService";

interface PublicOutletProps {
  user: User | null;
}

export function PublicOutlet ({ user }: PublicOutletProps) {
  return user ? <Navigate to='/library' /> : <Outlet />;
}
