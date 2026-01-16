import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Youtube, Twitter, Share2 } from 'lucide-react';
import './Footer.css';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Subscribed:', email);
            alert('Thank you for subscribing!');
            setEmail('');
        }
    };

    const informationLinks = [
        { name: t.ABOUT_US, path: '/about-us' },
        { name: t.CANCELLATION_POLICY, path: '/terms-conditions' },
        { name: t.GENERAL_TERMS, path: '/terms-conditions' },
        { name: t.GRIEVANCE_POLICY, path: '/terms-conditions' },
        { name: t.RETURN_REFUND_POLICY, path: '/terms-conditions' },
        { name: t.SHIPPING_POLICY, path: '/terms-conditions' },
    ];

    const additionalLinks = [
        { name: t.BLOGS, path: '/blogs' },
        { name: t.drawer.CONTACT_US, path: '/contact-us' },
        { name: t.CAUTION_NOTICE, path: '/caution-notice' },
        { name: t.FAQ, path: '/faq' },
        { name: t.PRIVACY_POLICY, path: '/privacy-policy' },
        { name: t.SITE_MAP, path: '/sitemap' },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
        { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
        { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
        { name: 'Pinterest', icon: Share2, url: 'https://pinterest.com' },
        { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    ];

    return (
        <footer className="footer">
            {/* Top Social Media Section */}
            <div className="footer-social-top">
                <h2 className="footer-social-title">{t.FOLLOW_US_SOCIAL_MEDIA}</h2>
                <p className="footer-social-tagline">{t.COME_BE_PART}</p>
                <div className="footer-social-icons-large">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-large instagram"
                        aria-label="Instagram"
                    >
                        <Instagram size={40} />
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-large facebook"
                        aria-label="Facebook"
                    >
                        <Facebook size={40} />
                    </a>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    {/* Left Column - INFORMATION */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">{t.INFORMATION}</h3>
                        <ul className="footer-links">
                            {informationLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Middle Column - CONTACT US */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">{t.CONTACT_US}</h3>
                        <div className="footer-contact">
                            <div className="footer-contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <span>Apna Farmer, Haridwar, Uttarakhand - 249405</span>
                            </div>
                            <div className="footer-contact-item">
                                <Phone size={18} className="contact-icon" />
                                <span>{t.TOLL_FREE} 1800-571-1751, 01334-610111</span>
                            </div>
                            <div className="footer-contact-item">
                                <Clock size={18} className="contact-icon" />
                                <span>{t.TIMING} Mon to Sat 6 am to 8 pm</span>
                            </div>
                            <div className="footer-contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>customercare@apnafarmer.in</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Additional Links, Newsletter, Social, Apps */}
                    <div className="footer-column footer-column-right">
                        {/* Additional Links */}
                        <div className="footer-additional-links">
                            {additionalLinks.map((link) => (
                                <Link key={link.name} to={link.path} className="footer-link-inline">
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Subscribe Newsletter */}
                        <div className="footer-newsletter">
                            <h3 className="footer-column-title">{t.SUBSCRIBE_NEWSLETTER}</h3>
                            <form onSubmit={handleSubscribe} className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder={t.ENTER_EMAIL}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="newsletter-input"
                                    required
                                />
                                <button type="submit" className="newsletter-button">
                                    {t.SEND}
                                </button>
                            </form>
                        </div>

                        {/* Follow on Social Media */}
                        <div className="footer-social-small">
                            <h3 className="footer-column-title">{t.FOLLOW_SOCIAL_MEDIA}</h3>
                            <div className="footer-social-icons-small">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon-small"
                                            aria-label={social.name}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="footer-copyright">
                <p>{t.ALL_RIGHTS_RESERVED}</p>
            </div>
        </footer>
    );
};

export default Footer;

