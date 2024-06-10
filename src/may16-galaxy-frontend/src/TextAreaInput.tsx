import { h } from 'preact';

export default function TextAreaInput({ labelTitle, labelStyle, containerStyle, defaultValue, placeholder }) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <textarea defaultValue={defaultValue} className="textarea textarea-bordered w-full" placeholder={placeholder || ""}></textarea>
    </div>
  );
}
