

interface ButtonProps {
    text: string;
}

const Button = ({text}:ButtonProps) => {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <button className="border-t-neutral-50">
            {text}
        </button>
    );
};

export default Button;
