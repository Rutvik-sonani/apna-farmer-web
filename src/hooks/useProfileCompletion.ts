import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';

export const useProfileCompletion = () => {
    const navigate = useNavigate();
    const { authData: user } = useSelector((state: RootState) => state.auth);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    // Derived state
    const isProfileComplete = useMemo(() => {
        if (!user) return false;
        const hasFirstName = user.firstName && user.firstName.trim().length > 0;
        const hasLastName = user.lastName && user.lastName.trim().length > 0;
        return !!(hasFirstName && hasLastName);
    }, [user]);

    // Check completion when user is present and not complete
    useEffect(() => {
        if (user && !isProfileComplete) {
            // Defer the modal show to avoid synchronous render warning
            const timer = setTimeout(() => {
                setShowCompletionModal(true);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [user, isProfileComplete]);

    const checkCompletion = useCallback(() => {
        if (!isProfileComplete) {
            setShowCompletionModal(true);
            return false;
        }
        return true;
    }, [isProfileComplete]);

    const handleGoToProfile = () => {
        setShowCompletionModal(false);
        navigate('/profile/edit');
    };

    const handleCloseModal = () => {
        setShowCompletionModal(false);
        navigate(-1);
    };

    return {
        isProfileComplete,
        showCompletionModal,
        setShowCompletionModal,
        checkCompletion,
        handleGoToProfile,
        handleCloseModal
    };
};
