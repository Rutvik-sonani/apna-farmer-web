import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Upload, CheckSquare, Square } from 'lucide-react';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';

const EditBasicInfo = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSameAsMobile, setIsSameAsMobile] = useState(false);

    // Form Data matching Mobile App fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        whatsappNumber: '',
        email: '',
        gender: '', // male, female, other

        // Address Details
        address: '', // Full address
        village: '', // Village/City
        tahsil: '', // Tahsil
        district: '',
        state: '',
        country: 'India',
        pincode: '',

        // Social Media
        fbLink: '',
        instaLink: '',
        youtubeLink: '',

        profilePicture: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const genderData = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ];

    useEffect(() => {
        // Load existing profile data
        const mockProfile = {
            firstName: 'John',
            lastName: 'Doe',
            mobile: '9876543210',
            whatsappNumber: '',
            email: 'john@example.com',
            gender: 'male',
            country: 'India',
            state: 'Maharashtra',
            district: 'Nashik',
            tahsil: 'Nashik',
            village: 'Rampur',
            pincode: '422001',
            address: 'Near Main Market',
            fbLink: '',
            instaLink: '',
            youtubeLink: '',
            profilePicture: ''
        };
        setFormData(mockProfile);
    }, []);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        // Clear error when user types
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    const handleSameAsMobile = () => {
        const newValue = !isSameAsMobile;
        setIsSameAsMobile(newValue);
        if (newValue) {
            handleChange('whatsappNumber', formData.mobile);
        } else {
            handleChange('whatsappNumber', '');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('profilePicture', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        const { firstName, lastName, mobile, gender, address, village, email } = formData;

        // Strict Validation Parity with Mobile App
        if (!firstName) newErrors.firstName = 'Please enter first name';
        else if (!lastName) newErrors.lastName = 'Please enter last name';
        else if (!mobile) newErrors.mobile = 'Please enter mobile number';
        else if (!/^([+]\d{2})?\d{10}$/.test(mobile)) newErrors.mobile = 'Please Enter valid number';
        else if (!gender) newErrors.gender = 'Please Select gender';
        else if (!address) newErrors.address = 'Please enter address';
        else if (!village) newErrors.village = 'Please enter village';

        // Mobile app comment: "Please Enter email" check exists in helper but might not be strictly enforced in logic flow if Code 0 returned? 
        // Logic in profileHelper.js shows checkEmail function used separately on change.
        // But main `chekBasicInfo` doesn't strictly check email. However, let's keep basic email regex if provided.
        if (email && !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email)) {
            newErrors.email = 'Please Enter email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            console.log('Updating profile:', formData);
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-profile-page" style={{ padding: '1rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginRight: '1rem' }} />
                <h2 style={{ margin: 0 }}>Edit Profile</h2>
            </div>

            {/* Profile Picture */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: formData.profilePicture ? `url(${formData.profilePicture})` : '#f0f0f0',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {!formData.profilePicture && <User size={40} color="#999" />}
                </div>
                <label style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#00590D',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}>
                    <Upload size={16} />
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
            </div>

            {/* Basic Info */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <h4 style={{ marginTop: 0, color: '#00590D' }}>Basic Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <CustomTextInput
                        title="First Name"
                        value={formData.firstName}
                        onChange={(text) => handleChange('firstName', text)}
                        error={!!errors.firstName}
                        errorMsg={errors.firstName}
                    />
                    <CustomTextInput
                        title="Last Name"
                        value={formData.lastName}
                        onChange={(text) => handleChange('lastName', text)}
                        error={!!errors.lastName}
                        errorMsg={errors.lastName}
                    />
                </div>

                <CustomTextInput
                    title="Mobile Number"
                    value={formData.mobile}
                    onChange={(text) => handleChange('mobile', text)}
                    inputMode="numeric"
                    maxLength={10}
                    error={!!errors.mobile}
                    errorMsg={errors.mobile}
                />

                {/* WhatsApp Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', cursor: 'pointer' }} onClick={handleSameAsMobile}>
                    {isSameAsMobile ? <CheckSquare size={20} color="#00590D" /> : <Square size={20} color="#666" />}
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Is Whatapp Number Same as Mobile Number</span>
                </div>

                <CustomTextInput
                    title="What's App Number"
                    value={formData.whatsappNumber}
                    onChange={(text) => handleChange('whatsappNumber', text)}
                    inputMode="numeric"
                    maxLength={10}
                />

                <CustomTextInput
                    title="Email"
                    value={formData.email}
                    onChange={(text) => handleChange('email', text)}
                    inputMode="email"
                    error={!!errors.email}
                    errorMsg={errors.email}
                />

                {/* Gender Radio */}
                <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Gender</label>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {genderData.map((item) => (
                            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={item.value}
                                    checked={formData.gender === item.value}
                                    onChange={(e) => handleChange('gender', e.target.value)}
                                    style={{ accentColor: '#00590D' }}
                                />
                                {item.label}
                            </label>
                        ))}
                    </div>
                    {errors.gender && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.gender}</p>}
                </div>
            </div>

            {/* Address Info */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <h4 style={{ marginTop: 0, color: '#00590D' }}>My Address Details <span style={{ color: 'red' }}>*</span></h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <CustomTextInput
                        title="Village/City"
                        value={formData.village}
                        onChange={(text) => handleChange('village', text)}
                        error={!!errors.village}
                        errorMsg={errors.village}
                    />
                    <CustomTextInput
                        title="Tahsil"
                        value={formData.tahsil}
                        onChange={(text) => handleChange('tahsil', text)}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <CustomTextInput
                        title="District"
                        value={formData.district}
                        onChange={(text) => handleChange('district', text)}
                    />
                    <CustomTextInput
                        title="State"
                        value={formData.state}
                        onChange={(text) => handleChange('state', text)}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <CustomTextInput
                        title="Country"
                        value={formData.country}
                        onChange={(text) => handleChange('country', text)}
                    />
                    <CustomTextInput
                        title="Pin Code"
                        value={formData.pincode}
                        onChange={(text) => handleChange('pincode', text)}
                        inputMode="numeric"
                        maxLength={6}
                    />
                </div>
                <CustomTextInput
                    title="Address"
                    value={formData.address}
                    onChange={(text) => handleChange('address', text)}
                    error={!!errors.address}
                    errorMsg={errors.address}
                />
            </div>

            {/* Social Media */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <h4 style={{ marginTop: 0, color: '#00590D' }}>Social Media</h4>
                <CustomTextInput
                    title="Facebook Link"
                    value={formData.fbLink}
                    onChange={(text) => handleChange('fbLink', text)}
                    inputMode="url"
                />
                <CustomTextInput
                    title="Instagram Link"
                    value={formData.instaLink}
                    onChange={(text) => handleChange('instaLink', text)}
                    inputMode="url"
                />
                <CustomTextInput
                    title="YouTube Link"
                    value={formData.youtubeLink}
                    onChange={(text) => handleChange('youtubeLink', text)}
                    inputMode="url"
                />
            </div>

            <CustomButton
                title="Submit"
                onPress={handleSubmit}
                isLoading={loading}
            />
        </div>
    );
};

export default EditBasicInfo;

