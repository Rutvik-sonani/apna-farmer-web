import { useState, useEffect, useCallback } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { fetchFavorites, toggleFavorite } from '../../../services/favoriteService';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import { useNavigate } from 'react-router-dom';



// Define FavoriteItem interface based on formatted structure
interface FavoriteData {
    _id: string;
    favoriteId: string;
    // Crop fields
    cropNames?: Array<{ name: string }>;
    qut?: number;
    qutAvailable?: string;
    rate?: number;
    rateType?: string;
    imagesUrl?: string[];
    images?: string[];
    // User/Shared fields
    firstName?: string;
    lastName?: string;
    city?: string;
    district?: string;
    avatar?: string;
    avatarUrl?: string;
    user?: {
        city?: string;
        district?: string;
    };
    // Farmer fields
    farmers?: {
        cropCategories?: Array<{ name: string }>;
    };
    // Buyer fields
    buyer?: {
        company?: { name: string };
        cropCategories?: Array<{ name: string }>;
    };
    // AgroShop fields
    agroshops?: {
        shop?: {
            name: string;
            businessType?: string;
        };
        images?: string[];
        imageUrl?: string[];
    };
    [key: string]: unknown;
}

// Define FavoriteItem interface based on formatted structure
interface FavoriteItem {
    _id: string;
    type: string;
    title: string;
    subtitle: string;
    location: string;
    image: string;
    favoriteId: string;
    item: FavoriteData;
}

