const TextInput = ({ lable, placeholder, className, value, setValue }) => {
  return (
    <div className={`textIputDiv flex flex-col space-y-2 w-full ${className}`}>
      <lable for="lable" className="font-bold ">
        {lable}
      </lable>
      <input
        className="p-3 border-2 rounded border-gray-400 border-solid placeholder-gray-500"
        type="text"
        placeholder={placeholder}
        id="lable"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
