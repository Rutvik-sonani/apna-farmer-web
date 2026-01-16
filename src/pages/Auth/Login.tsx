import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import CustomTextInput from '@/components/CustomTextInput';
import { authAction } from '../../redux/authSlice';
import { login } from '../../services/authService';
import { images } from '../../utils/images';
import type { RootState } from '../../redux/store';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isloading, authError } = useSelector((state: RootState) => state.auth);

    const [phone, setPhone] = useState('');

    const onPhoneChange = (text: string) => {
        dispatch(authAction.errorAuth('')); // Clear error
        const cleaned = text.replace(/[^0-9]/g, '');
        if (cleaned.length <= 10) {
            setPhone(cleaned);
        }
    };

    const onSubmit = async () => {
        if (!phone || phone.length !== 10) {
            dispatch(authAction.errorAuth('Please enter a valid 10-digit mobile number'));
            return;
        }

        dispatch(authAction.loadigData(true));
        dispatch(authAction.errorAuth(''));

        try {
            const result = await login(phone);
            dispatch(authAction.loadigData(false));

            if (result?.statusCode === 200 || result?.success) {
                // Store auth data in Redux
                dispatch(authAction.fetchAuth(result.data || result));
                // Navigate to OTP screen
                navigate('/verify-otp', { state: { phone } });
            } else {
                dispatch(authAction.errorAuth(result?.message || result?.error || 'Login failed'));
            }

        } catch (error: unknown) {
            dispatch(authAction.loadigData(false));
            const err = error as { message?: string; error?: string };
            const errorMessage = err?.message || err?.error || 'Network error';
            dispatch(authAction.errorAuth(errorMessage));
        }
    };

    return (
        <div className="auth-container">
            <div className="brand-section">
                <h1>Apna Farmer</h1>
                <p>किसानों की डिजिटल दुनिया</p>
            </div>

            <div className="bottom-sheet">
                <div className="login-header">
                    <h2>Welcome Back!</h2>
                    <img
                        src={images.App}
                        alt="Apna Farmer Logo"
                        className="login-logo"
                    />
                </div>

                <div className="form-container">
                    <CustomTextInput
                        title="Mobile Number"
                        placeholder="Enter 10-digit mobile number"
                        onChange={onPhoneChange}
                        value={phone}
                        maxLength={10}
                        inputMode="numeric"
                        leftIcon={<Phone size={20} color="#00590D" />}
                        error={!!authError}
                        errorMsg={authError}
                    />

                    <div className="terms-container">
                        <p className="terms-text">
                            By continuing, you agree to our{' '}
                            <a href="#" className="terms-link">Terms & Conditions</a> and{' '}
                            <a href="#" className="terms-link">Privacy Policy</a>
                        </p>
                    </div>

                    <CustomButton
                        title="Get OTP"
                        onPress={onSubmit}
                        isLoading={isloading}
                        icon={<ArrowRight size={20} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
