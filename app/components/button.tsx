type ButtonProps = {
    cargando: boolean;
    onClick: (value: any) => void
    disabled: boolean
    text: string
};

function Button({ text, cargando, onClick, disabled }: ButtonProps) {

    const loading = (show: boolean) => {
        if (show) {
            return (
                <div className="spinner-border text-light spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )
        } else {
            return text;
        }
    }

    return (
        <button className="btn btn-primary" type="button" onClick={onClick} disabled={disabled}>{loading(cargando)}</button>
    );
}

export default Button;
