import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, MapPin } from 'lucide-react';

interface WeatherCardProps {
    temperature: number;
    weatherCode: number;
    locationName?: string;
    loading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temperature, weatherCode, locationName = 'Jaipur, Rajasthan', loading = false }) => {

    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    const getWeatherIcon = (code: number) => {
        if (code === 0 || code === 1) return <Sun size={32} color="#FFD700" />; // Clear, Main Clear
        if (code === 2 || code === 3) return <Cloud size={32} color="#A0A0A0" />; // Partly cloudy, overcast
        if (code >= 45 && code <= 48) return <Wind size={32} color="#888888" />; // Fog
        if (code >= 51 && code <= 67) return <CloudRain size={32} color="#4682B4" />; // Drizzle, Rain
        if (code >= 71 && code <= 77) return <CloudSnow size={32} color="#E0FFFF" />; // Snow
        if (code >= 80 && code <= 82) return <CloudRain size={32} color="#4682B4" />; // Showers
        if (code >= 95 && code <= 99) return <CloudLightning size={32} color="#FFA500" />; // Thunderstorm
        return <Sun size={32} color="#FFD700" />;
    };

    const getWeatherDescription = (code: number) => {
        if (code === 0) return 'Clear sky';
        if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
        if (code >= 45 && code <= 48) return 'Foggy';
        if (code >= 51 && code <= 67) return 'Rainy';
        if (code >= 71 && code <= 77) return 'Snowy';
        if (code >= 80 && code <= 82) return 'Rain showers';
        if (code >= 95 && code <= 99) return 'Thunderstorm';
        return 'Clear';
    };

    if (loading) {
        return (
            <div style={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80px'
            }}>
                <span style={{ color: 'var(--sub-title)' }}>Loading weather...</span>
            </div>
        );
    }

    return (
        <div style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.5)'
        }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <MapPin size={16} color="var(--green)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--title)' }}>
                        {locationName}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--title)' }}>
                        {temperature}°C
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--sub-title)' }}>
                        {getWeatherDescription(weatherCode)}
                    </span>
                </div>
            </div>
            <div style={{
                background: 'white',
                padding: '0.75rem',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                {getWeatherIcon(weatherCode)}
            </div>
        </div>
    );
};

export default WeatherCard;
