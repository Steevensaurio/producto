const Input = ({ id, name, className, type, placeholder, onChange }) => {
  return (
    <input
      onChange={onChange}
      id={id}
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
