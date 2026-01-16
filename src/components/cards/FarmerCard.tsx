import { MapPin, Phone, Heart, Eye, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { images } from '../../utils/images';
import { getProxiedUrl } from '../../utils/urlUtils';
import './cards.css';

interface FarmerCardProps {
    item: {
        _id: string;
        cropNames?: Array<{ name: string }>;
        quality?: string;
        qut?: number;
        qutAvailable?: string;
        rate?: number;
        rateType?: string;
        description?: string;
        imagesUrl?: string[];
        images?: string[];
        user?: {
            _id?: string;
            firstName?: string;
            lastName?: string;
            mobile?: string;
            avatar?: string;
            avatarUrl?: string;
            city?: string;
            district?: string;
            state?: string;
            country?: string;
        };
        location?: string | {
            coordinates?: number[];
        };
        createdAt?: string;
        isFavorite?: boolean;
    };
    onLike?: (id: string) => void;
    onClick?: () => void;
}

const FarmerCard = ({ item, onLike, onClick }: FarmerCardProps) => {
    const [isFavorited, setIsFavorited] = useState(item.isFavorite || false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorited(!isFavorited);
        onLike?.(item._id);
    };

    const handleCall = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (item.user?.mobile) {
            window.location.href = `tel:${item.user.mobile}`;
        }
    };

    const handleWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (item.user?.mobile) {
            const message = encodeURIComponent('Hi! I am interested in your crop.');
            window.open(`https://wa.me/91${item.user.mobile}?text=${message}`, '_blank');
        }
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: item.cropNames?.[0]?.name || 'Crop',
                text: `Check out ${item.cropNames?.[0]?.name} on Apna Farmer`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const cropName = item.cropNames?.[0]?.name || 'Crop';
    const farmerName = `${item.user?.firstName || ''} ${item.user?.lastName || ''}`.trim() || 'Farmer';
    const location = [item.user?.city, item.user?.district, item.user?.state].filter(Boolean).join(', ') || 'Location';
    const image = item.imagesUrl?.[0] || item.images?.[0] || item.user?.avatarUrl || item.user?.avatar || images.App;

    // Calculate price per kg for display
    const calculatePricePerKg = () => {
        if (!item.rate || !item.rateType) return '';
        const rateType = item.rateType.toLowerCase();
        if (rateType === 'ton') {
            return ` (1 Kg = Rs. ${(item.rate / 1000).toFixed(2)})`;
        } else if (rateType === 'quintal' || rateType === 'quental') {
            return ` (1 Kg = Rs. ${(item.rate / 100).toFixed(2)})`;
        }
        return '';
    };

    return (
        <div className="farmer-card" onClick={onClick}>
            <div className="card-image-wrapper">
                <img
                    src={getProxiedUrl(image)}
                    alt={cropName}
                    className="card-image"
                    crossOrigin="anonymous"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = images.App;
                    }}
                />
                <button
                    className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                    onClick={handleLike}
                    aria-label="Add to favorites"
                >
                    <Heart size={20} fill={isFavorited ? '#ff4d4d' : 'none'} color={isFavorited ? '#ff4d4d' : 'white'} />
                </button>
                {item.quality && (
                    <div className="quality-badge">{item.quality}</div>
                )}
            </div>

            <div className="card-body">
                <h4 className="card-title">{cropName}</h4>

                <div className="price-info">
                    <span className="price">₹{item.rate || 0}/{item.rateType || 'KG'}{calculatePricePerKg()}</span>
                    <span className="quantity">{item.qut || 0} {item.qutAvailable || 'KG'}</span>
                </div>

                {item.description && (
                    <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--subtitle)',
                        margin: '0.5rem 0',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {item.description}
                    </p>
                )}

                <div className="farmer-info">
                    <div className="farmer-name">👨‍🌾 {farmerName}</div>
                    <div className="location">
                        <MapPin size={14} />
                        <span>{location}</span>
                    </div>
                </div>

                <div className="card-actions">
                    <button className="btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
                        <Eye size={16} />
                        View Details
                    </button>
                    {item.user?.mobile && (
                        <>
                            <button className="btn-primary btn-sm" onClick={handleWhatsApp} title="WhatsApp">
                                <MessageCircle size={16} />
                            </button>
                            <button className="btn-primary btn-sm" onClick={handleCall} title="Call">
                                <Phone size={16} />
                            </button>
                            <button className="btn-secondary btn-sm" onClick={handleShare} title="Share">
                                <Share2 size={16} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerCard;
