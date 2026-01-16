import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface Category {
    _id?: string;
    id?: string;
    name: string;
    image?: string;
}

interface FilterBarProps {
    placeholder?: string;
    data?: Category[];
    category?: string;
    onCategory?: (category: Category) => void;
    onSearchChange?: (text: string) => void;
    showLocation?: boolean;
    locationText?: string;
}

const FilterBar = ({
    placeholder = 'Search...',
    data = [],
    category,
    onCategory,
    onSearchChange,
    showLocation = true,
    locationText
}: FilterBarProps) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        onSearchChange?.(text);
    };

    const handleCategoryPress = (item: Category) => {
        onSearchChange?.('');
        setSearchText('');
        onCategory?.(item);
    };

    return (
        <div style={{
            background: 'var(--bg-color)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
        }}>
            {/* Search */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '1px solid var(--white3)',
                marginBottom: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <Search size={20} color="var(--subtitle)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchText}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '0.95rem',
                        color: 'var(--title)'
                    }}
                />
            </div>

            {/* Categories */}
            {data.length > 0 && (
                <div style={{
                    marginBottom: '1rem',
                    overflowX: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--white3) transparent'
                }} className="horizontal-scroll">
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        paddingBottom: '0.5rem'
                    }}>
                        {data.map((item, index) => {
                            const isSelected = category === item.name;
                            return (
                                <button
                                    key={item._id || item.id || index}
                                    onClick={() => handleCategoryPress(item)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        border: `2px solid ${isSelected ? 'var(--green)' : 'var(--white3)'}`,
                                        background: isSelected ? 'var(--green)' : 'white',
                                        color: isSelected ? 'white' : 'var(--sub-title)',
                                        fontSize: '0.9rem',
                                        fontWeight: isSelected ? 600 : 500,
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s',
                                        boxShadow: isSelected ? '0 2px 8px rgba(0, 89, 13, 0.2)' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.borderColor = 'var(--green)';
                                            e.currentTarget.style.color = 'var(--green)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.borderColor = 'var(--white3)';
                                            e.currentTarget.style.color = 'var(--sub-title)';
                                        }
                                    }}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Location Toggle */}
            {showLocation && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid var(--white3)'
                }}>
                    <MapPin size={18} color="var(--green)" />
                    <span style={{
                        fontSize: '0.9rem',
                        color: 'var(--title)',
                        flex: 1
                    }}>
                        {locationText || 'Current Location'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FilterBar;

