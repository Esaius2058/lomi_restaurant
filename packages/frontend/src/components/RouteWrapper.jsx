import { Outlet } from "react-router-dom";

const RouteWrapper = () => {
    return (
        <div className="app-container">
            <Outlet />
        </div>
    );
}

export default RouteWrapper;