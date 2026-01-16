import { useNavigate } from 'react-router-dom';
import AgroCard from '../cards/AgroCard';
import './AgroShop.css';

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

interface LocalVendorsProps {
    vendors?: AgroShopData[];
}

const LocalVendors = ({ vendors }: LocalVendorsProps) => {
    const navigate = useNavigate();

    // Mock data if no vendors provided
    const defaultVendors: AgroShopData[] = vendors || [
        {
            _id: '1',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            mobile: '9876543210',
            whatsappNumber: '9876543210',
            city: 'Mandsaur',
            district: 'Mandsaur',
            state: 'Madhya Pradesh',
            country: 'India',
            agroshops: {
                shop: {
                    name: 'Kisan Seva Kendra',
                    businessType: 'Seeds & Fertilizers',
                },
                offer: {
                    discount: '10',
                    discountType: 'PERCENTAGE',
                },
            },
            isLike: false,
        },
        {
            _id: '2',
            firstName: 'Sunil',
            lastName: 'Patel',
            mobile: '9123456789',
            whatsappNumber: '9123456789',
            city: 'Indore',
            district: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
            agroshops: {
                shop: {
                    name: 'Agro World',
                    businessType: 'Farming Tools & Equipment',
                },
                offer: {
                    discount: '15',
                    discountType: 'PERCENTAGE',
                },
            },
            isLike: false,
        },
    ];

    return (
        <div className="local-vendors-container">
            <div className="local-vendors-header">
                <h3 className="local-vendors-title">Stores Near You</h3>
                <button className="local-vendors-view-all">View All</button>
            </div>

            <div className="local-vendors-grid">
                {defaultVendors.map((vendor) => (
                    <AgroCard
                        key={vendor._id}
                        item={vendor}
                        onClick={() => navigate(`/agroshop/${vendor._id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default LocalVendors;

