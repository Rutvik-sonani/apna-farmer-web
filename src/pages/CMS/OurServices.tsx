import { useLanguage } from '../../hooks/useLanguage';
import { ArrowLeft, CheckCircle2, Leaf, Target, ShieldCheck, Users, Smartphone, TrendingUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OurServices = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const sections = [
        {
            icon: Users,
            data: t.OUR_SERVICES_PAGE.SECTIONS.SECTION_1
        },
        {
            icon: Smartphone,
            data: t.OUR_SERVICES_PAGE.SECTIONS.SECTION_2
        },
        {
            icon: Leaf,
            data: t.OUR_SERVICES_PAGE.SECTIONS.SECTION_3
        },
        {
            icon: TrendingUp,
            data: t.OUR_SERVICES_PAGE.SECTIONS.SECTION_4
        },
        {
            icon: Target,
            data: t.OUR_SERVICES_PAGE.SECTIONS.SECTION_5
        },
        {
            icon: ShieldCheck,
            data: t.OUR_SERVICES_PAGE.SECTIONS.SECTION_6
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-color)',
            paddingBottom: '2rem'
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '0.5rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowLeft size={24} color="#09090A" />
                </button>
                <h1 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    margin: 0,
                    color: '#09090A'
                }}>
                    {t.OUR_SERVICES_PAGE.TITLE}
                </h1>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '1.5rem 1rem'
            }}>
                {/* Introduction */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '24px',
                    color: '#09090A',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.5px',
                        color: '#09090A'
                    }}>
                        {t.OUR_SERVICES_PAGE.TITLE}
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#063514', // Using theme green for the company name for emphasis
                        marginBottom: '1.5rem'
                    }}>
                        {t.OUR_SERVICES_PAGE.COMPANY_NAME}
                    </p>
                    <p style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                        fontSize: '1rem',
                        color: '#4B5563'
                    }}>
                        {t.OUR_SERVICES_PAGE.DESCRIPTION}
                    </p>
                </div>

                {/* Services Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={index}
                                style={{
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'default',
                                    border: '1px solid rgba(0,0,0,0.03)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'var(--light-green)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    <Icon size={30} color="var(--green)" strokeWidth={2.5} />
                                </div>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    color: '#09090A',
                                    marginBottom: '1rem',
                                    lineHeight: '1.4'
                                }}>
                                    {section.data.TITLE}
                                </h3>
                                <p style={{
                                    color: '#4B5563',
                                    marginBottom: '1.25rem',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5'
                                }}>
                                    {section.data.DESC}
                                </p>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }}>
                                    {section.data.POINTS.map((point, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            fontSize: '0.9rem',
                                            color: '#09090A'
                                        }}>
                                            <div style={{
                                                minWidth: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'var(--green)',
                                                marginTop: '8px'
                                            }} />
                                            <span style={{ lineHeight: '1.5' }}>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Why Choose Us & Vision Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* Why Choose Us */}
                    <div style={{
                        background: '#09090A', // Explicit dark background
                        borderRadius: '24px',
                        padding: '2.5rem',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <h3 style={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                marginBottom: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: '0.5rem',
                                    borderRadius: '12px',
                                    display: 'flex'
                                }}>
                                    <CheckCircle2 size={24} color="#4ADE80" />
                                </span>
                                {t.OUR_SERVICES_PAGE.WHY_CHOOSE.TITLE}
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.25rem'
                            }}>
                                {t.OUR_SERVICES_PAGE.WHY_CHOOSE.POINTS.map((point, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        fontSize: '1.05rem',
                                        fontWeight: 500
                                    }}>
                                        <div style={{
                                            background: 'rgba(74, 222, 128, 0.2)',
                                            borderRadius: '50%',
                                            padding: '4px',
                                            display: 'flex'
                                        }}>
                                            <CheckCircle2 size={16} color="#4ADE80" />
                                        </div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Vision */}
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        border: '2px solid var(--light-green)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--light-green)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto'
                        }}>
                            <Search size={40} color="var(--green)" />
                        </div>
                        <h3 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#09090A',
                            marginBottom: '1rem'
                        }}>
                            {t.OUR_SERVICES_PAGE.VISION.TITLE}
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.6',
                            color: '#4B5563',
                            maxWidth: '400px',
                            margin: '0 auto'
                        }}>
                            {t.OUR_SERVICES_PAGE.VISION.DESC}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
