import { useState } from 'react';
import { Filter } from 'lucide-react';
import './AgroShop.css';

interface FilterItem {
    id: string;
    name: string;
}

interface FilterSectionProps {
    filters: FilterItem[];
}

const FilterSection = ({ filters }: FilterSectionProps) => {
    const [activeFilter, setActiveFilter] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    const handleFilterClick = (filter: FilterItem) => {
        setActiveFilter(filter.id);
        // Show modal if no products found (for now, always show)
        setShowModal(true);
    };

    return (
        <>
            <div className="filter-section-container">
                <div className="filter-section-scroll">
                    <button className="filter-icon-button">
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>

                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`filter-item ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="filter-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="filter-modal-box" onClick={(e) => e.stopPropagation()}>
                        <h3 className="filter-modal-title">No Products Found</h3>
                        <p className="filter-modal-message">
                            Sorry! No items are available in this category.
                        </p>
                        <button
                            className="filter-modal-close-button"
                            onClick={() => setShowModal(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterSection;

