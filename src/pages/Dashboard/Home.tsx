import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../utils/images';
import { getProxiedUrl } from '../../utils/urlUtils';
import Modal from '../../components/Modal';
import ComingSoonModal from '../../components/ComingSoonModal';
import PostRequirement from './PostRequirement/PostRequirement';
import { fetchCropCategories, fetchRequirements } from '../../services/homeService';
import { fetchAgroShops } from '../../services/agroShopService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLanguage } from '../../hooks/useLanguage';
import { getLocalizedName, getLocalizedText } from '../../utils/localization';
import WeatherCard from '../../components/WeatherCard';

interface Category {
    id: string;
    name: string;
    image?: string;
}

interface Service {
    id: string;
    name: string;
    image?: string;
}

interface RequirementPost {
    _id: string;
    productName?: string;
    cropNames?: {
        name: string;
        hi?: string;
    };
    qut: string;
    qutType: string;
    content: string;
    approxPrice?: string;
    priceType?: string;
    user: {
        firstName: string;
        lastName: string;
        avatar?: string;
        mobile?: string;
    };
    city?: string;
    district?: string;
    state?: string;
    createdAt: string;
    mediaUrl?: string[];
    cropCategories?: {
        name: string;
        hi?: string;
    };
    cropTypes?: {
        name: string;
        hi?: string;
    };
}

interface AgroShopPost {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    avatar?: string;
    avatarUrl?: string;
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
    };
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    address?: string;
    rating?: number;
}

