import { h } from 'preact';

export default function ToggleInput({ labelTitle, labelStyle, containerStyle, defaultValue, updateFormValue, updateType }) {
  const handleToggle = () => {
    const newValue = !defaultValue;
    updateFormValue({ updateType, value: newValue });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label cursor-pointer">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
        <input type="checkbox" className="toggle" checked={defaultValue} onChange={handleToggle} />
      </label>
    </div>
  );
}
