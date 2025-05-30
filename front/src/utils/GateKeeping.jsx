import { Navigate, Outlet } from "react-router";

const GateKeeping = () => {
    const token = localStorage.getItem('token');
    return token? <Outlet /> : <Navigate to="/login" replace />
}

export default GateKeeping;