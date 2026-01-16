import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { authData } = useSelector((state: RootState) => state.auth);
    const token = localStorage.getItem('LOGIN_TOKEN');
    const authStorage = localStorage.getItem('Auth');
    const selectedRole = localStorage.getItem('selectedRole');

    // Check if user is authenticated
    const isAuthenticated = authData || token || authStorage;
    
    // Check if user has selected a role
    const hasRole = selectedRole || authData?.userType;

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    if (!hasRole) {
        // Authenticated but no role selected - redirect to role selection
        return <Navigate to="/select-role" replace />;
    }

    // Role-based access control
    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = (selectedRole || authData?.userType || '').toUpperCase();
        if (!allowedRoles.includes(userRole)) {
            // User does not have permission - redirect to home
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;

