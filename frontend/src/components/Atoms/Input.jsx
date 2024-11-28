const Input = ({ id, name, className, type, placeholder, onChange, min=""}) => {
  return (
    <input
      onChange={onChange}
      id={id}
      name={name}
      className={className}
      type={type}
      min={min}
      placeholder={placeholder}
    />
  );
};

export default Input;
