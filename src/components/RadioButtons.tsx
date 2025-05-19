import React from "react";
import "./RadioButtons.scss";
import cn from "classnames";

type RadioOption = {
	label: string;
	value: string;
};

type RadioGroupProps = {
	name: string;
	options: RadioOption[];
	selectedValue: string;
	onChange: (value: string) => void;
	layout?: "horizontal" | "vertical";
};

const RadioGroup: React.FC<RadioGroupProps> = ({
	name,
	options,
	selectedValue,
	onChange,
	layout = "vertical",
}) => {
	return (
		<div className={`radio-group radio-group--${layout}`}>
			{options.map((option) => {
				return (
					<label key={option.value} className="radio-option">
						<input
							type="radio"
							name={name}
							value={option.value}
							className={cn("radio-input", {
								"radio-input--selected": selectedValue === option.value,
							})}
							onChange={() => onChange(option.value)}
						/>
						<span>{option.label}</span>
					</label>
				);
			})}
		</div>
	);
};

export default RadioGroup;
