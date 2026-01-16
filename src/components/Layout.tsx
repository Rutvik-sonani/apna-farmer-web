import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Users, User, Menu, Store, Search, Building2, Bell, Languages, Info } from 'lucide-react';
import { images } from '../utils/images';
import Drawer from './Drawer';
import Footer from './Footer';
import { useLanguage } from '../hooks/useLanguage';

const Layout = () => {
    const location = useLocation();
    const { t, currentLanguage } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isActive = (path: string) => location.pathname === path;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search functionality
        console.log('Search:', searchQuery);
    };

    const authDataString = localStorage.getItem('Auth');
    const authData = authDataString ? JSON.parse(authDataString) : null;
    const selectedRole = localStorage.getItem('selectedRole') || authData?.userType;

    // Define all navigation items with role visibility
    const allNavItems = [
        { path: '/', icon: Home, label: t.drawer.HOME, allowedRoles: ['FARMER', 'FPO', 'BUYER', 'AGROSHOP'] },

        {
            path: '/buyers',
            icon: Users,
            label: t.drawer.BUYERS,
            allowedRoles: ['FARMER', 'FPO']
        },
        {
            path: '/post-requirement',
            icon: Search, // Using Search as generic "Requirement" icon
            label: 'Post Requirement',
            allowedRoles: ['BUYER', 'AGROSHOP']
        },
        { path: '/agroshop', icon: Store, label: t.drawer.AGROBIZ, allowedRoles: ['FARMER', 'FPO', 'BUYER', 'AGROSHOP'] },
        { path: '/marketplace', icon: Building2, label: t.drawer.FARMERS, allowedRoles: ['FARMER', 'FPO', 'BUYER', 'AGROSHOP'] }, // Everyone can view marketplace
        { path: '/profile', icon: User, label: t.drawer.PROFILE, allowedRoles: ['FARMER', 'FPO', 'BUYER', 'AGROSHOP'] },
        { path: '/our-services', icon: Info, label: t.drawer.OUR_SERVICES, allowedRoles: ['FARMER', 'FPO', 'BUYER', 'AGROSHOP'] },
    ];

    const navItems = allNavItems.filter(item => {
        if (!selectedRole) return false;
        return item.allowedRoles.includes(selectedRole.toUpperCase());
    });

    return (
        <div className="app-layout">
            {/* Header */}
            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <button
                            className="menu-toggle"
                            onClick={() => setIsDrawerOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} color="white" />
                        </button>
                        <div className="header-logo">
                            <img
                                src={images.logoWhite}
                                alt="Apna Farmer Logo"
                                className="logo-image"
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="header-search">
                            <form onSubmit={handleSearch} className="search-form">
                                <Search size={20} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder={t.SEARCH}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </form>
                        </div>

                        <nav className="header-menu desktop-only">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`menu-item ${active ? 'active' : ''}`}
                                    >
                                        <Icon size={20} />
                                        <span className="menu-label">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="header-actions desktop-only" style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link
                                to="/language"
                                className="menu-item"
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0.4rem 0.6rem', textDecoration: 'none' }}
                                title={`Current: ${currentLanguage.name}`}
                            >
                                <Languages size={20} />
                                <span className="menu-label">{currentLanguage.langCode.toUpperCase()}</span>
                            </Link>

                            <Link
                                to="/notifications"
                                className="menu-item"
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0.4rem 0.6rem', textDecoration: 'none' }}
                            >
                                <Bell size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="layout-body">
                {/* Main Content */}
                <main className="main-content container">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />



            {/* Drawer */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </div>
    );
};

export default Layout;
