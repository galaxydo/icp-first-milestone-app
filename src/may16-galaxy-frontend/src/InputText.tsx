import { h } from 'preact'

export default function InputText({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <input type={type || "text"} value={defaultValue} placeholder={placeholder || ""} className="input input-bordered w-full" />
    </div>
  )
}
