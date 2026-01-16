import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface AuthRedirectProps {
    children: React.ReactNode;
}

const AuthRedirect = ({ children }: AuthRedirectProps) => {
    const location = useLocation();
    const { authData } = useSelector((state: RootState) => state.auth);
    const token = localStorage.getItem('LOGIN_TOKEN');
    const authStorage = localStorage.getItem('Auth');
    const selectedRole = localStorage.getItem('selectedRole');

    // Check if user is authenticated
    const isAuthenticated = authData || token || authStorage;
    
    // Check if user has selected a role
    const hasRole = selectedRole || authData?.userType;

    // Allow access to select-role page if authenticated but no role
    if (location.pathname === '/select-role') {
        if (!isAuthenticated) {
            // Not authenticated, redirect to login
            return <Navigate to="/login" replace />;
        }
        if (hasRole) {
            // Already has role, redirect to home
            return <Navigate to="/" replace />;
        }
        // Authenticated but no role - allow access
        return <>{children}</>;
    }

    // For other auth pages (login, verify-otp)
    if (isAuthenticated && hasRole) {
        // Redirect to home if already logged in and has role
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AuthRedirect;

