import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Users, Store, Building2, ChevronRight } from 'lucide-react';
import { authAction } from '../../redux/authSlice';
import { selectUserRole } from '../../services/authService';

import CustomButton from '@/components/CustomButton';
import type { RootState } from '../../redux/store';

interface RoleType {
    name: string;
    icon: React.ReactNode;
    id: 'FARMER' | 'BUYER' | 'AGROSHOP' | 'FPO';
    color: string;
    desc: string;
}

const SelectRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isloading, authData, authError } = useSelector((state: RootState) => state.auth);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const roles: RoleType[] = [
        {
            name: "Farmer's",
            icon: <User size={28} />,
            id: 'FARMER',
            color: '#4CAF50',
            desc: "Farming and agriculture users."
        },
        {
            name: 'Buyers',
            icon: <Users size={28} />,
            id: 'BUYER',
            color: '#2196F3',
            desc: "Users who buy agri products."
        },
        {
            name: 'AgroShop',
            icon: <Store size={28} />,
            id: 'AGROSHOP',
            color: '#FF9800',
            desc: "Shops selling agri supplies."
        },
        {
            name: 'FPO',
            icon: <Building2 size={28} />,
            id: 'FPO',
            color: '#9C27B0',
            desc: "Farmer producer groups."
        },
    ];

    const handleRoleSelect = (roleId: string) => {
        setSelectedRole(roleId);
        // Clear any previous errors
        dispatch(authAction.errorAuth(''));
    };

    const handleSubmit = async () => {
        if (!selectedRole) {
            return;
        }

        dispatch(authAction.loadigData(true));

        try {
            const result = await selectUserRole(selectedRole);
            dispatch(authAction.loadigData(false));

            if (result?.statusCode === 200 || result?.statusCode === '200' || result?.success) {
                // Update auth data with userType if authData exists
                if (authData) {
                    const updatedAuthData = { ...authData, userType: selectedRole };
                    dispatch(authAction.fetchAuth(updatedAuthData));
                }
                // Navigate to home
                navigate('/');
            } else {
                dispatch(authAction.errorAuth(result?.message || result?.error || 'Failed to select role'));
            }
        } catch (error: unknown) {
            dispatch(authAction.loadigData(false));
            const err = error as { message?: string; error?: string };
            const errorMessage = err?.message || err?.error || 'Network error';
            dispatch(authAction.errorAuth(errorMessage));
        }
    };

    return (
        <div className="auth-container role-selection-page">
            <div className="brand-section">
                <h1>Apna Farmer</h1>
                <p>किसानों की डिजिटल दुनिया</p>
            </div>

            <div className="bottom-sheet role-selection-compact">
                <div className="role-selection-header">
                    <h2>Select Your Role</h2>
                    <p>Choose the role that best describes you</p>
                </div>

                <div className="roles-grid-compact">
                    {roles.map((role, index) => (
                        <div
                            key={index}
                            className={`role-box-compact ${selectedRole === role.id ? 'selected' : ''}`}
                            style={{
                                '--role-color': role.color
                            } as React.CSSProperties}
                            onClick={() => handleRoleSelect(role.id)}
                        >
                            <div
                                className="role-box-icon"
                                style={{
                                    backgroundColor: `${role.color}15`,
                                    color: role.color
                                }}
                            >
                                {role.icon}
                            </div>
                            <h3 className="role-box-title">{role.name}</h3>
                        </div>
                    ))}
                </div>

                {authError && (
                    <p className="error-text-compact">
                        {authError}
                    </p>
                )}

                <div className="role-continue-button">
                    <CustomButton
                        title="Continue"
                        onPress={handleSubmit}
                        isLoading={isloading}
                        disabled={!selectedRole}
                        icon={<ChevronRight size={18} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectRole;

