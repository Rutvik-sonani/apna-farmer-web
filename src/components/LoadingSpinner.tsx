import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
    text?: string;
}

const LoadingSpinner = ({ size = 'md', fullScreen = false, text }: LoadingSpinnerProps) => {
    const spinner = (
        <div className={`spinner-container ${fullScreen ? 'fullscreen' : ''}`}>
            <div className={`spinner spinner-${size}`}>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
            </div>
            {text && <p className="spinner-text">{text}</p>}
        </div>
    );

    return spinner;
};

export default LoadingSpinner;
