import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Heart, MapPin, Star, Building2, Clock, DollarSign, ArrowLeft, Share2 } from 'lucide-react';
import { images } from '../../../utils/images';
import { getProxiedUrl } from '../../../utils/urlUtils';

// Mock data - in real app, fetch from API using the ID
// Mock data - in real app, fetch from API using the ID
interface AgroShopData {
    _id?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    whatsappNumber?: string;
    email?: string;
    avatar?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    address?: string;
    rating?: number;
    agroshops?: {
        shop?: {
            name: string;
            businessType?: string;
            businessNumber?: string;
        };
        images?: string[];
        imageUrl?: string[];
        aboutUs?: string;
        offer?: {
            discount?: string;
            discountType?: string;
        };
        operatingHours?: {
            openingTime: string;
            closingTime: string;
        };
    };
}

const mockAgroShops: Record<string, AgroShopData> = {
    '1': {
        _id: '1',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        mobile: '9876543210',
        whatsappNumber: '9876543210',
        email: 'rajesh@agroshop.com',
        avatar: images.App,
        city: 'Mandsaur',
        district: 'Mandsaur',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'Tehsil Road, Mandsaur',
        rating: 4.5,
        agroshops: {
            shop: {
                name: 'Kisan Seva Kendra',
                businessType: 'Seeds & Fertilizers',
                businessNumber: '9876543210'
            },
            images: [images.App, images.App],
            aboutUs: 'Quality agricultural supplies and expert advice for farmers. We provide certified seeds, organic fertilizers, and farming equipment.',
            offer: {
                discount: '10',
                discountType: 'PERCENTAGE'
            },
            operatingHours: {
                openingTime: '09:00',
                closingTime: '18:00'
            }
        }
    },
    '2': {
        _id: '2',
        firstName: 'Sunil',
        lastName: 'Patel',
        mobile: '9123456789',
        whatsappNumber: '9123456789',
        email: 'sunil@agroshop.com',
        avatar: images.App,
        city: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'Main Market, Indore',
        rating: 4.2,
        agroshops: {
            shop: {
                name: 'Agro World',
                businessType: 'Farming Tools & Equipment',
                businessNumber: '9123456789'
            },
            images: [images.App, images.App],
            aboutUs: 'Complete range of farming tools and equipment. We offer quality products at competitive prices.',
            offer: {
                discount: '15',
                discountType: 'PERCENTAGE'
            },
            operatingHours: {
                openingTime: '08:00',
                closingTime: '20:00'
            }
        }
    }
};

const AgroShopDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const shop = mockAgroShops[id || '1'] || mockAgroShops['1'];

    const handleCall = (phone?: string) => {
        if (!phone) return;
        window.location.href = `tel:${phone}`;
    };

    const handleWhatsApp = (phone?: string) => {
        if (!phone) return;
        const message = `Hi! I am interested in your shop ${shop.agroshops?.shop?.name}.`;
        window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shop.agroshops?.shop?.name || 'Agro Shop',
                    text: `Check out ${shop.agroshops?.shop?.name} on Apna Farmer`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
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
                        AgroShop Details
                    </h1>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
                {/* Image Slider */}
                {shop.agroshops?.images && shop.agroshops.images.length > 0 && (
                    <div style={{
                        marginBottom: '1.5rem',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        position: 'relative'
                    }}>
                        <img
                            src={getProxiedUrl(shop.agroshops.images[0])}
                            alt={shop.agroshops?.shop?.name}
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
                        {shop.rating && (
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                padding: '0.5rem 1rem',
                                borderRadius: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--title)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}>
                                <Star size={20} color="#FFD700" fill="#FFD700" />
                                {shop.rating.toFixed(1)}
                            </div>
                        )}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
                    {/* Main Content */}
                    <div>
                        {/* Shop Info Card */}
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <img
                                    src={getProxiedUrl(shop.avatar || images.App)}
                                    alt={shop.firstName}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '3px solid var(--light-green)'
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = images.App;
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h2 style={{
                                        margin: 0,
                                        fontSize: '1.75rem',
                                        color: 'var(--title)',
                                        fontWeight: 700,
                                        marginBottom: '0.25rem'
                                    }}>
                                        {shop.agroshops?.shop?.name}
                                    </h2>
                                    <p style={{
                                        margin: 0,
                                        color: 'var(--sub-title)',
                                        fontSize: '1rem'
                                    }}>
                                        {shop.agroshops?.shop?.businessType}
                                    </p>
                                </div>
                                <button
                                    onClick={handleShare}
                                    style={{
                                        background: 'var(--green)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--splash)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--green)';
                                    }}
                                >
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>

                            {/* Owner Info */}
                            <div style={{
                                padding: '1rem',
                                background: 'var(--light-green)',
                                borderRadius: '12px',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <Building2 size={18} color="var(--green)" />
                                    <span style={{ color: 'var(--green)', fontWeight: 600 }}>Owner</span>
                                </div>
                                <p style={{ margin: 0, color: 'var(--title)', fontWeight: 600 }}>
                                    {shop.firstName} {shop.lastName}
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Phone size={20} color="var(--green)" />
                                    <span style={{ color: 'var(--title)', fontWeight: 500 }}>
                                        {shop.mobile}
                                    </span>
                                </div>

                                {shop.email && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <MessageCircle size={20} color="var(--green)" />
                                        <span style={{ color: 'var(--title)', fontWeight: 500 }}>
                                            {shop.email}
                                        </span>
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <MapPin size={20} color="var(--green)" />
                                    <span style={{ color: 'var(--title)', fontWeight: 500 }}>
                                        {shop.address}, {shop.city}, {shop.district}, {shop.state}
                                    </span>
                                </div>

                                {shop.agroshops?.operatingHours && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Clock size={20} color="var(--green)" />
                                        <span style={{ color: 'var(--title)', fontWeight: 500 }}>
                                            {shop.agroshops.operatingHours.openingTime} - {shop.agroshops.operatingHours.closingTime}
                                        </span>
                                    </div>
                                )}

                                {shop.agroshops?.offer && (
                                    <div style={{
                                        padding: '1rem',
                                        background: 'linear-gradient(135deg, var(--green), var(--splash))',
                                        borderRadius: '12px',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <DollarSign size={20} />
                                        <span style={{ fontWeight: 600 }}>
                                            Special Offer: {shop.agroshops.offer.discount}% {shop.agroshops.offer.discountType}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* About Us Card */}
                        {shop.agroshops?.aboutUs && (
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                <h3 style={{
                                    color: 'var(--green)',
                                    marginBottom: '1rem',
                                    fontSize: '1.25rem',
                                    fontWeight: 700
                                }}>
                                    About Us
                                </h3>
                                <p style={{
                                    color: 'var(--title)',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {shop.agroshops.aboutUs}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => handleCall(shop.mobile)}
                                style={{
                                    flex: 1,
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
                                onClick={() => handleWhatsApp(shop.whatsappNumber || shop.mobile)}
                                style={{
                                    flex: 1,
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

                            <button
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'white',
                                    color: 'var(--green)',
                                    border: '2px solid var(--green)',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--light-green)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                }}
                            >
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar - Quick Info */}
                    <div>
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            position: 'sticky',
                            top: '100px'
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
                                {shop.rating && (
                                    <div>
                                        <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Rating</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            <Star size={18} color="#FFD700" fill="#FFD700" />
                                            <span style={{ color: 'var(--title)', fontWeight: 600 }}>
                                                {shop.rating.toFixed(1)} / 5.0
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Business Type</span>
                                    <p style={{ color: 'var(--title)', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
                                        {shop.agroshops?.shop?.businessType}
                                    </p>
                                </div>

                                <div>
                                    <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Location</span>
                                    <p style={{ color: 'var(--title)', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
                                        {shop.city}, {shop.district}, {shop.state}
                                    </p>
                                </div>

                                {shop.agroshops?.offer && (
                                    <div style={{
                                        padding: '1rem',
                                        background: 'var(--light-green)',
                                        borderRadius: '12px'
                                    }}>
                                        <span style={{ color: 'var(--sub-title)', fontSize: '0.9rem' }}>Special Offer</span>
                                        <p style={{ color: 'var(--green)', fontWeight: 700, margin: '0.25rem 0 0 0', fontSize: '1.1rem' }}>
                                            {shop.agroshops.offer.discount}% OFF
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

export default AgroShopDetails;

