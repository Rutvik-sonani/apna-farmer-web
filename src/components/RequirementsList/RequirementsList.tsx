import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart, MapPin } from 'lucide-react';
import { images } from '../../utils/images';
import { getProxiedUrl } from '../../utils/urlUtils';
import LoadingSpinner from '../LoadingSpinner';
import EmptyState from '../EmptyState';
import { useLanguage } from '../../hooks/useLanguage';
import { getLocalizedText } from '../../utils/localization';

interface Requirement {
    _id: string;
    cropNames?: { name: string };
    productName?: string;
    qut?: string;
    qutType?: string;
    approxPrice?: string;
    priceType?: string;
    content?: string;
    user?: {
        firstName: string;
        lastName: string;
        avatar?: string;
        mobile?: string;
    };
    city?: string;
    state?: string;
    mediaUrl?: string[];
    createdAt?: string;
}

interface RequirementsListProps {
    userId?: string;
}

const RequirementsList = ({ userId }: RequirementsListProps) => {
    const { currentLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [loading, setLoading] = useState(false);
    const [likeMap, setLikeMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchRequirements();
    }, [userId]);

    const fetchRequirements = async () => {
        try {
            setLoading(true);
            // Mock data - in real app, fetch from API
            const mockRequirements: Requirement[] = [
                {
                    _id: '1',
                    cropNames: { name: 'Wheat' },
                    qut: '500',
                    qutType: 'Quintal',
                    approxPrice: '2500',
                    priceType: 'Per Quintal',
                    content: 'Looking for high-quality wheat with good moisture content.',
                    user: {
                        firstName: 'Rutvik',
                        lastName: 'Sharma',
                        avatar: images.App,
                        mobile: '9876543210'
                    },
                    city: 'Ahmedabad',
                    state: 'Gujarat',
                    mediaUrl: [images.App],
                    createdAt: '2024-01-15T10:30:00Z'
                },
                {
                    _id: '2',
                    cropNames: { name: 'Rice' },
                    qut: '100',
                    qutType: 'Kg',
                    approxPrice: '50',
                    priceType: 'Per Kg',
                    content: 'Need premium quality Basmati rice for export.',
                    user: {
                        firstName: 'Rutvik',
                        lastName: 'Sharma',
                        avatar: images.App,
                        mobile: '9876543210'
                    },
                    city: 'Ahmedabad',
                    state: 'Gujarat',
                    mediaUrl: [images.App],
                    createdAt: '2024-01-14T14:20:00Z'
                }
            ];
            setRequirements(mockRequirements);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleLike = (id: string) => {
        setLikeMap(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddNew = () => {
        navigate('/post-requirement');
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '1.5rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--title)' }}>
                        My Requirements
                    </span>
                </div>
                <button
                    onClick={handleAddNew}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--green)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
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
                    <Plus size={18} />
                    Add New
                </button>
            </div>

            {loading ? (
                <LoadingSpinner text="Loading requirements..." />
            ) : requirements.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {requirements.map((requirement) => (
                        <div
                            key={requirement._id}
                            style={{
                                background: 'var(--bg-color)',
                                borderRadius: '12px',
                                padding: '1rem',
                                border: '1px solid var(--white3)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--green)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--white3)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={() => navigate(`/requirement/${requirement._id}`)}
                        >
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {requirement.mediaUrl && requirement.mediaUrl.length > 0 && (
                                    <img
                                        src={getProxiedUrl(requirement.mediaUrl[0])}
                                        alt={getLocalizedText(requirement.cropNames, currentLanguage.langCode) || requirement.productName}
                                        crossOrigin="anonymous"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '8px',
                                            objectFit: 'cover',
                                            flexShrink: 0
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = images.App;
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        color: 'var(--title)'
                                    }}>
                                        {getLocalizedText(requirement.cropNames, currentLanguage.langCode) || requirement.productName}
                                    </h4>
                                    <p style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-color)'
                                    }}>
                                        Quantity: {requirement.qut} {requirement.qutType}
                                    </p>
                                    {requirement.approxPrice && (
                                        <p style={{
                                            margin: '0 0 0.5rem 0',
                                            fontSize: '0.9rem',
                                            color: 'var(--text-color)'
                                        }}>
                                            Price: ₹{requirement.approxPrice} {requirement.priceType}
                                        </p>
                                    )}
                                    <p style={{
                                        margin: 0,
                                        fontSize: '0.85rem',
                                        color: 'var(--sub-title)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <MapPin size={14} />
                                        {requirement.city}, {requirement.state}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(requirement._id);
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Heart
                                        size={20}
                                        color={likeMap[requirement._id] ? 'var(--red)' : 'var(--sub-title)'}
                                        fill={likeMap[requirement._id] ? 'var(--red)' : 'none'}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="📋"
                    title="You have not posted any requirements yet"
                    description="Start by posting your first requirement"
                    action={{
                        label: t.POST_REQUIREMENT_BUTTON || 'Post Requirement',
                        onClick: handleAddNew
                    }}
                />
            )}
        </div>
    );
};

export default RequirementsList;

