import { useState, useEffect } from 'react';
import CategoryList from '../../../components/AgroShop/CategoryList';
import ImageSlider from '../../../components/AgroShop/ImageSlider';
import FilterSection from '../../../components/AgroShop/FilterSection';
import ProductList from '../../../components/AgroShop/ProductList';
import LocalVendors from '../../../components/AgroShop/LocalVendors';
import { getSubcategoriesById, AgroshopCategory } from '../../../utils/agroShopData';
import { fetchAgroCategories, fetchAgroShops } from '../../../services/agroShopService';
import LoadingSpinner from '../../../components/LoadingSpinner';

// Interface matching the API structure from mobile app
interface AgroShopData {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    whatsappNumber?: string;
    email?: string;
    avatarUrl?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
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
    isLike?: boolean;
}

interface Category {
    _id?: string;
    id?: string;
    name?: string;
    icon?: string;
}

const AgroShop = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('1');
    const [vendors, setVendors] = useState<AgroShopData[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const categoriesResult = await fetchAgroCategories('?isAddedAll=true');
                if (categoriesResult?.success && categoriesResult?.data?.docs) {
                    setCategories(categoriesResult.data.docs);
                }
            } catch (error) {
                console.error('Error fetching agro shop data:', error);
            } finally {
                // If vendors are also loading, loading state might fluctuate. 
                // Better to have separate loading states or manage carefully.
                // For now, allow it.
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadVendors = async () => {
            try {
                setLoading(true);
                const result = await fetchAgroShops(selectedCategory ? `?categoryId=${selectedCategory}` : '');
                if (result?.success && result?.data?.docs) {
                    setVendors(result.data.docs);
                }
            } catch (error) {
                console.error('Error fetching vendors:', error);
            } finally {
                setLoading(false);
            }
        };
        if (selectedCategory) {
            loadVendors();
        }
    }, [selectedCategory]);

    // Format categories for CategoryList
    const formattedCategories = categories.length > 0
        ? categories.map((cat) => ({
            id: cat._id || cat.id,
            _id: cat._id || cat.id,
            name: cat.name || '',
            icon: cat.icon || cat.name?.split(' ')[0] || '🌾'
        }))
        : AgroshopCategory.map(cat => ({
            id: cat.id,
            _id: cat._id,
            name: cat.name,
            icon: cat.name.split(' ')[0] // Extract emoji from name
        }));

    // Get subcategories for FilterSection based on selected category
    const subcategories = getSubcategoriesById(selectedCategory);

    if (loading && vendors.length === 0) {
        return <LoadingSpinner text="Loading agro shops..." />;
    }

    return (
        <div className="agroshop-dashboard" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Categories */}
            <CategoryList
                activeCategory={selectedCategory}
                setActiveCategory={setSelectedCategory}
                categories={formattedCategories}
            />

            {/* Banner Carousel */}
            <ImageSlider />

            {/* Subcategories Filter */}
            <FilterSection filters={subcategories} />

            {/* Today's Offer Section */}
            {vendors.some(v => v.agroshops?.offer?.discount) && (
                <ProductList
                    title="Today's Offer"
                    products={vendors
                        .filter(v => v.agroshops?.offer?.discount)
                        .map(v => ({
                            id: v._id,
                            name: v.agroshops?.shop?.name || `${v.firstName}'s Shop`,
                            image: v.agroshops?.images?.[0] || v.agroshops?.imageUrl?.[0] || v.avatarUrl,
                            discount: `${v.agroshops?.offer?.discount}% ${v.agroshops?.offer?.discountType === 'PERCENTAGE' ? 'Off' : 'Discount'}`,
                            location: `${v.city || ''} ${v.district ? ', ' + v.district : ''}`,
                            tag: 'Special Offer'
                        }))
                    }
                />
            )}

            {/* Local Vendors */}
            <LocalVendors vendors={vendors} />

            {/* Top Selling Section */}
            <ProductList
                title="Top Selling"
                products={vendors.map(v => ({
                    id: v._id,
                    name: v.agroshops?.shop?.name || `${v.firstName}'s Shop`,
                    image: v.agroshops?.images?.[0] || v.agroshops?.imageUrl?.[0] || v.avatarUrl,
                    location: `${v.city || ''} ${v.district ? ', ' + v.district : ''}`,
                    tag: v.isLike ? 'Popular' : undefined
                }))}
            />
        </div>
    );
};

export default AgroShop;
