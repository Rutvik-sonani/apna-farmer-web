import { MapPin, Phone, Heart, Share2, MessageCircle } from 'lucide-react';
import { images } from '../../utils/images';
import { getProxiedUrl } from '../../utils/urlUtils';
import './cards.css';

interface AgroCardProps {
    item: {
        _id: string;
        firstName?: string;
        lastName?: string;
        mobile?: string;
        whatsappNumber?: string;
        avatarUrl?: string;
        city?: string;
        district?: string;
        state?: string;
        country?: string;
        agroshops?: {
            shop?: {
                name?: string;
                businessType?: string;
                businessNumber?: string;
            };
            images?: string[];
            imageUrl?: string[];
            offer?: {
                discount?: string;
                discountType?: string;
            };
        };
        isLike?: boolean;
    };
    onClick?: () => void;
}

const AgroCard = ({ item, onClick }: AgroCardProps) => {
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
            const message = encodeURIComponent('Hi! I am interested in your shop.');
            window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
        }
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Implement favorite functionality
        console.log('Toggle favorite for shop:', item._id);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: item.agroshops?.shop?.name || 'Agro Shop',
                text: `Check out ${item.agroshops?.shop?.name} on Apna Farmer`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const shopName = item.agroshops?.shop?.name || 'Agro Shop';
    const ownerName = `${item.firstName || ''} ${item.lastName || ''}`.trim();
    const location = [item.country, item.state, item.city].filter(Boolean).join(', ') || 'Location';
    const image = item.agroshops?.images?.[0] || item.agroshops?.imageUrl?.[0] || item.avatarUrl || images.App;
    const offerText = item.agroshops?.offer?.discount
        ? `Offers - ${item.agroshops.offer.discount}%`
        : 'Offers - %';

    return (
        <div className="agro-card-web" onClick={onClick}>
            {/* Image */}
            <div className="agro-image-wrapper-web">
                <img
                    src={getProxiedUrl(image)}
                    alt={shopName}
                    className="agro-image-web"
                    crossOrigin="anonymous"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = images.App;
                    }}
                />
            </div>

            {/* Content */}
            <div className="agro-card-body-web">
                {/* Title + Follow */}
                <div className="agro-title-row">
                    <h4 className="agro-shop-name-web">{shopName}</h4>
                    <button className="agro-follow-btn">+ Follow</button>
                </div>

                {/* Owner */}
                {ownerName && (
                    <p className="agro-owner-name">Owner: {ownerName}</p>
                )}

                {/* Address */}
                <div className="agro-location-row">
                    <MapPin size={16} color="var(--green)" />
                    <span className="agro-location-text">{location}</span>
                </div>

                {/* Offers */}
                <p className="agro-offer-text">{offerText}</p>

                {/* Action Row */}
                <div className="agro-action-row">
                    <button
                        className="agro-action-btn"
                        onClick={handleWhatsApp}
                        title="WhatsApp"
                    >
                        <MessageCircle size={20} color="var(--green)" />
                    </button>
                    <button
                        className="agro-action-btn"
                        onClick={handleCall}
                        title="Call"
                    >
                        <Phone size={20} color="var(--green)" />
                    </button>
                    <button
                        className={`agro-action-btn ${item.isLike ? 'liked' : ''}`}
                        onClick={handleFavorite}
                        title="Favorite"
                    >
                        <Heart
                            size={20}
                            fill={item.isLike ? 'var(--red)' : 'none'}
                            color={item.isLike ? 'var(--red)' : 'var(--red)'}
                        />
                    </button>
                    <button
                        className="agro-action-btn"
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

export default AgroCard;
