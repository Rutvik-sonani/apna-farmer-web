import React from 'react';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';

import type { CommunityPost } from '../../../types';

interface CommunityCardProps {
    item: CommunityPost;
    type?: boolean;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ item }) => {
    return (
        <div className="community-card" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem',
            borderBottom: '1px solid #DFF0DD'
        }}>
            {/* Header: User Info */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                <img
                    src={item.userImg || "https://placehold.co/40x40?text=U"}
                    alt="User"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '0.75rem' }}
                />
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{item.userName || 'Unknown User'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'gray' }}>{item.timeAgo || 'Just now'}</div>
                </div>
                <MoreVertical size={20} color="gray" />
            </div>

            {/* Content: Text */}
            <div style={{ marginBottom: '0.75rem' }}>
                {item.description}
            </div>

            {/* Content: Media (Image) */}
            {item.media && item.media.length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                    <img
                        src={item.media[0].url || "https://placehold.co/600x400"}
                        alt="Post media"
                        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '300px' }}
                    />
                </div>
            )}

            {/* Footer: Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666', cursor: 'pointer' }}>
                    <Heart size={20} />
                    <span>{item.likeCount || 0} Likes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666', cursor: 'pointer' }}>
                    <MessageCircle size={20} />
                    <span>{item.commentCount || 0} Comments</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666', cursor: 'pointer' }}>
                    <Share2 size={20} />
                    <span>Share</span>
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;
