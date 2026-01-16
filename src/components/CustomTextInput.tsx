import React, { type ReactNode } from 'react';

interface CustomTextInputProps {
    title?: string;
    placeholder?: string;
    value?: string;
    onChange: (text: string) => void;
    keyboardType?: string;
    autoFocus?: boolean;
    error?: boolean;
    errorMsg?: string;
    maxLength?: number;
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    type?: string;
    leftIcon?: ReactNode;
    containerStyle?: React.CSSProperties;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    title,
    placeholder,
    value,
    onChange,
    error,
    errorMsg,
    maxLength,
    inputMode,
    type = 'text',
    leftIcon,
}) => {
    return (
        <div className="input-group">
            {title && <label>{title}</label>}
            <div className={`input-wrapper ${error ? 'error-border' : ''}`}>
                {leftIcon && <span className="input-icon">{leftIcon}</span>}
                <input
                    type={type}
                    inputMode={inputMode}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                />
            </div>
            {error && <p className="error-text">{errorMsg}</p>}
        </div>
    );
};

export default CustomTextInput;
