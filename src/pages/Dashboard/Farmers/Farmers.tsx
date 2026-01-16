import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerCard from '../../../components/cards/FarmerCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import FilterBar from '../../../components/FilterBar/FilterBar';
import { fetchCropsForSale } from '../../../services/cropService';
import { fetchCropCategories } from '../../../services/homeService';

// Interface matching the API structure from mobile app
interface FarmerCropData {
    _id: string;
    cropNames?: Array<{ name: string }>;
    qut?: number;
    qutAvailable?: string;
    rate?: number;
    rateType?: string;
    quality?: string;
    description?: string;
    imagesUrl?: string[];
    images?: string[];
    user?: {
        _id: string;
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
    location?: {
        coordinates?: number[];
    };
    createdAt?: string;
    isFavorite?: boolean;
}

interface Category {
    _id?: string;
    id?: string;
    name: string;
    image?: string;
}

const Marketplace = () => {
    const navigate = useNavigate();
    const [crops, setCrops] = useState<FarmerCropData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>({ name: 'All' });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await fetchCropCategories();
            if (result?.success && result?.data?.docs) {
                const formattedCategories = [
                    { _id: 'all', name: 'All' },
                    ...result.data.docs.map((cat: Category) => ({
                        _id: cat._id || cat.id,
                        id: cat._id || cat.id,
                        name: cat.name || ''
                    }))
                ];
                setCategories(formattedCategories);
            } else {
                // Fallback categories
                setCategories([
                    { _id: 'all', name: 'All' },
                    { _id: '1', name: 'Fruits' },
                    { _id: '2', name: 'Vegetables' }
                ]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback categories
            setCategories([
                { _id: 'all', name: 'All' },
                { _id: '1', name: 'Fruits' },
                { _id: '2', name: 'Vegetables' }
            ]);
        }
    };

    // Debounce search
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedSearch = useCallback(
        (text: string) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                setSearchQuery(text);
            }, 300);
        },
        []
    );

    // Debounce search handler
    const handleSearchChange = (text: string) => {
        debouncedSearch(text);
    };

    const fetchCrops = useCallback(async () => {
        try {
            setLoading(true);
            let queryParams = '';
            if (selectedCategory.name !== 'All' && selectedCategory._id !== 'all') {
                queryParams = `?cropCategoryId=${selectedCategory._id}`;
            }
            const result = await fetchCropsForSale(queryParams);
            if (result?.success && result?.data?.docs) {
                setCrops(result.data.docs);
            } else if (result?.success && Array.isArray(result.data)) {
                setCrops(result.data);
            }
        } catch (error) {
            console.error('Error fetching crops:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory]);

    useEffect(() => {
        fetchCrops();
    }, [fetchCrops]);

    const handleLike = (id: string) => {
        setCrops(prev => prev.map((c) =>
            c._id === id ? { ...c, isFavorite: !c.isFavorite } : c
        ));
    };

    const filteredCrops = crops.filter((crop) => {
        // Category filter - in real app, match with cropCategories
        if (selectedCategory.name !== 'All' && selectedCategory._id !== 'all') {
            // For now, just pass through - in real app, filter by crop category
        }

        // Search filter
        if (searchQuery.trim()) {
            const cropName = crop.cropNames?.[0]?.name?.toLowerCase() || '';
            const farmerName = `${crop.user?.firstName || ''} ${crop.user?.lastName || ''}`.toLowerCase();
            const location = `${crop.user?.city} ${crop.user?.district} ${crop.user?.state}`.toLowerCase();
            const query = searchQuery.toLowerCase();
            return cropName.includes(query) || farmerName.includes(query) || location.includes(query);
        }

        return true;
    });

    return (
        <div className="marketplace-page container">
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                    color: 'var(--green)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    margin: 0
                }}>
                    All Crops (Marketplace)
                </h2>
            </div>

            {/* FilterBar */}
            <FilterBar
                placeholder="Search crops, farmers, location..."
                data={categories}
                category={selectedCategory.name}
                onCategory={setSelectedCategory}
                onSearchChange={handleSearchChange}
                showLocation={true}
                locationText="Current Location"
            />

            {/* Grid */}
            {loading ? (
                <LoadingSpinner text="Loading crops..." />
            ) : (
                <div className="crops-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    columnGap: '1.5rem',
                    rowGap: '2.5rem'
                }}>
                    {filteredCrops.length > 0 ? filteredCrops.map((crop) => (
                        <FarmerCard
                            key={crop._id}
                            item={crop}
                            onLike={handleLike}
                            onClick={() => navigate(`/crop/${crop._id}`)}
                        />
                    )) : (
                        <div style={{ gridColumn: '1/-1' }}>
                            <EmptyState
                                icon="🌾"
                                title="No Crops Found"
                                description="Try adjusting your search or check back later"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Marketplace;
