import nanoid from "nanoid";
import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { addExtrasToCart, replacePizzaInCart } from "../helpers/objectSet";
import { Pizza, Size, Cart, Extra } from "../interfaces";
import data from "../pizzas.json";
import "./Customize.scss";
import cn from "classnames";
import RadioGroup from "./RadioButtons";
import { FaShoppingCart } from "react-icons/fa";

interface pizzaParams {
	pizzaId: string;
}
interface CustomProps {
	cart: Cart;
	currentPizza?: Pizza;
	setCart: React.Dispatch<SetStateAction<Cart>>;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	cartTotal: number;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
}
const Customize: React.FC<CustomProps> = ({
	currentPizza,
	setCurrentPizza,
	cart,
	setCart,
}) => {
	const params = useParams<pizzaParams>();
	const numParam = parseInt(params.pizzaId) - 1;
	const [ingredientsTotal, setIngredientsTotal] = useState(0);
	const [basesTotal, setBasesTotal] = useState(0);
	const [extrasSelected, setExtrasSelected] = useState<Extra[]>([]);
	const [extrasTotal, setExtrasTotal] = useState(0);
	const [removeTotal, setremoveToppingsTotal] = useState(0);
	const [sizeTotal] = useState(0);
	const [size, setSize] = useState(currentPizza?.customSize.name ?? "large");

	useEffect(() => {
		if (!currentPizza) {
			setCurrentPizza({ ...data.pizzas[numParam], orderId: nanoid() });
		}
	}, [numParam, setCurrentPizza, currentPizza]);

	useEffect(() => {
		if (currentPizza) {
			if (currentPizza.customSize.name === "medium") {
				setIngredientsTotal(
					currentPizza.extraIngredients.length > 0
						? currentPizza.extraIngredients
								.map((ingredient) => ingredient.pricemed)
								.reduce((a, b) => a + b)
						: 0
				);
				setremoveToppingsTotal(
					currentPizza.removeIngredients.length > 0
						? currentPizza.removeIngredients
								.map((ingredient) => ingredient.pricemed)
								.reduce((a, b) => a + b)
						: 0
				);
				setBasesTotal(currentPizza.base.pricereg);
			} else {
				setIngredientsTotal(
					currentPizza.extraIngredients.length > 0
						? currentPizza.extraIngredients
								.map((ingredient) => ingredient.pricelarge)
								.reduce((a, b) => a + b)
						: 0
				);
				setremoveToppingsTotal(
					currentPizza.removeIngredients.length > 0
						? currentPizza.removeIngredients
								.map((ingredient) => ingredient.pricelarge)
								.reduce((a, b) => a + b)
						: 0
				);
				setBasesTotal(currentPizza.base.pricelarge);
			}
		} else {
		}
	}, [currentPizza]);

	useEffect(() => {
		setCurrentPizza((cur) => {
			if (cur) {
				return {
					...cur,
					customPrice:
						cur.customSize.price + ingredientsTotal - removeTotal + basesTotal,
				};
			} else {
				return cur;
			}
		});
	}, [
		ingredientsTotal,
		removeTotal,
		basesTotal,
		extrasTotal,
		setCurrentPizza,
		sizeTotal,
	]);
	if (!currentPizza) {
		return <p className="loader">loading</p>;
	}

	return (
		<div className="custom-content">
			<h1 className="custom-heading">{`Customize your ${currentPizza.name} pizza`}</h1>

			<div className="custom-base">
				<h2 className="custom-subHeading">Customize Base</h2>

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

						setCurrentPizza({
							...currentPizza,
							customSize: {
								...matchingSize,
								price: currentPizza.price + matchingSize.price,
								measurementCm: matchingSize.measurementCm,
							},
							customPrice: currentPizza.price + matchingSize.price,
						});
					}}
					layout="horizontal"
				/>
				<div className="custom-base_type">
					<div className="custom-base_items">
						{data.bases.map((base) => (
							<div className="custom-items_item" key={base.name}>
								<p className="custom-items_item_name">{`${base.name} base`}</p>
								<input
									src={base.img}
									alt="pizza base"
									type="image"
									className={`custom-items_item_img ${
										currentPizza.base.name === base.name &&
										"custom-items_item--selected"
									}`}
									onClick={() => {
										if (currentPizza.base === base) {
										} else {
											setBasesTotal(
												currentPizza.customSize.name === "medium"
													? base.pricereg
													: base.pricelarge
											);
											setCurrentPizza({
												...currentPizza,
												base: base,
											});
										}
									}}
								/>
							</div>
						))}
					</div>
				</div>
				<hr className="custom-line" />
				<p className="custom-value">{`Price added to pizza: R${basesTotal}`}</p>
			</div>

			<div className="custom-extras">
				<h2 className="custom-subHeading custom-extras_heading">Extras</h2>
				<div className="custom-extras_items">
					{data.additional.map((extra) => (
						<div className="custom-items_item" key={extra.name}>
							<p className="custom-items_item_name">{`${extra.name}`}</p>
							<input
								src={extra.img}
								alt={extra.name}
								type="image"
								className={`custom-items_item_img  ${
									extrasSelected.find((e) => e.name === extra.name) &&
									"custom-items_item--selected"
								}`}
								onClick={() => {
									if (extrasSelected.find((e) => e.name === extra.name)) {
										setExtrasSelected(
											extrasSelected.filter((e) => e.name !== extra.name)
										);
										setExtrasTotal(extrasTotal - extra.price);
									} else {
										setExtrasSelected([...extrasSelected, extra]);
										setExtrasTotal(extrasTotal + extra.price);
									}
									// cart = increaseExtrasInCart(extra, cart);
									// if (currentPizza.extras.includes(extra)) {
									// 	setCurrentPizza({
									// 		...currentPizza,
									// 		extras: currentPizza.extras.filter((i) => i !== extra),
									// 	});
									// 	setExtrasTotal(extrasTotal - extra.price);
									// } else {
									// 	setCurrentPizza({
									// 		...currentPizza,
									// 		extras: [...currentPizza.extras, extra],
									// 	});
									// 	setExtrasTotal(extrasTotal + extra.price);
									// }
								}}
							/>
						</div>
					))}
				</div>
				<hr className="custom-line" />
				<p className="custom-value">{`Price added to pizza: R${extrasTotal}`}</p>
			</div>
			<div className="custom-ingredients">
				<h2 className="custom-subHeading">Select Extra Toppings</h2>
				<div className="custom-ingredients_items">
					{data.ingredients.map((ingredient) => (
						<div className="custom-items_item" key={ingredient.name}>
							<p className="custom-items_item_name">{ingredient.name}</p>
							<input
								onClick={() => {
									if (currentPizza.extraIngredients.includes(ingredient)) {
										setCurrentPizza({
											...currentPizza,
											extraIngredients: currentPizza.extraIngredients.filter(
												(i) => i !== ingredient
											),
										});
										setIngredientsTotal(
											currentPizza.customSize.name === "medium"
												? ingredientsTotal - ingredient.pricemed
												: ingredientsTotal - ingredient.pricelarge
										);
									} else {
										setCurrentPizza({
											...currentPizza,
											extraIngredients: [
												...currentPizza.extraIngredients,
												ingredient,
											],
										});
										setIngredientsTotal(
											currentPizza.customSize.name === "medium"
												? ingredientsTotal + ingredient.pricemed
												: ingredientsTotal + ingredient.pricelarge
										);
									}
								}}
								type="image"
								src={ingredient.img}
								alt="ingredient"
								className={`custom-items_item_img  ${
									currentPizza.extraIngredients.includes(ingredient) &&
									"custom-items_item--selected"
								}`}
							/>
						</div>
					))}
				</div>
				<hr className="custom-line" />

				<p className="custom-value">{`Price added to pizza: R${ingredientsTotal}`}</p>
			</div>

			<div className="custom-remove">
				<h2 className="custom-subHeading">Remove Toppings</h2>

				<div className="custom-remove_items">
					{currentPizza.ingredients.map((ingredient) => (
						<div className="custom-items_item" key={ingredient.name}>
							<p className="custom-items_item_name">{ingredient.name}</p>
							<input
								onClick={() => {
									if (currentPizza.removeIngredients.includes(ingredient)) {
										setCurrentPizza({
											...currentPizza,
											removeIngredients: currentPizza.removeIngredients.filter(
												(i) => i !== ingredient
											),
										});
										setremoveToppingsTotal(
											removeTotal -
												(currentPizza.customSize.name === "medium"
													? ingredient.pricemed
													: ingredient.pricelarge)
										);
									} else {
										setCurrentPizza({
											...currentPizza,
											removeIngredients: [
												...currentPizza.removeIngredients,
												ingredient,
											],
										});
										setremoveToppingsTotal(
											removeTotal +
												(currentPizza.customSize.name === "medium"
													? ingredient.pricemed
													: ingredient.pricelarge)
										);
									}
								}}
								type="image"
								src={ingredient.img}
								alt="ingredient"
								className={cn("custom-items_item_img ", {
									"custom-items_item--selected":
										currentPizza.removeIngredients.includes(ingredient),
								})}
							/>
						</div>
					))}
				</div>
				<hr className="custom-line" />

				<p className="custom-value">{`Price removed from pizza: R${removeTotal}`}</p>
			</div>
			<p className="custom-total">Total: R{currentPizza.customPrice}</p>
			<Link to="/" className="custom-cart">
				<button
					onClick={() => {
						// setCart(replacePizzaInCart(currentPizza, cart));
						setCart(
							addExtrasToCart(
								extrasSelected,
								replacePizzaInCart(currentPizza, cart)
							)
						);
					}}
					className="custom-cart_btn"
				>
					<FaShoppingCart className="grid-card_actions--icon grid-card_actions--cart-icon" />
					Add to Cart
				</button>
			</Link>
		</div>
	);
};

export default Customize;
