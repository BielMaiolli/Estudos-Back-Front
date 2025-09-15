import type React from "react";

interface LoadingProps {
    message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
    message = 'Carregando...'
}) => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-message">{message}</p>
        </div>
    );
};