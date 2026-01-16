import './AgroShop.css';

interface Category {
    id: string;
    _id?: string;
    name: string;
    icon?: string;
}

interface CategoryListProps {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
    categories?: Category[];
}

const defaultCategories: Category[] = [
    { id: '1', name: '🌾 Crop Inputs' },
    { id: '2', name: '🚜 Tractors' },
    { id: '3', name: '⚙ Farm Tools' },
    { id: '4', name: '🏗 Machinery' },
    { id: '5', name: '💧 Irrigation' },
    { id: '6', name: '🌿 Organic' },
    { id: '7', name: '🌱 Gardening' },
    { id: '8', name: '🐄 Animal Feed' },
    { id: '9', name: '🔧 Spare Parts' },
    { id: '10', name: '📊 Agri Services' },
    { id: '11', name: '🔄 Used Equipment' },
    { id: '12', name: '🛠 Other' },
];

const CategoryList = ({ activeCategory, setActiveCategory, categories = defaultCategories }: CategoryListProps) => {
    return (
        <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'var(--bg-color)',
            padding: '1rem',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div
                className="horizontal-scroll"
                style={{
                    display: 'flex',
                    gap: '0.75rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '25px',
                            background: activeCategory === category.id ? 'var(--green)' : 'white',
                            color: activeCategory === category.id ? 'white' : 'var(--title)',
                            border: activeCategory === category.id ? 'none' : '1px solid var(--white3)',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            boxShadow: activeCategory === category.id ? '0 4px 12px rgba(6, 53, 20, 0.2)' : 'none'
                        }}
                    >
                        <span>{category.icon || '🌾'}</span>
                        <span>{category.name.replace(/_/g, ' ')}</span>
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

export default CategoryList;

