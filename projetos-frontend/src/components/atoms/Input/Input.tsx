import type React from "react";

interface InputProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    error?: string;
    register?: any,
    required?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    error,
    register,
    required = false,
}) => {
    return (
        <div className="input-group">
            {label && (
            <label htmlFor={name} className="input-label"> 
            {label} {required && <span className="required">*</span>}
            </label>
        )}
        <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={`input-field ${error ? 'input-error' : ''}`}
            {...(register && register(name))} 
        />
            {error && <span className="error-message">{error}</span>}
        </div>
        );
};