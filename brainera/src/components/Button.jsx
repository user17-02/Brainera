import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        borderRadius: 'var(--radius-sm)',
        transition: 'var(--transition)',
        cursor: 'pointer',
        border: '1px solid transparent',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--primary-color)',
            color: 'white',
        },
        secondary: {
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
        },
        outline: {
            backgroundColor: 'transparent',
            borderColor: 'var(--primary-color)',
            color: 'var(--primary-color)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
        },
        white: {
            backgroundColor: 'white',
            color: 'var(--primary-color)',
        }
    };

    const sizes = {
        sm: { padding: '6px 12px', fontSize: '14px' },
        md: { padding: '10px 20px', fontSize: '16px' },
        lg: { padding: '14px 28px', fontSize: '18px' },
    };

    const style = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
    };

    return (
        <button style={style} className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;
