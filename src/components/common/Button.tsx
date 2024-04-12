// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
            className={`shadow-white bg-transparent border-2 border-b-gray-500 px-10 py-2 flex justify-center items-center
             border-l-gray-500 border-t-gray-400 border-r-gray-400 rounded tracking-widest ${className}`}>
            {text}
        </button>
    );
};

export default Button;
