import Loading from '../components/Loading';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    // console.log(role);


    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to='/forbidden'></Navigate>
    }

    return children;
};

export default AdminRoutes;