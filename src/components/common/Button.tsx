

interface ButtonProps {
    text: string;
    className: string;
    type?: string | undefined;
    onClick: () => void;
    disabled: boolean;
}

const Button = ({text, className, onClick, disabled, type='submit'}:ButtonProps) => {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`bg-blue-900 px-6 py-2 rounded block ${className}`}>
            {text}
        </button>
    );
};

export default Button;
