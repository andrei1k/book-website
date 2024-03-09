import { Navigate, Outlet } from "react-router";
import { User } from "../services/userInfoService";

interface PrivateOutletProps {
  user: User | null;
}

export function PrivateOutlet({ user }: PrivateOutletProps) {
  return user ? <Outlet /> : <Navigate to='/login' />
}
