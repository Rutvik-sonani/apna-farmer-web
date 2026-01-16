import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { authAction } from '../../redux/authSlice';
import { verifyOTP, generateOTP } from '../../services/authService';
import CustomButton from '@/components/CustomButton';
import { images } from '../../utils/images';
import type { RootState } from '../../redux/store';

const OtpVerify = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { phone } = location.state || {};
    const { authData, otpError, isloading, timer } = useSelector(
        (state: RootState) => state.auth,
    );
    // Fallback if accessed directly without state
    if (!phone && !authData?.mobile) {
        // In a real app, redirect back to login
    }

    const displayedPhone = phone || authData?.mobile;

    const [otp, setOtp] = useState(['', '', '', '']);
    const [timerCount, setTimerCount] = useState(timer || 60);

    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timerCount > 0) {
            const interval = setInterval(() => {
                setTimerCount((prev: number) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timerCount]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.value !== '' && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const onSubmit = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 4) {
            dispatch(authAction.errorOtp('Please enter valid 4-digit OTP'));
            return;
        }

        dispatch(authAction.loadigData(true));
        dispatch(authAction.errorOtp(''));

        try {
            const userId = authData?._id;

            if (!userId) {
                dispatch(authAction.loadigData(false));
                dispatch(authAction.errorOtp('User ID not found. Please login again.'));
                navigate('/login');
                return;
            }

            // Always use default OTP 1111 (as per requirement)
            const otpToSend = '1111';

            const result = await verifyOTP(userId, otpToSend);
            dispatch(authAction.loadigData(false));

            if (result?.success || result?.statusCode === 200) {
                // Success - Store auth data
                const userData = result.data || result;

                // Store in Redux
                dispatch(authAction.fetchAuth(userData));

                // Check if user has userType
                if (userData?.userType) {
                    // User already has a role, store it and go to home
                    localStorage.setItem('selectedRole', userData.userType);
                    navigate('/');
                } else {
                    // User needs to select a role
                    navigate('/select-role');
                }
            } else {
                dispatch(authAction.errorOtp(result?.message || 'Verification failed'));
            }
        } catch (error: unknown) {
            dispatch(authAction.loadigData(false));
            const err = error as { message?: string; error?: string };
            const errorMessage = err?.message || err?.error || 'Network error';
            dispatch(authAction.errorOtp(errorMessage));
        }
    };

    const onResend = async () => {
        if (!authData?._id) {
            dispatch(authAction.errorOtp('User ID not found. Please login again.'));
            navigate('/login');
            return;
        }

        dispatch(authAction.loadigData(true));
        dispatch(authAction.errorOtp(''));

        try {
            const result = await generateOTP(authData._id);
            dispatch(authAction.loadigData(false));

            if (result?.statusCode === 200 || result?.success) {
                setTimerCount(60);
                dispatch(authAction.setTimer(60));
            } else {
                dispatch(authAction.errorOtp(result?.message || 'Failed to resend OTP'));
            }
        } catch (error: unknown) {
            dispatch(authAction.loadigData(false));
            const err = error as { message?: string; error?: string };
            const errorMessage = err?.message || err?.error || 'Failed to resend OTP';
            dispatch(authAction.errorOtp(errorMessage));
        }
    };

    // Redirect to login if no phone/authData
    useEffect(() => {
        if (!phone && !authData?.mobile) {
            navigate('/login');
        }
    }, [phone, authData, navigate]);

    return (
        <div className="auth-container">
            <div className="brand-section">
                <h1>Apna Farmer</h1>
                <p>किसानों की डिजिटल दुनिया</p>
            </div>

            <div className="bottom-sheet">
                <div className="login-header">
                    <h2>OTP Verification</h2>
                    <img
                        src={images.App}
                        alt="Apna Farmer Logo"
                        className="login-logo"
                    />
                    <p style={{
                        marginTop: '1rem',
                        color: 'var(--subtitle)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                    }}>
                        We've sent a verification code to<br />
                        <strong style={{ color: 'var(--title)', fontSize: '0.95rem' }}>{displayedPhone}</strong>
                    </p>
                </div>

                <div className="form-container">
                    <div className="otp-input-container">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                ref={el => { inputs.current[index] = el; }}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                className="otp-input"
                            />
                        ))}
                    </div>

                    {otpError && (
                        <p className="error-text text-center" style={{ marginTop: '0.5rem' }}>
                            {otpError}
                        </p>
                    )}

                    <CustomButton
                        title="Verify & Proceed"
                        onPress={onSubmit}
                        isLoading={isloading}
                        icon={<ArrowRight size={20} />}
                    />

                    <div className="text-center" style={{ marginTop: '1rem', flexShrink: 0 }}>
                        {timerCount > 0 ? (
                            <p style={{
                                color: 'var(--subtitle)',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}>
                                Resend code in <strong>{timerCount}s</strong>
                            </p>
                        ) : (
                            <button
                                onClick={onResend}
                                className="resend-button"
                            >
                                Resend Code
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;
