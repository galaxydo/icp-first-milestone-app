import { h } from 'preact';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';

export default function SelectBox({ labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options }) {
  return (
    <div className={`inline-block ${containerStyle}`}>
      <label className={`label ${labelStyle}`}>
        <div className="label-text">{labelTitle}
          {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className='w-4 h-4' />
            </div>
          )}
        </div>
      </label>
      <select className="select select-bordered w-full" value={defaultValue}>
        <option disabled value="PLACEHOLDER">{placeholder}</option>
        {options.map((option, index) => (
          <option value={option.value || option.name} key={index}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
