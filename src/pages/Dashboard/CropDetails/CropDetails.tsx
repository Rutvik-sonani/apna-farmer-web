import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Heart, MapPin, Calendar, Package } from 'lucide-react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { getProxiedUrl } from '../../../utils/urlUtils';
import type { Crop } from '../../../types';

interface CropDetailsData extends Crop {
    harvestDate?: string;
    isOrganic?: boolean;
    createdAt?: string;
    state?: string; // Explicitly add state if missing in Crop
    imagesUrl?: string[]; // Ensure this is present
}

const CropDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crop, setCrop] = useState<CropDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchCropDetails = useCallback(async () => {
        try {
            setLoading(true);
            // Mock data for now
            const mockCrop: CropDetailsData = {
                _id: id || '',
                cropNames: [{ name: 'Fresh Tomatoes' }],
                qut: 500,
                qutAvailable: 'KG',
                rate: 20,
                rateType: 'KG',
                quality: 'Grade A',
                description: 'Fresh organic tomatoes harvested yesterday. Perfect for retail and wholesale.',
                harvestDate: '2024-12-20',
                isOrganic: true,
                user: {
                    firstName: 'Ram',
                    lastName: 'Lal',
                    mobile: '9876543210',
                    address: 'Village Rampur, Nashik'
                },
                city: 'Nashik',
                district: 'Nashik',
                state: 'Maharashtra',
                imagesUrl: [
                    'https://placehold.co/600x400?text=Tomatoes+1',
                    'https://placehold.co/600x400?text=Tomatoes+2',
                    'https://placehold.co/600x400?text=Tomatoes+3'
                ],
                createdAt: '2024-12-22'
            };
            // Real API: const response = await api.get(`${endPoints.SELL_CROP}/${id}`);
            setCrop(mockCrop);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCropDetails();
    }, [fetchCropDetails]);

    const handleCall = () => {
        if (crop?.user?.mobile) {
            window.location.href = `tel:${crop.user.mobile}`;
        }
    };

    const handleWhatsApp = () => {
        if (crop?.user?.mobile) {
            const message = `Hi, I'm interested in your ${crop.cropNames?.[0]?.name} listing`;
            window.open(`https://wa.me/91${crop.user.mobile}?text=${encodeURIComponent(message)}`, '_blank');
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Call API to add/remove favorite
    };

    if (loading) {
        return <LoadingSpinner fullScreen text="Loading crop details..." />;
    }

    if (!crop) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Crop not found</div>;
    }

    const farmerName = `${crop.user?.firstName || ''} ${crop.user?.lastName || ''}`.trim();
    const location = [crop.city, crop.district, crop.state].filter(Boolean).join(', ');
    const images = crop.imagesUrl || [];

    return (
        <div className="crop-details-page" style={{ paddingBottom: '80px' }}>
            {/* Header */}
            <div style={{
                position: 'sticky',
                top: 0,
                background: 'white',
                zIndex: 10,
                padding: '1rem',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginRight: '1rem' }} />
                    <h3 style={{ margin: 0 }}>Crop Details</h3>
                </div>
                <button
                    onClick={toggleFavorite}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <Heart size={24} fill={isFavorite ? '#ff4d4d' : 'none'} color={isFavorite ? '#ff4d4d' : '#666'} />
                </button>
            </div>

            {/* Image Gallery */}
            <div style={{ position: 'relative', background: '#000' }}>
                <img
                    src={getProxiedUrl(images[currentImageIndex] || '')}
                    alt={crop.cropNames?.[0]?.name}
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                />
                {images.length > 1 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '1rem',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}>
                        {images.map((_, index: number) => (
                            <div
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                style={{
                                    width: currentImageIndex === index ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: currentImageIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '1rem' }}>
                {/* Title & Price */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111' }}>{crop.cropNames?.[0]?.name}</h2>
                        {crop.quality && (
                            <span style={{
                                background: '#DFF0DD',
                                color: '#00590D',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                fontWeight: 600
                            }}>
                                {crop.quality}
                            </span>
                        )}
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#00590D', marginBottom: '0.5rem' }}>
                        ₹{crop.rate}/{crop.rateType}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Available: {crop.qut} {crop.qutAvailable}
                    </div>
                </div>

                {/* Details Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>HARVEST DATE</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={16} color="#666" />
                            <span>{crop.harvestDate ? new Date(crop.harvestDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>TYPE</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Package size={16} color="#666" />
                            <span>{crop.isOrganic ? 'Organic' : 'Conventional'}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {crop.description && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>Description</h4>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>{crop.description}</p>
                    </div>
                )}

                {/* Seller Info */}
                <div style={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{ marginBottom: '0.75rem' }}>Seller Information</h4>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <strong>👨‍🌾 {farmerName}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.9rem' }}>
                        <MapPin size={14} />
                        <span>{location}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'white',
                borderTop: '1px solid #e0e0e0',
                padding: '1rem',
                display: 'flex',
                gap: '12px',
                zIndex: 100
            }}>
                <button
                    onClick={handleWhatsApp}
                    style={{
                        flex: 1,
                        background: '#25D366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <MessageCircle size={20} />
                    WhatsApp
                </button>
                <button
                    onClick={handleCall}
                    style={{
                        flex: 1,
                        background: '#00590D',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <Phone size={20} />
                    Call Now
                </button>
            </div>
        </div>
    );
};

export default CropDetails;
