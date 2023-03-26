import { Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Dashboard, Admin, Curso } from './pages';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signIn" Component={SignIn} />
            <Route path="/signUp" Component={SignUp} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/admin" Component={Admin} />
            <Route path="/curso/:id/:action?" Component={Curso} />
        </Routes>
    );
}

export default AppRoutes;