/**
 * Fetches the user's IP address from an external service
 * Falls back to a static IP if the fetch fails
 */
export const getUserIP = async (): Promise<string> => {
    try {
        // Try to get IP from ipify service
        const response = await fetch('https://api.ipify.org?format=json');
        if (response.ok) {
            const data = await response.json();
            return data.ip || getStaticIP();
        }
    } catch (error) {
        console.warn('Failed to fetch IP address:', error);
    }
    
    // Fallback to static IP
    return getStaticIP();
};

/**
 * Returns a static IP address as fallback
 */
export const getStaticIP = (): string => {
    // Using a common static IP for web clients
    return '192.168.1.1';
};

