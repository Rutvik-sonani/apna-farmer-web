import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerCard from '../../../components/cards/BuyerCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import FilterBar from '../../../components/FilterBar/FilterBar';
import { fetchBuyers } from '../../../services/userService';
import { fetchBuyerCategories } from '../../../services/homeService';

// Interface matching the API structure from mobile app
interface BuyerData {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
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
}

interface Category {
    _id?: string;
    id?: string;
    name: string;
    image?: string;
}

const Buyers = () => {
    const navigate = useNavigate();
    const [buyers, setBuyers] = useState<BuyerData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>({ name: 'All' });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchBuyers();
    }, []);

    useEffect(() => {
        fetchBuyersData();
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const result = await fetchBuyerCategories();
            if (result?.success && result?.data?.docs) {
                const formattedCategories = [
                    { _id: 'all', name: 'All' },
                    ...result.data.docs.map((cat) => ({
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
                    { _id: '1', name: 'Grains' },
                    { _id: '2', name: 'Vegetables' },
                    { _id: '3', name: 'Fruits' }
                ]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback categories
            setCategories([
                { _id: 'all', name: 'All' },
                { _id: '1', name: 'Grains' },
                { _id: '2', name: 'Vegetables' }
            ]);
        }
    };

    const fetchBuyersData = async () => {
        try {
            setLoading(true);
            const result = await fetchBuyers();
            if (result?.success && result?.data?.docs) {
                setBuyers(result.data.docs);
            } else if (result?.success && Array.isArray(result.data)) {
                setBuyers(result.data);
            }
        } catch (error) {
            console.error('Error fetching buyers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = (id: string) => {
        setBuyers(prev => prev.map((b) =>
            b._id === id ? { ...b, isLike: !b.isLike } : b
        ));
    };

    const filteredBuyers = buyers.filter((buyer) => {
        // Category filter
        if (selectedCategory.name !== 'All' && selectedCategory._id !== 'all') {
            const buyerCategories = buyer.buyer?.cropCategories?.map(c => c.name.toLowerCase()).join(' ') || '';
            if (!buyerCategories.includes(selectedCategory.name.toLowerCase())) {
                return false;
            }
        }

        // Search filter
        if (searchQuery.trim()) {
            const companyName = buyer.buyer?.company?.name?.toLowerCase() || '';
            const ownerName = `${buyer.firstName} ${buyer.lastName}`.toLowerCase();
            const cropNames = buyer.buyer?.cropNames?.map(c => c.name.toLowerCase()).join(' ') || '';
            const location = `${buyer.city} ${buyer.district} ${buyer.state}`.toLowerCase();
            const query = searchQuery.toLowerCase();
            return companyName.includes(query) || ownerName.includes(query) || cropNames.includes(query) || location.includes(query);
        }

        return true;
    });

    return (
        <div className="buyers-page container">
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                    color: 'var(--green)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    margin: 0
                }}>
                    Find Buyers
                </h2>
            </div>

            {/* FilterBar */}
            <FilterBar
                placeholder="Search by company name, owner, crops, location..."
                data={categories}
                category={selectedCategory.name}
                onCategory={setSelectedCategory}
                onSearchChange={setSearchQuery}
                showLocation={true}
                locationText="Current Location"
            />

            {/* List */}
            {loading ? (
                <LoadingSpinner text="Loading buyers..." />
            ) : (
                <div className="buyers-list-web">
                    {filteredBuyers.length > 0 ? filteredBuyers.map((buyer) => (
                        <BuyerCard
                            key={buyer._id}
                            item={buyer}
                            onLike={handleLike}
                            onClick={() => navigate(`/buyers/${buyer._id}`)}
                        />
                    )) : (
                        <EmptyState
                            icon="🤝"
                            title="No Buyers Found"
                            description="Try adjusting your search or check back later"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Buyers;
