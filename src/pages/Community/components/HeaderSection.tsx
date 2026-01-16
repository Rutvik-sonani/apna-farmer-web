import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface HeaderSectionProps {
    onSearch: (text: string) => void;
    onAddPost: () => void;
    onViewMyPosts: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onSearch, onAddPost, onViewMyPosts }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="community-header" style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            gap: '1rem'
        }}>
            <div className="search-bar" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #00590D', // var(--green)
                borderRadius: '8px',
                padding: '0.5rem',
                background: 'white'
            }}>
                <Search size={20} color="#999" />
                <input
                    type="text"
                    placeholder="Search Post..."
                    style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', flex: 1 }}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#00590D',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={24} />
                </button>

                {showMenu && (
                    <div className="menu-dropdown" style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        marginTop: '0.5rem',
                        background: '#DFF0DD', // lightGreen
                        padding: '0.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        minWidth: '150px',
                        zIndex: 10
                    }}>
                        <div
                            onClick={onAddPost}
                            style={{ padding: '0.5rem', background: 'white', marginBottom: '0.25rem', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
                        >
                            Add Post
                        </div>
                        <div
                            onClick={onViewMyPosts}
                            style={{ padding: '0.5rem', background: 'white', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
                        >
                            View My Posts
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderSection;
