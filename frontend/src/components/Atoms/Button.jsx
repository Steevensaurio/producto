const Button = ({ label, className, children, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
      {children}
    </button>
  );
};

export default Button;
