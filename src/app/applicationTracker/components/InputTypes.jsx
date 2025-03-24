import { useEffect } from "react";

const InputTypes = ({
  inputType,
  inputKey,
  onInputValueChange,
  options = null,
  show,
  existingValue,
}) => {
  options, "option";
  inputKey, "inputKey";
  inputType, "inputType";
  if (!show) return <></>;
  if (inputType === "text") {
    return (
      <input
        type="text"
        className="text-base px-2 border border-dark-blue p-1 rounded-lg bg-light-mode-bg"
        defaultValue={existingValue}
        onChange={(e) => {
          ("changed");
          onInputValueChange(inputKey, e.target.value);
        }}
      />
    );
  }
  if (inputType === "date") {
    return (
      <input
        type="date"
        className=" text-base px-2 border-dark-blue p-1  rounded-lg bg-light-mode-bg border"
        defaultValue={existingValue}
        onChange={(e) => {
          e.target.value, onInputValueChange(inputKey, e.target.value);
        }}
      />
    );
  }
  if (inputType === "dropdown") {
    useEffect(() => {
      onInputValueChange(inputKey, options[0].value);
    }, []);
    return (
      <select
        className=" text-base px-2 p-1 border-dark-blue rounded-lg bg-light-mode-bg border"
        onChange={(e) => onInputValueChange(inputKey, e.target.value)}
        value={existingValue ? existingValue : options[0].value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  if (inputType === "email") {
    return (
      <input
        type="email"
        className="text-base px-2 p-1 border-dark-blue rounded-lg bg-light-mode-bg border"
        onChange={(e) => onInputValueChange(inputKey, e.target.value)}
        defaultValue={existingValue}
      />
    );
  }
  if (inputType === "phone") {
    return (
      <input
        type="text"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        className="text-base px-2 p-1 border-dark-blue rounded-lg bg-light-mode-bg border"
        defaultValue={existingValue}
        onChange={(e) => onInputValueChange(inputKey, e.target.value)}
      />
    );
  }
  if (inputType === "file") {
    return (
      <input
        type="file"
        className="text-base px-2 rounded-lg bg-light-mode-bg"
        onChange={(e) => onInputValueChange(inputKey, e.target.files[0])}
        defaultValue={existingValue}
      />
    );
  }
  return <p className="">something</p>;
};

export default InputTypes;
