

const Button = ({label, className, children}) => {
    return(
        <button className={className}>{label}{children}</button>
    )
}

export default Button
