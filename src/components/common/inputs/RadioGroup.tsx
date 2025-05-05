import React from "react";
import { useFormikContext } from "formik";

type Option = { id: number; name: string };
type Props   = { name: string; options: Option[] };

export const RadioGroup: React.FC<Props> = ({ name, options }) => {
  const formik   = useFormikContext<any>();
  const selected = formik.values[name];

  return (
    <div className="radio-group">
      <p className="radio-group__title">Select your position</p>
      {options.map((option) => (
        <label key={option.id} className="radio">
          <input
            type="radio"
            name={name}
            value={option.id}
            checked={selected === option.id}
            onChange={() => formik.setFieldValue(name, option.id)}
          />
          <span className="radio__custom-round" />
          <span className="radio__text">{option.name}</span>
        </label>
      ))}
    </div>
  );
};