import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Calendar, Package, DollarSign, FileText, ArrowLeft } from 'lucide-react';
import { images } from '../../../utils/images';
import { useLanguage } from '../../../hooks/useLanguage';
import { getLocalizedName, getLocalizedText } from '../../../utils/localization';
import './RequirementDetails.css';

// Mock data - in real app, fetch from API using the ID
interface RequirementData {
    _id: string;
    productName: string;
    cropNames?: { name: string };
    qut: string;
    qutType: string;
    content: string;
    approxPrice: string;
    priceType: string;
    quality: string;
    user: {
        firstName: string;
        lastName: string;
        avatar: string;
        mobile: string;
        address: string;
    };
    city: string;
    district: string;
    state: string;
    createdAt: string;
    mediaUrl: string[];
    cropCategories?: { name: string };
    cropTypes?: { name: string };
}

const mockRequirements: Record<string, RequirementData> = {
    '1': {
        _id: '1',
        productName: '',
        cropNames: { name: 'Wheat' },
        qut: '500',
        qutType: 'Quintal',
        content: 'Looking for high-quality wheat with good moisture content. Must be fresh and properly stored.',
        approxPrice: '2500',
        priceType: 'Per Quintal',
        quality: 'Grade A',
        user: {
            firstName: 'Rajesh',
            lastName: 'Kumar',
            avatar: images.App,
            mobile: '9876543210',
            address: 'Tehsil Road, Mandsaur, Madhya Pradesh'
        },
        city: 'Mandsaur',
        district: 'Mandsaur',
        state: 'Madhya Pradesh',
        createdAt: '2024-01-15T10:30:00Z',
        mediaUrl: [images.App],
        cropCategories: { name: 'Grains' }
    },
    '2': {
        _id: '2',
        productName: '',
        cropNames: { name: 'Tomato' },
        qut: '100',
        qutType: 'Kg',
        content: 'Need fresh tomatoes for processing. Quality should be good.',
        approxPrice: '40',
        priceType: 'Per Kg',
        quality: 'Grade A',
        user: {
            firstName: 'Priya',
            lastName: 'Sharma',
            avatar: images.App,
            mobile: '9123456789',
            address: 'Main Market, Indore, Madhya Pradesh'
        },
        city: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        createdAt: '2024-01-14T14:20:00Z',
        mediaUrl: [images.App],
        cropCategories: { name: 'Vegetables' }
    }
};

const RequirementDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t, currentLanguage } = useLanguage();
    const requirement = mockRequirements[id || '1'] || mockRequirements['1'];

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleWhatsApp = (phone: string) => {
        const message = `Hi! I am interested in your requirement for ${requirement.cropNames?.name || requirement.productName}.`;
        window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '0.75rem 1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.25rem',
                            borderRadius: '4px',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--light-green)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                        }}
                    >
                        <ArrowLeft size={20} color="var(--green)" />
                    </button>
                    <h1 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--green)', fontWeight: 600 }}>
                        Requirement Details
                    </h1>
                </div>
            </div>

            <div className="details-container">
                {/* Image Slider */}
                {requirement.mediaUrl && requirement.mediaUrl.length > 0 && (
                    <div style={{
                        marginBottom: '1.5rem',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <img
                            src={requirement.mediaUrl[0]}
                            alt={requirement.cropNames?.name || requirement.productName}
                            crossOrigin="anonymous"
                            style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = images.App;
                            }}
                        />
                    </div>
                )}

                <div className="details-grid-container">
                    {/* Main Content */}
                    <div>
                        {/* Requirement Details Card */}
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <h2 style={{
                                color: 'var(--green)',
                                marginBottom: '1.5rem',
                                fontSize: '1.5rem',
                                fontWeight: 700
                            }}>
                                Requirement Details
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {requirement.cropCategories && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Package size={20} color="var(--green)" />
                                        <div>
                                            <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>{t.CATEGORY}: </span>
                                            <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                                {getLocalizedName(requirement.cropCategories, currentLanguage.langCode)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {requirement.cropTypes && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Package size={20} color="var(--green)" />
                                        <div>
                                            <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>{t.TYPE}: </span>
                                            <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                                {getLocalizedName(requirement.cropTypes, currentLanguage.langCode)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {requirement.cropNames && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Package size={20} color="var(--green)" />
                                        <div>
                                            <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>{t.CROP_NAME}: </span>
                                            <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                                {getLocalizedText(requirement.cropNames, currentLanguage.langCode)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Package size={20} color="var(--green)" />
                                    <div>
                                        <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Quantity: </span>
                                        <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                            {requirement.qut} {requirement.qutType}
                                        </span>
                                    </div>
                                </div>

                                {requirement.approxPrice && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <DollarSign size={20} color="var(--green)" />
                                        <div>
                                            <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Expected Price: </span>
                                            <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                                ₹{requirement.approxPrice} / {requirement.priceType}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {requirement.quality && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <FileText size={20} color="var(--green)" />
                                        <div>
                                            <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Quality: </span>
                                            <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                                {requirement.quality}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Calendar size={20} color="var(--green)" />
                                    <div>
                                        <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Posted On: </span>
                                        <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                            {formatDate(requirement.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {requirement.content && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: 'var(--light-green)',
                                        borderRadius: '12px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <FileText size={20} color="var(--green)" />
                                            <span style={{ color: 'var(--green)', fontWeight: 600 }}>Description</span>
                                        </div>
                                        <p style={{ color: 'var(--title)', lineHeight: '1.6', margin: 0 }}>
                                            {requirement.content}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Details Card */}
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <h2 style={{
                                color: 'var(--green)',
                                marginBottom: '1.5rem',
                                fontSize: '1.5rem',
                                fontWeight: 700
                            }}>
                                Contact Information
                            </h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <img
                                    src={requirement.user.avatar || images.App}
                                    alt={requirement.user.firstName}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid var(--light-green)'
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = images.App;
                                    }}
                                />
                                <div>
                                    <h3 style={{ margin: 0, color: 'var(--title)', fontWeight: 600 }}>
                                        {requirement.user.firstName} {requirement.user.lastName}
                                    </h3>
                                    {requirement.user.address && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            <MapPin size={14} color="var(--sub-title)" />
                                            <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>
                                                {requirement.user.address}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => handleCall(requirement.user.mobile)}
                                    style={{
                                        flex: 1,
                                        minWidth: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1rem',
                                        background: 'var(--green)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--splash)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--green)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Phone size={20} />
                                    Call
                                </button>

                                <button
                                    onClick={() => handleWhatsApp(requirement.user.mobile)}
                                    style={{
                                        flex: 1,
                                        minWidth: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1rem',
                                        background: '#25D366',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#128C7E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#25D366';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <MessageCircle size={20} />
                                    WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Quick Info */}
                    <div>
                        <div className="details-sidebar-sticky" style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <h3 style={{
                                color: 'var(--green)',
                                marginBottom: '1rem',
                                fontSize: '1.25rem',
                                fontWeight: 700
                            }}>
                                Quick Info
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Location</span>
                                    <p style={{ color: 'var(--title)', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
                                        {requirement.city}, {requirement.district}, {requirement.state}
                                    </p>
                                </div>

                                <div>
                                    <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Quantity Required</span>
                                    <p style={{ color: 'var(--title)', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
                                        {requirement.qut} {requirement.qutType}
                                    </p>
                                </div>

                                {requirement.approxPrice && (
                                    <div>
                                        <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Expected Price</span>
                                        <p style={{ color: 'var(--title)', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
                                            ₹{requirement.approxPrice} / {requirement.priceType}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequirementDetails;
