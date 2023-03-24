import React from 'react';

interface Props {
  checkedState: boolean;
  togglerText: string;
  updateStateHandler: () => void;
  disabled?: boolean;
}
const Toggler = ({ checkedState, updateStateHandler, togglerText, disabled }: Props) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer mb-2">
      <input type="checkbox" checked={checkedState} className="sr-only peer" onChange={updateStateHandler} disabled={disabled} />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 ">{togglerText}</span>
    </label>
  );
};

export default Toggler;