const Home = () => {
    const navigate = useNavigate();
    const { t, currentLanguage } = useLanguage();
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [showPostRequirementModal, setShowPostRequirementModal] = useState(false);
    const [showSellCropModal, setShowSellCropModal] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState<{ open: boolean; title: string }>({ open: false, title: '' });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [requirements, setRequirements] = useState<RequirementPost[]>([]);
    const [agroShops, setAgroShops] = useState<AgroShopPost[]>([]);
    const [ads] = useState<Array<{ id: string; image: string }>>([]);
    const [services] = useState<Service[]>([]);

    // Weather State
    const [weatherData, setWeatherData] = useState<{ temp: number; code: number } | null>(null);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{
        lat: number;
        lon: number;
        city: string;
    }>({
        lat: 26.9124, // Jaipur fallback
        lon: 75.7873,
        city: 'Jaipur, Rajasthan'
    });

    // Fetch data from APIs
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch categories
                const categoriesResult = await fetchCropCategories();
                if (categoriesResult?.success && categoriesResult?.data?.docs) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedCategories = categoriesResult.data.docs.map((cat: any) => ({
                        id: cat._id || cat.id,
                        name: getLocalizedName(cat, currentLanguage.langCode),
                        originalData: cat, // Keep original data for localization
                        image: cat.imageUrl || (cat.image ? `/api/${cat.image}` : images.App)
                    }));
                    setCategories(formattedCategories);
                }

                // Fetch requirements
                const requirementsResult = await fetchRequirements();
                if (requirementsResult?.success && requirementsResult?.data?.docs) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setRequirements(requirementsResult.data.docs as any[]);
                }

                // Fetch agro shops
                const agroShopsResult = await fetchAgroShops('?limit=4');
                if (agroShopsResult?.success && agroShopsResult?.data?.docs) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setAgroShops(agroShopsResult.data.docs as any[]);
                }
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentLanguage.langCode]); // Re-fetch when language changes

    // Get user's geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Reverse geocode to get city name
                    try {
                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                        );
                        const data = await response.json();
                        const cityName = `${data.city || data.locality || 'Your Location'}, ${data.principalSubdivision || ''}`;

                        setUserLocation({
                            lat: latitude,
                            lon: longitude,
                            city: cityName
                        });
                    } catch (error) {
                        console.error('Failed to get city name:', error);
                        setUserLocation({
                            lat: latitude,
                            lon: longitude,
                            city: 'Your Location'
                        });
                    }
                },
                () => {
                    console.log('Geolocation denied or unavailable, using default location (Jaipur)');
                    // Keep Jaipur as fallback (already set in initial state)
                }
            );
        }
    }, []);

    // Fetch weather data based on user location
    useEffect(() => {
        const loadWeather = async () => {
            try {
                setWeatherLoading(true);
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.lat}&longitude=${userLocation.lon}&current_weather=true`
                );
                const data = await response.json();
                if (data.current_weather) {
                    setWeatherData({
                        temp: data.current_weather.temperature,
                        code: data.current_weather.weathercode
                    });
                }
            } catch (error) {
                console.error("Failed to load weather", error);
            } finally {
                setWeatherLoading(false);
            }
        };
        loadWeather();
    }, [userLocation]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleCall = (mobile?: string) => {
        if (mobile) {
            window.location.href = `tel:${mobile}`;
        }
    };

    // Auto-rotate carousel
    useEffect(() => {
        if (ads && ads.length > 0) {
            const interval = setInterval(() => {
                setCurrentAdIndex((prev) => (prev + 1) % ads.length);
            }, 5000); // Change slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [ads, ads.length]);

    const nextAd = () => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    };

    const prevAd = () => {
        setCurrentAdIndex((prev) => (prev - 1 + ads.length) % ads.length);
    };

    if (loading) {
        return <LoadingSpinner text="Loading home data..." />;
    }

    return (
        <div className="home-page" style={{ padding: '1rem', paddingBottom: '100px' }}>

            {/* Weather Section */}
            <WeatherCard
                temperature={weatherData?.temp || 0}
                weatherCode={weatherData?.code || 0}
                locationName={userLocation.city}
                loading={weatherLoading}
            />

            {/* Categories Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    color: 'var(--green)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: 700
                }}>
                    {t.CATEGORY}
                </h2>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--white3) transparent'
                }} className="horizontal-scroll">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/marketplace?category=${category.name}`)}
                            style={{
                                minWidth: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem',
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <img
                                src={getProxiedUrl(category.image || images.App)}
                                alt={category.name}
                                crossOrigin="anonymous"
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
                            <span style={{
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: 'var(--title)',
                                textAlign: 'center'
                            }}>
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ads Carousel Section - Only show if ads exist */}
            {ads && ads.length > 0 && (
                <div style={{ marginBottom: '2rem', position: 'relative' }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '200px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                        {ads.map((ad, index) => (
                            <div
                                key={ad.id}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: index === currentAdIndex ? 1 : 0,
                                    transition: 'opacity 0.5s ease-in-out',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, var(--light-green), var(--bg-color))'
                                }}
                            >
                                <img
                                    src={getProxiedUrl(ad.image)}
                                    alt={`Ad ${index + 1}`}
                                    crossOrigin="anonymous"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = images.App;
                                    }}
                                />
                            </div>
                        ))}

                        {/* Carousel Controls */}
                        <button
                            onClick={prevAd}
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                zIndex: 10
                            }}
                        >
                            <ChevronLeft size={24} color="var(--green)" />
                        </button>

                        <button
                            onClick={nextAd}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                zIndex: 10
                            }}
                        >
                            <ChevronRight size={24} color="var(--green)" />
                        </button>

                        {/* Carousel Indicators */}
                        <div style={{
                            position: 'absolute',
                            bottom: '15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '8px',
                            zIndex: 10
                        }}>
                            {ads.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCurrentAdIndex(index)}
                                    style={{
                                        width: currentAdIndex === index ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: currentAdIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Additional Services Section - Only show if services exist */}
            {services && services.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                        color: 'var(--green)',
                        marginBottom: '1rem',
                        fontSize: '1.5rem',
                        fontWeight: 700
                    }}>
                        Additional Services
                    </h2>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'var(--white3) transparent'
                    }} className="horizontal-scroll">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => {
                                    if (service.name === 'Community') {
                                        navigate('/community');
                                    } else {
                                        // For other services, navigate to coming soon or appropriate page
                                        setShowComingSoon({ open: true, title: service.name });
                                    }
                                }}
                                style={{
                                    minWidth: '120px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    background: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s',
                                    flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <img
                                    src={getProxiedUrl(service.image || images.App)}
                                    alt={service.name}
                                    crossOrigin="anonymous"
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
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: 'var(--title)',
                                    textAlign: 'center'
                                }}>
                                    {service.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons Section */}
            <div style={{
                marginBottom: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                <button
                    onClick={() => setShowPostRequirementModal(true)}
                    style={{
                        background: 'linear-gradient(to top right, var(--gradient-start), var(--gradient-end))',
                        color: 'white',
                        border: 'none',
                        padding: '1.25rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 12px rgba(6, 53, 20, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(6, 53, 20, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 53, 20, 0.3)';
                    }}
                >
                    {t.POST_REQUIREMENT_BUTTON}
                </button>

                <button
                    onClick={() => setShowSellCropModal(true)}
                    style={{
                        background: 'linear-gradient(to top right, var(--gradient-start), var(--gradient-end))',
                        color: 'white',
                        border: 'none',
                        padding: '1.25rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 12px rgba(6, 53, 20, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(6, 53, 20, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 53, 20, 0.3)';
                    }}
                >
                    {t.SELL_CROP_BUTTON}
                </button>
            </div>

            {/* Buyers Requirements Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    color: 'var(--green)',
                    marginBottom: '1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 700
                }}>
                    {t.BUYERS_REQUIREMENTS}
                </h2>

                <div className="requirements-grid">
                    {requirements.map((requirement) => (
                        <div
                            key={requirement._id}
                            onClick={() => navigate(`/requirement/${requirement._id}`)}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                        >
                            {/* Image Section */}
                            {requirement.mediaUrl && requirement.mediaUrl.length > 0 && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <img
                                        src={getProxiedUrl(requirement.mediaUrl[0] || images.App)}
                                        alt={requirement.cropNames?.name || requirement.productName}
                                        crossOrigin="anonymous"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '12px'
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = images.App;
                                        }}
                                    />
                                </div>
                            )}

                            {/* Content Section */}
                            <div>
                                {/* Product/Crop Name */}
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--subtitle)',
                                        margin: '0 0 0.25rem 0'
                                    }}>
                                        {t.I_WANT_TO_BUY}
                                    </p>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: 'var(--green)',
                                        margin: 0
                                    }}>
                                        {requirement.productName || getLocalizedText(requirement.cropNames, currentLanguage.langCode)}: {requirement.qut} {requirement.qutType}
                                    </h3>
                                </div>

                                {/* Category */}
                                {requirement.cropCategories && (
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--subtitle)',
                                            fontWeight: 600
                                        }}>
                                            {t.CATEGORY}: {getLocalizedName(requirement.cropCategories, currentLanguage.langCode)}
                                        </span>
                                    </div>
                                )}

                                {/* Price */}
                                {requirement.approxPrice && (
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--title)',
                                            fontWeight: 600
                                        }}>
                                            Expected Price: ₹{requirement.approxPrice} / {requirement.priceType}
                                        </span>
                                    </div>
                                )}

                                {/* Description */}
                                {requirement.content && (
                                    <div style={{
                                        background: 'var(--bg-color)',
                                        padding: '0.875rem',
                                        borderRadius: '8px',
                                        marginBottom: '0.75rem'
                                    }}>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--title)',
                                            margin: 0,
                                            lineHeight: '1.5'
                                        }}>
                                            <strong>Description:</strong> {requirement.content}
                                        </p>
                                    </div>
                                )}

                                {/* User Info */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '0.75rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid var(--white3)'
                                }}>
                                    <img
                                        src={getProxiedUrl(requirement.user.avatar || images.App)}
                                        alt={`${requirement.user.firstName} ${requirement.user.lastName}`}
                                        crossOrigin="anonymous"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid var(--light-green)'
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = images.App;
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <p style={{
                                            fontSize: '0.95rem',
                                            fontWeight: 700,
                                            color: 'var(--blue)',
                                            margin: 0
                                        }}>
                                            {requirement.user.firstName} {requirement.user.lastName}
                                        </p>
                                        {requirement.city && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                marginTop: '0.25rem'
                                            }}>
                                                <MapPin size={14} color="var(--subtitle)" />
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    color: 'var(--subtitle)'
                                                }}>
                                                    {requirement.city}, {requirement.district}, {requirement.state}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--subtitle)',
                                        background: 'var(--light-green)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontWeight: 600
                                    }}>
                                        {t.I_WANT_TO_BUY}
                                    </span>
                                </div>

                                {/* Posted Date */}
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--subtitle)'
                                    }}>
                                        <strong>Posted:</strong> {formatDate(requirement.createdAt)}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid var(--white3)',
                                    marginTop: 'auto'
                                }}>
                                    <button
                                        onClick={() => handleCall(requirement.user.mobile)}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'linear-gradient(to top right, var(--gradient-start), var(--gradient-end))',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '0.9';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <Phone size={18} />
                                        {t.CALL}
                                    </button>
                                    <button
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'linear-gradient(to top right, var(--gradient-start), var(--gradient-end))',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '0.9';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <MessageCircle size={18} />
                                        {t.MESSAGE}
                                    </button>
                                    <button
                                        style={{
                                            padding: '0.75rem',
                                            background: 'transparent',
                                            color: 'var(--red)',
                                            border: '1px solid var(--red)',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--lightred)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Near By AgroShop Section */}
            <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                <h2 style={{
                    color: 'var(--green)',
                    marginBottom: '1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 700
                }}>
                    {t.NEAR_BY_AGROSHOP}
                </h2>

                <div className="requirements-grid">
                    {agroShops.map((shop) => (
                        <div
                            key={shop._id}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            onClick={() => navigate(`/agroshop/${shop._id}`)}
                        >
                            {/* Image Section */}
                            {(shop.agroshops?.images && shop.agroshops.images.length > 0) || shop.agroshops?.imageUrl ? (
                                <div style={{ marginBottom: '1rem', position: 'relative' }}>
                                    <img
                                        src={getProxiedUrl(shop.agroshops?.images?.[0] || shop.agroshops?.imageUrl?.[0] || shop.avatarUrl || shop.avatar || images.App)}
                                        alt={shop.agroshops?.shop?.name || 'Agro Shop'}
                                        crossOrigin="anonymous"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '12px'
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = images.App;
                                        }}
                                    />
                                    {shop.rating && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '0.375rem 0.625rem',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            color: 'var(--title)'
                                        }}>
                                            <span style={{ color: '#FFD700' }}>★</span>
                                            {shop.rating.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            ) : null}

                            {/* Content Section */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                {/* Shop Name */}
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: 'var(--green)',
                                        margin: '0 0 0.5rem 0'
                                    }}>
                                        {shop.agroshops?.shop?.name || 'Agro Shop'}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--subtitle)',
                                        margin: 0
                                    }}>
                                        Owner: {shop.firstName} {shop.lastName}
                                    </p>
                                </div>

                                {/* Business Type */}
                                {shop.agroshops?.shop?.businessType && (
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--title)',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{ color: 'var(--green)' }}>🛒</span>
                                            {shop.agroshops.shop.businessType}
                                        </span>
                                    </div>
                                )}

                                {/* Location */}
                                {(shop.city || shop.district || shop.state) && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.75rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--subtitle)'
                                    }}>
                                        <MapPin size={16} color="var(--subtitle)" />
                                        <span>
                                            {[shop.city, shop.district, shop.state].filter(Boolean).join(', ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={showPostRequirementModal}
                onClose={() => setShowPostRequirementModal(false)}
                title={t.POST_REQUIREMENT_TITLE || 'Post Requirement'}
            >
                <PostRequirement
                    onClose={() => {
                        setShowPostRequirementModal(false);
                        // Refresh logic if needed
                    }}
                />
            </Modal>

            <Modal
                isOpen={showSellCropModal}
                onClose={() => setShowSellCropModal(false)}
                title={t.SELL_CROP_TITLE || 'Sell Crop'}
            >
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <p>{t.COMING_SOON || 'Coming Soon'}</p>
                </div>
            </Modal>
            {/* Coming Soon Modal */}
            <ComingSoonModal
                isOpen={showComingSoon.open}
                onClose={() => setShowComingSoon({ open: false, title: '' })}
                title={`${showComingSoon.title} Coming Soon`}
                message={`We are working hard to bring ${showComingSoon.title} feature to you. Stay tuned!`}
            />
        </div>
    );
};

export default Home;
