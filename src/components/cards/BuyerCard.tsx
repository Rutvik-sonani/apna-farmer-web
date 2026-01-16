import { MapPin, Phone, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { images } from '../../utils/images';
import './cards.css';

interface BuyerCardProps {
    item: {
        _id: string;
        firstName?: string;
        lastName?: string;
        mobile?: string;
        whatsappNumber?: string;
        avatar?: string;
        city?: string;
        district?: string;
        state?: string;
        country?: string;
        buyer?: {
            company?: {
                name?: string;
                businessType?: string;
                businessSize?: string;
                businessNumber?: string;
            };
            cropNames?: Array<{ name: string }>;
            cropCategories?: Array<{ name: string }>;
            remark?: string;
        };
        isLike?: boolean;
    };
    onLike?: (id: string) => void;
    onClick?: () => void;
}

const BuyerCard = ({ item, onLike, onClick }: BuyerCardProps) => {
    const [isFavorited, setIsFavorited] = useState(item.isLike || false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorited(!isFavorited);
        onLike?.(item._id);
    };

    const handleCall = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (item.mobile) {
            window.location.href = `tel:${item.mobile}`;
        }
    };

    const handleWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        const phone = item.whatsappNumber || item.mobile;
        if (phone) {
            const message = encodeURIComponent('Hi! I am interested.');
            window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
        }
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: item.buyer?.company?.name || 'Buyer',
                text: `Check out ${item.buyer?.company?.name} on Apna Farmer`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const buyerName = item.buyer?.company?.name ||
        `${item.firstName || ''} ${item.lastName || ''}`.trim() ||
        'Buyer';
    const ownerName = item.buyer?.company?.name ? `${item.firstName} ${item.lastName}` : '';
    const location = [item.city, item.district, item.state, item.country].filter(Boolean).join(', ') || 'Location';
    const cropNames = item.buyer?.cropNames?.map(c => c.name).join(', ') || 'Various crops';
    const businessType = item.buyer?.company?.businessType || '';
    const avatar = item.avatar || images.App;

    return (
        <div className="buyer-card-web" onClick={onClick}>
            {/* Left Image */}
            <div className="buyer-image-wrapper-web">
                <img
                    src={avatar}
                    alt={buyerName}
                    className="buyer-image-web"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = images.App;
                    }}
                />
            </div>

            {/* Right Content */}
            <div className="buyer-card-body-web">
                {/* Name Row */}
                <div className="buyer-title-row">
                    <h4 className="buyer-name-web">{buyerName}</h4>
                </div>

                {/* Owner Name */}
                {ownerName && (
                    <p className="buyer-owner-name">{ownerName}</p>
                )}

                {/* Location */}
                <div className="buyer-location-row">
                    <MapPin size={16} color="var(--green)" />
                    <span className="buyer-location-text">{location}</span>
                </div>

                {/* Business Type */}
                {businessType && (
                    <p className="buyer-business-type">{businessType}</p>
                )}

                {/* Deals In */}
                {cropNames && (
                    <p className="buyer-crops-text">Deals In: {cropNames}</p>
                )}

                {/* Action Row */}
                <div className="buyer-action-row">
                    <button
                        className="buyer-action-btn"
                        onClick={handleWhatsApp}
                        title="WhatsApp"
                    >
                        <MessageCircle size={20} color="var(--green)" />
                    </button>
                    <button
                        className="buyer-action-btn"
                        onClick={handleCall}
                        title="Call"
                    >
                        <Phone size={20} color="var(--green)" />
                    </button>
                    <button
                        className={`buyer-action-btn ${isFavorited ? 'liked' : ''}`}
                        onClick={handleLike}
                        title="Favorite"
                    >
                        <Heart
                            size={20}
                            fill={isFavorited ? 'var(--red)' : 'none'}
                            color={isFavorited ? 'var(--red)' : 'var(--red)'}
                        />
                    </button>
                    <button
                        className="buyer-action-btn"
                        onClick={handleShare}
                        title="Share"
                    >
                        <Share2 size={20} color="var(--blue)" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyerCard;
