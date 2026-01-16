import { useNavigate } from 'react-router-dom';
import { images } from '../../utils/images';
import { getProxiedUrl } from '../../utils/urlUtils';
import './AgroShop.css';

interface Product {
    id?: string;
    _id?: string;
    name?: string;
    image?: string;
    avatarUrl?: string; // fallback if image not present
    discount?: string;
    tag?: string; // e.g. 'Best Seller'
    location?: string;
    [key: string]: unknown;
}

interface ProductListProps {
    title?: string;
    products?: Product[];
}

const ProductList = ({ title = 'Recommended for you', products = [] }: ProductListProps) => {
    const navigate = useNavigate();

    // If no products, don't render the section
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h3 className="product-list-title">{title}</h3>
                <button className="product-list-see-all">See All</button>
            </div>

            <div
                className="horizontal-scroll"
                style={{
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto',
                    paddingBottom: '1rem',
                    paddingLeft: '0.5rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id || product._id || Math.random().toString()}
                        className="product-card"
                        style={{
                            minWidth: '200px', // Fixed width for horizontal items
                            maxWidth: '200px',
                            flexShrink: 0
                        }}
                        onClick={() => navigate(`/agroshop/${product.id || product._id}`)}
                    >
                        <div className="product-image-container" style={{ height: '160px' }}>
                            <img
                                src={getProxiedUrl(product.image || product.avatarUrl || images.App)}
                                alt={product.name || 'Product'}
                                crossOrigin="anonymous"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = images.App;
                                }}
                            />
                            {product.discount && (
                                <div className="product-discount-badge">{product.discount}</div>
                            )}
                            {product.tag && (
                                <div className="product-tag-badge">{product.tag}</div>
                            )}
                        </div>

                        <div className="product-info">
                            <h4 className="product-name" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{product.name}</h4>

                            {/* Showing Shop Name/Location since strict product price isn't available */}
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                {product.location || 'Agro Shop'}
                            </p>

                            <button className="product-add-to-cart-button">View Shop</button>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .horizontal-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default ProductList;