const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('ALL');

    const favoriteTypes = [
        { id: 'ALL', name: 'All', type: '' },
        { id: 'CROP', name: 'Crops', type: 'CROP' },
        { id: 'FARMER', name: 'Farmers', type: 'FARMER' },
        { id: 'BUYER', name: 'Buyers', type: 'BUYER' },
        { id: 'AGROSHOP', name: 'AgroShops', type: 'AGROSHOP' },
    ];

    const fetchFavoritesData = useCallback(async () => {
        try {
            setLoading(true);
            const type = activeTab === 'ALL' ? '' : activeTab;

            if (type) {
                const result = await fetchFavorites(type);
                if (result?.success && result?.data?.docs) {
                    const formattedFavorites = result.data.docs.map((item: FavoriteData) => formatFavoriteItem(item, type));
                    setFavorites(formattedFavorites);
                }
            } else {
                // Fetch all types
                const [crops, farmers, buyers, agroshops] = await Promise.all([
                    fetchFavorites('CROP').catch(() => ({ success: false, data: { docs: [] } })),
                    fetchFavorites('FARMER').catch(() => ({ success: false, data: { docs: [] } })),
                    fetchFavorites('BUYER').catch(() => ({ success: false, data: { docs: [] } })),
                    fetchFavorites('AGROSHOP').catch(() => ({ success: false, data: { docs: [] } }))
                ]);

                const allFavorites = [
                    ...(crops?.data?.docs || []).map((item: FavoriteData) => formatFavoriteItem(item, 'CROP')),
                    ...(farmers?.data?.docs || []).map((item: FavoriteData) => formatFavoriteItem(item, 'FARMER')),
                    ...(buyers?.data?.docs || []).map((item: FavoriteData) => formatFavoriteItem(item, 'BUYER')),
                    ...(agroshops?.data?.docs || []).map((item: FavoriteData) => formatFavoriteItem(item, 'AGROSHOP'))
                ];
                setFavorites(allFavorites);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchFavoritesData();
    }, [fetchFavoritesData]);

    const formatFavoriteItem = (item: FavoriteData, type: string): FavoriteItem => {
        let title = '';
        let subtitle = '';
        let location = '';
        let image = '';

        if (type === 'CROP') {
            title = item.cropNames?.[0]?.name || 'Crop';
            subtitle = `${item.qut || 0} ${item.qutAvailable || 'KG'} • ₹${item.rate || 0}/${item.rateType || 'KG'}`;
            location = `${item.user?.city || ''} ${item.user?.district || ''}`.trim();
            image = item.imagesUrl?.[0] || item.images?.[0] || '';
        } else if (type === 'FARMER') {
            title = `${item.firstName || ''} ${item.lastName || ''}`.trim();
            subtitle = item.farmers?.cropCategories?.[0]?.name || 'Farmer';
            location = `${item.city || ''} ${item.district || ''}`.trim();
            image = item.avatar || item.avatarUrl || '';
        } else if (type === 'BUYER') {
            title = item.buyer?.company?.name || `${item.firstName || ''} ${item.lastName || ''}`.trim();
            subtitle = item.buyer?.cropCategories?.[0]?.name || 'Buyer';
            location = `${item.city || ''} ${item.district || ''}`.trim();
            image = item.avatar || item.avatarUrl || '';
        } else if (type === 'AGROSHOP') {
            title = item.agroshops?.shop?.name || `${item.firstName || ''} ${item.lastName || ''}`.trim();
            subtitle = item.agroshops?.shop?.businessType || 'AgroShop';
            location = `${item.city || ''} ${item.district || ''}`.trim();
            image = item.agroshops?.images?.[0] || item.agroshops?.imageUrl?.[0] || item.avatar || item.avatarUrl || '';
        }

        return {
            _id: item._id,
            type,
            title,
            subtitle,
            location,
            image,
            favoriteId: item.favoriteId,
            item
        };
    };

    const removeFavorite = async (favorite: FavoriteItem) => {
        try {
            await toggleFavorite(favorite._id, favorite.type, false);
            setFavorites(prev => prev.filter(item => item._id !== favorite._id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const handleItemClick = (favorite: FavoriteItem) => {
        if (favorite.type === 'CROP') {
            navigate(`/crop/${favorite._id}`);
        } else if (favorite.type === 'FARMER') {
            navigate(`/marketplace?farmer=${favorite._id}`);
        } else if (favorite.type === 'BUYER') {
            navigate(`/buyers/${favorite._id}`);
        } else if (favorite.type === 'AGROSHOP') {
            navigate(`/agroshop/${favorite._id}`);
        }
    };

    const filteredFavorites = activeTab === 'ALL'
        ? favorites
        : favorites.filter(fav => fav.type === activeTab);

    if (loading) {
        return <LoadingSpinner text="Loading favorites..." />;
    }

    return (
        <div className="favorites-page container" style={{ padding: '1rem' }}>
            <h2 style={{ color: 'var(--green)', marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 700 }}>My Saved Items</h2>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem'
            }}>
                {favoriteTypes.map(type => (
                    <button
                        key={type.id}
                        onClick={() => setActiveTab(type.id)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: activeTab === type.id
                                ? 'linear-gradient(to top right, var(--gradient-start), var(--gradient-end))'
                                : 'white',
                            color: activeTab === type.id ? 'white' : 'var(--title)',
                            border: activeTab === type.id ? 'none' : '1px solid var(--light-green)',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s'
                        }}
                    >
                        {type.name}
                    </button>
                ))}
            </div>

            {filteredFavorites.length === 0 ? (
                <EmptyState
                    icon="❤️"
                    title="No Saved Items"
                    description="Items you save will appear here"
                />
            ) : (
                <div className="favorites-list">
                    {filteredFavorites.map(item => (
                        <div
                            key={item._id}
                            onClick={() => handleItemClick(item)}
                            style={{
                                background: 'white',
                                padding: '1rem',
                                borderRadius: '12px',
                                marginBottom: '1rem',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                display: 'flex',
                                gap: '1rem',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                            }}
                        >
                            <div style={{
                                width: '60px', height: '60px',
                                background: '#f0f0f0',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        crossOrigin="anonymous"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <span style={{ fontSize: '20px' }}>📷</span>
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 600, marginBottom: '2px' }}>
                                    {item.type}
                                </div>
                                <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 600, color: 'var(--title)' }}>
                                    {item.title}
                                </h4>
                                <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '4px' }}>
                                    {item.subtitle}
                                </div>
                                {item.location && (
                                    <div style={{ fontSize: '0.8rem', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={12} /> {item.location}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFavorite(item);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '10px', right: '10px',
                                    background: 'none', border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Heart size={20} fill="#ff4d4d" color="#ff4d4d" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
