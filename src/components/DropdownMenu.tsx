import React, { SetStateAction } from "react";
import data from "../pizzas.json";
import "./DropdownMenu.scss";
import { Pizza } from "../interfaces.js";

interface DropdownProps {
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	pizza: Pizza;
	currentPizza: Pizza | undefined;
	selectedPizza: Pizza;
	setSelectedPizza: React.Dispatch<SetStateAction<Pizza>>;
}
const DropdownMenu: React.FC<DropdownProps> = ({
	setCurrentPizza,
	pizza,
	currentPizza,
	selectedPizza,
	setSelectedPizza
}) => {
	return (
		<div className="dropdown">
			<select
				className="dropdown-menu"
				defaultValue="Large"
				onChange={e => {
					e.target.value === "Large"
						? setSelectedPizza({
								...pizza,
								customSize: {
									...data.sizes[1],
									price: pizza.price - data.sizes[0].price
								},
								customPrice: pizza.price - data.sizes[0].price
						  })
						: setSelectedPizza({
								...pizza,
								customSize: {
									...data.sizes[0],
									price: pizza.price - data.sizes[1].price
								},
								customPrice: pizza.price - data.sizes[1].price
						  });
				}}
			>
				{data.sizes.map(size => (
					<option
						key={size.name}
						value={size.name}
						className="dropdown-menu--opt"
						// selected={size.name === "large" ? true : false}
					>
						{size.name[0].toUpperCase() + size.name.substring(1)}
					</option>
				))}
			</select>
		</div>
	);
};

export default DropdownMenu;
