import React, { SetStateAction, useState } from "react";
import { Pizza, Ingredient, Size, Cart } from "../interfaces";
import styled from "styled-components";
import "./GridCard.scss";
import RadioGroup from "./RadioButtons";
import { Link } from "react-router-dom";
import { addPizzaToCart } from "../helpers/objectSet";
import nanoid from "nanoid";
import data from "../pizzas.json";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import cn from "classnames";

interface GridCardProps {
	pizza: Pizza;
	currentPizza: Pizza | undefined;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	cart: Cart;
	setCart: React.Dispatch<SetStateAction<Cart>>;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
	className: String | undefined;
	setShowCartPopup: React.Dispatch<SetStateAction<boolean>>;
}

interface BackgroundContainerProps {
	url: string;
}

const Background = styled.div<BackgroundContainerProps>`
	background: ${(props) => `url("../img/pizza-${props.url}.jpg")`};
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 5px;
	z-index: 1;
`;

export const GridCard: React.FC<GridCardProps> = ({
	pizza,
	setCurrentPizza,
	currentPizza,
	cart,
	setCart,
	setNavColor,
	className,
	setShowCartPopup,
}) => {
	const [size, setSize] = useState("large");
	const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>();

	console.log(selectedPizza);
	return (
		<div className={cn(" grid-card", { className: className !== undefined })}>
			<Background url={pizza.name} className="grid-card_img" />
			<p className="grid-card_title">{pizza.name.toUpperCase()}</p>
			<p className="grid-card_price">{`${pizza.currency}${
				selectedPizza?.name === pizza.name
					? selectedPizza?.customPrice
					: pizza.customPrice
			} `}</p>
			<p className="grid-card_ingredients">
				{getIngredientNames(pizza.ingredients)}
			</p>
			<RadioGroup
				name="Pizza sizes"
				options={data.sizes.map((size) => ({
					label: `${size.name[0].toUpperCase()}${size.name.substring(1)}`,
					value: size.name,
				}))}
				selectedValue={size}
				onChange={(s) => {
					setSize(s);
					const matchingSize: Size = data.sizes.filter(
						(ds) => ds.name === s
					)[0];

					setSelectedPizza({
						...pizza,
						customSize: {
							...matchingSize,
							price: pizza.price + matchingSize.price,
							measurementCm: matchingSize.measurementCm,
						},
						customPrice: pizza.price + matchingSize.price,
					});
				}}
				layout="horizontal"
			/>
			<div className="grid-card_actions">
				<Link
					to={`/custom-order/${pizza.id}`}
					className="grid-card_actions--customize-link"
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<button
						className="grid-card_actions--btn grid-card_actions--customize"
						onClick={() => {
							setNavColor(true);
							if (
								selectedPizza !== undefined &&
								selectedPizza.name === pizza.name
							) {
								const pizzaWithOrderId: Pizza = {
									...selectedPizza,
									orderId: nanoid(),
								};
								setCurrentPizza(pizzaWithOrderId);
							} else {
								const pizzaWithOrderId: Pizza = {
									...pizza,
									orderId: nanoid(),
								};
								setCurrentPizza(pizzaWithOrderId);
							}
						}}
					>
						<FaEdit className="grid-card_actions--icon grid-card_actions--customize-icon" />
						Customize
					</button>
				</Link>
				<button
					className="grid-card_actions--btn grid-card_actions--cart"
					onClick={() => {
						if (selectedPizza !== undefined) {
							if (selectedPizza.name === pizza.name) {
								setCart(addPizzaToCart(selectedPizza, cart));
							} else {
								setCart(addPizzaToCart(pizza, cart));
							}
						} else {
							setCart(addPizzaToCart(pizza, cart));
						}
						setShowCartPopup(true);
					}}
				>
					<FaShoppingCart className="grid-card_actions--icon grid-card_actions--cart-icon" />
					Add to cart
				</button>
			</div>
		</div>
	);
};

function getIngredientNames(ingredients: Ingredient[]): String {
	var ingredientsStr = "";
	ingredients.forEach((ingredient) => {
		if (ingredient.name !== ingredients[ingredients.length - 1].name) {
			ingredientsStr = ingredientsStr.concat(
				`${ingredient.name[0].toUpperCase() + ingredient.name.substring(1)} • `
			);
		} else {
			ingredientsStr = ingredientsStr.concat(
				`${ingredient.name[0].toUpperCase() + ingredient.name.substring(1)}`
			);
		}
		// return " " + ingredient.name[0].toUpperCase() + ingredient.name.substring(1);
	});
	return ingredientsStr;
}
