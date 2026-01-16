import React, { ReactNode } from 'react';
import './Button.css'; // We will create this

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    icon?: ReactNode;
    gradientColors?: string[];
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    isLoading,
    icon,
    disabled
}) => {
    return (
        <button
            className="btn"
            onClick={onPress}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Loading...' : (
                <>
                    {title}
                    {icon && <span className="icon">{icon}</span>}
                </>
            )}
        </button>
    );
};

export default CustomButton;
