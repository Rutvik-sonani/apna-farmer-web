import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Edit, Mail, Building2, Store } from 'lucide-react';
import { images } from '../../utils/images';
import type { RootState } from '../../redux/store';
import RequirementsList from '../../components/RequirementsList/RequirementsList';
import { fetchUserDetails } from '../../services/userService';
import LoadingSpinner from '../../components/LoadingSpinner';

// Interface matching the API structure from mobile app
interface UserProfileData {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    whatsappNumber?: string;
    email?: string;
    avatar?: string;
    avatarUrl?: string;
    gender?: string;
    userType?: 'FARMER' | 'BUYER' | 'AGROSHOP' | 'FPO';
    address?: string;
    village?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
    farmers?: {
        cropCategories?: Array<{ name: string }>;
        cropNames?: Array<{ name: string }>;
        totalFarmArea?: number;
        farmSize?: string;
        typeFarming?: string;
    };
    buyer?: {
        company?: {
            name?: string;
            businessType?: string;
            businessSize?: string;
        };
        cropNames?: Array<{ name: string }>;
        cropCategories?: Array<{ name: string }>;
    };
    agroshops?: {
        shop?: {
            name?: string;
            businessType?: string;
        };
        aboutUs?: string;
    };
}

const Profile = () => {
    const navigate = useNavigate();
    const { authData } = useSelector((state: RootState) => state.auth);
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = useCallback(async () => {
        try {
            setLoading(true);
            // Get user ID from authData or localStorage
            const authDataStorage = localStorage.getItem('Auth');
            let userId = '';

            if (authData?._id) {
                userId = authData._id;
            } else if (authDataStorage) {
                try {
                    const parsed = JSON.parse(authDataStorage);
                    userId = parsed._id || parsed.userId || '';
                } catch (e) {
                    console.error('Error parsing auth data:', e);
                }
            }

            if (userId) {
                const result = await fetchUserDetails(userId);
                if (result?.success && result?.data?.user) {
                    setUserData(result.data.user);
                } else if (result?.success && result?.data) {
                    setUserData(result.data);
                }
            } else {
                // Fallback to mock data if no user ID
                const userType = localStorage.getItem('selectedRole') || authData?.userType || 'FARMER';
                const mockProfile: UserProfileData = {
                    _id: '1',
                    firstName: 'Rutvik',
                    lastName: 'Sharma',
                    mobile: '9876543210',
                    whatsappNumber: '9876543210',
                    email: 'rutvik@apnafarmer.com',
                    avatar: images.App,
                    avatarUrl: images.App,
                    gender: 'male',
                    userType: userType as 'FARMER' | 'BUYER' | 'AGROSHOP' | 'FPO',
                    address: 'Village Sector 1',
                    village: 'Village Sector 1',
                    city: 'Ahmedabad',
                    district: 'Ahmedabad',
                    state: 'Gujarat',
                    country: 'India',
                    pincode: '380001',
                    ...(userType === 'FARMER' && {
                        farmers: {
                            cropCategories: [{ name: 'Grains' }, { name: 'Vegetables' }],
                            cropNames: [{ name: 'Wheat' }, { name: 'Rice' }, { name: 'Tomatoes' }],
                            totalFarmArea: 10,
                            farmSize: 'ACRES',
                            typeFarming: 'ORGANIC'
                        }
                    }),
                    ...(userType === 'BUYER' && {
                        buyer: {
                            company: {
                                name: 'Ramesh Traders',
                                businessType: 'WHOLESALER',
                                businessSize: 'LARGE'
                            },
                            cropNames: [{ name: 'Wheat' }, { name: 'Rice' }],
                            cropCategories: [{ name: 'Grains' }]
                        }
                    }),
                    ...(userType === 'AGROSHOP' && {
                        agroshops: {
                            shop: {
                                name: 'Kisan Seva Kendra',
                                businessType: 'Seeds & Fertilizers'
                            },
                            aboutUs: 'Quality agricultural supplies and expert advice for farmers.'
                        }
                    })
                };
                setUserData(mockProfile);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    }, [authData]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    if (loading) {
        return <LoadingSpinner text="Loading profile..." />;
    }

    if (!userData) {
        return (
            <div className="profile-page container" style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No profile data available</p>
            </div>
        );
    }

    const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
    const userType = userData.userType || 'FARMER';
    const fullAddress = [
        userData.address,
        userData.village,
        userData.city,
        userData.district,
        userData.state,
        userData.country,
        userData.pincode
    ].filter(Boolean).join(', ');

    return (
        <div className="profile-page container">
            {/* Profile Header */}
            <div className="profile-header-section" style={{
                background: 'linear-gradient(135deg, var(--green), var(--splash))',
                padding: '2rem 1rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                textAlign: 'center',
                color: 'white'
            }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'white',
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: '4px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    {userData.avatar || userData.avatarUrl ? (
                        <img
                            src={userData.avatar || userData.avatarUrl}
                            alt={fullName}
                            crossOrigin="anonymous"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = images.App;
                            }}
                        />
                    ) : (
                        <User size={60} color="var(--green)" />
                    )}
                    <button
                        onClick={() => navigate('/edit-profile')}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: 'var(--green)',
                            border: '3px solid white',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                        title="Edit Profile"
                    >
                        <Edit size={18} />
                    </button>
                </div>
                <h2 style={{ margin: '0.5rem 0', fontSize: '1.75rem', fontWeight: 700 }}>
                    Hello, {fullName || 'Farmer'}
                </h2>
                <p style={{ margin: '0.25rem 0 0.5rem', fontSize: '1rem', opacity: 0.9 }}>
                    +91-{userData.mobile?.slice(-10)}
                </p>
                <div style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginTop: '0.5rem'
                }}>
                    {userType}
                </div>
            </div>

            {/* Personal Details Card */}
            <div className="profile-card" style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ margin: 0, color: 'var(--title)', fontSize: '1.25rem', fontWeight: 700 }}>
                        Personal Details
                    </h3>
                    <button
                        onClick={() => navigate('/edit-profile')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--green)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem',
                            fontWeight: 600
                        }}
                    >
                        <Edit size={18} />
                        Edit
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Phone size={20} color="var(--green)" />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                Mobile
                            </div>
                            <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                {userData.mobile}
                            </div>
                        </div>
                    </div>

                    {userData.whatsappNumber && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Phone size={20} color="var(--green)" />
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    WhatsApp
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                    {userData.whatsappNumber}
                                </div>
                            </div>
                        </div>
                    )}

                    {userData.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail size={20} color="var(--green)" />
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    Email
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                    {userData.email}
                                </div>
                            </div>
                        </div>
                    )}

                    {fullAddress && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <MapPin size={20} color="var(--green)" style={{ marginTop: '2px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    Address
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600, lineHeight: '1.5' }}>
                                    {fullAddress}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Role-Specific Information */}
            {userType === 'FARMER' && userData.farmers && (
                <div className="profile-card" style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--title)', fontSize: '1.25rem', fontWeight: 700 }}>
                        <User size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        Farmer Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {userData.farmers.totalFarmArea && (
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    Farm Area
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                    {userData.farmers.totalFarmArea} {userData.farmers.farmSize || 'ACRES'}
                                </div>
                            </div>
                        )}
                        {userData.farmers.typeFarming && (
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    Farming Type
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                    {userData.farmers.typeFarming}
                                </div>
                            </div>
                        )}
                        {userData.farmers.cropNames && userData.farmers.cropNames.length > 0 && (
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.5rem' }}>
                                    Crops
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {userData.farmers.cropNames.map((crop, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                background: 'var(--light-green)',
                                                color: 'var(--green)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '20px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {crop.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {userType === 'BUYER' && userData.buyer && (
                <>
                    <div className="profile-card" style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <h3 style={{ margin: 0, color: 'var(--title)', fontSize: '1.25rem', fontWeight: 700 }}>
                                <Building2 size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                Company Information
                            </h3>
                            <button
                                onClick={() => navigate('/edit-profile')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--green)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.95rem',
                                    fontWeight: 600
                                }}
                            >
                                <Edit size={18} />
                                Edit
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {userData.buyer.company?.name && (
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                        Company Name
                                    </div>
                                    <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                        {userData.buyer.company.name}
                                    </div>
                                </div>
                            )}
                            {userData.buyer.company?.businessType && (
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                        Business Type
                                    </div>
                                    <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                        {userData.buyer.company.businessType}
                                    </div>
                                </div>
                            )}
                            {userData.buyer.cropNames && userData.buyer.cropNames.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.5rem' }}>
                                        Crops of Interest
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {userData.buyer.cropNames.map((crop, idx) => (
                                            <span
                                                key={idx}
                                                style={{
                                                    background: 'var(--light-green)',
                                                    color: 'var(--green)',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {crop.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Requirements List for Buyer */}
                    <RequirementsList userId={userData._id} />
                </>
            )}

            {userType === 'AGROSHOP' && userData.agroshops && (
                <div className="profile-card" style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--title)', fontSize: '1.25rem', fontWeight: 700 }}>
                        <Store size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        Shop Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {userData.agroshops.shop?.name && (
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    Shop Name
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                    {userData.agroshops.shop.name}
                                </div>
                            </div>
                        )}
                        {userData.agroshops.shop?.businessType && (
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    Business Type
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', fontWeight: 600 }}>
                                    {userData.agroshops.shop.businessType}
                                </div>
                            </div>
                        )}
                        {userData.agroshops.aboutUs && (
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--subtitle)', marginBottom: '0.25rem' }}>
                                    About Us
                                </div>
                                <div style={{ fontSize: '1rem', color: 'var(--title)', lineHeight: '1.5' }}>
                                    {userData.agroshops.aboutUs}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
