import nanoid from "nanoid";
import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { replaceObjInArray } from "../helpers/objectSet";
import { Pizza } from "../interfaces";
import data from "../pizzas.json";
import "./Customize.scss";
import cn from "classnames";

interface pizzaParams {
	pizzaId: string;
}
interface CustomProps {
	cart: Pizza[];
	currentPizza?: Pizza;
	setCart: React.Dispatch<SetStateAction<Pizza[]>>;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	cartTotal: number;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
}
const Customize: React.FC<CustomProps> = ({
	currentPizza,
	setCurrentPizza,
	cart,
	setCart
}) => {
	const params = useParams<pizzaParams>();
	const numParam = parseInt(params.pizzaId) - 1;
	const [ingredientsTotal, setIngredientsTotal] = useState(0);
	const [basesTotal, setBasesTotal] = useState(0);
	const [extrasTotal, setExtrasTotal] = useState(0);
	const [removeTotal, setremoveToppingsTotal] = useState(0);
	const [sizeTotal] = useState(0);

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
								.map(ingredient => ingredient.pricemed)
								.reduce((a, b) => a + b)
						: 0
				);
				setremoveToppingsTotal(
					currentPizza.removeIngredients.length > 0
						? currentPizza.removeIngredients
								.map(ingredient => ingredient.pricemed)
								.reduce((a, b) => a + b)
						: 0
				);
				setBasesTotal(currentPizza.base.pricereg);
			} else {
				setIngredientsTotal(
					currentPizza.extraIngredients.length > 0
						? currentPizza.extraIngredients
								.map(ingredient => ingredient.pricelarge)
								.reduce((a, b) => a + b)
						: 0
				);
				setremoveToppingsTotal(
					currentPizza.removeIngredients.length > 0
						? currentPizza.removeIngredients
								.map(ingredient => ingredient.pricelarge)
								.reduce((a, b) => a + b)
						: 0
				);
				setBasesTotal(currentPizza.base.pricelarge);
			}
		} else {
		}
	}, [currentPizza]);

	useEffect(() => {
		setCurrentPizza(cur => {
			if (cur) {
				return {
					...cur,
					customPrice:
						cur.customSize.price +
						ingredientsTotal -
						removeTotal +
						basesTotal +
						extrasTotal
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
		sizeTotal
	]);
	if (!currentPizza) {
		return <p className="loader">loading</p>;
	}

	return (
		<div className="custom-content">
			<h1 className="custom-heading">{`Customize ${currentPizza.name} pizza`}</h1>

			<div className="card">
				<h2 className="card-headings--size">Select Size</h2>
				<div className="card-items card-size">
					{data.sizes.map(size => (
						<div className="card-items--item" key={size.name}>
							<p className="card-items--item_name">{size.name}</p>
							<input
								type="image"
								src={currentPizza.img}
								className={`card-items--item_img  ${currentPizza.customSize
									.name === size.name && "card-selected"}`}
								alt="pizza-size"
								onClick={() => {
									if (currentPizza.size === "large") {
										if (currentPizza.customSize.name === size.name) {
											setCurrentPizza({
												...currentPizza,
												customSize: {
													...size,
													price: currentPizza.price - size.price
												}
											});
										} else {
											if (currentPizza.customSize.name === "large") {
												setCurrentPizza({
													...currentPizza,
													customPrice:
														currentPizza.customPrice - data.sizes[1].price,
													customSize: {
														...size,
														price:
															currentPizza.price +
															size.price -
															data.sizes[1].price
													}
												});
											} else {
												setCurrentPizza({
													...currentPizza,
													customPrice:
														currentPizza.customPrice -
														data.sizes[0].price +
														size.price,
													customSize: {
														...size,
														price: currentPizza.price
													}
												});
											}
										}
									}
								}}
							/>
						</div>
					))}
				</div>
				<h2 className="card-headings--toppings">Select Extra Toppings</h2>

				<div className="card-items card-ingredients">
					{data.ingredients.map(ingredient => (
						<div className="card-items--item" key={ingredient.name}>
							<p className="card-items--item_name">{ingredient.name}</p>
							<input
								onClick={() => {
									if (currentPizza.extraIngredients.includes(ingredient)) {
										setCurrentPizza({
											...currentPizza,
											extraIngredients: currentPizza.extraIngredients.filter(
												i => i !== ingredient
											)
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
												ingredient
											]
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
								className={`card-items--item_img  ${currentPizza.extraIngredients.includes(
									ingredient
								) && "card-selected"}`}
							/>
						</div>
					))}
					<p className="card-items--price card-items--price-1">{`Price added to pizza: ${ingredientsTotal}`}</p>
				</div>
				<h2 className="card-headings--base">Customize Base</h2>
				<div className="card-items card-bases">
					{data.bases.map(base => (
						<div className="card-items--item" key={base.name}>
							<p className="card-items--item_name">{`${base.name} base`}</p>
							<input
								src={base.img}
								alt="pizza base"
								type="image"
								className={`card-items--item_img ${currentPizza.base.name ===
									base.name && "card-selected"}`}
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

											base: base
										});
									}
								}}
							/>
						</div>
					))}
					<p className="card-items--price">{`Price added to pizza: ${basesTotal}`}</p>
				</div>

				<h2 className="card-headings--extras">Extras</h2>
				<div className="card-items card-extras">
					{data.additional.map(extra => (
						<div className="card-items--item" key={extra.name}>
							<p className="card-items--item_name">{`${extra.name} `}</p>
							<input
								src={extra.img}
								alt={extra.name}
								type="image"
								className={`card-items--item_img  ${currentPizza.extras.includes(
									extra
								) && "card-selected"}`}
								onClick={() => {
									if (currentPizza.extras.includes(extra)) {
										setCurrentPizza({
											...currentPizza,
											extras: currentPizza.extras.filter(i => i !== extra)
										});
										setExtrasTotal(extrasTotal - extra.price);
									} else {
										setCurrentPizza({
											...currentPizza,
											extras: [...currentPizza.extras, extra]
										});
										setExtrasTotal(extrasTotal + extra.price);
									}
								}}
							/>
						</div>
					))}
					<p className="card-items--price">{`Price added to pizza: ${extrasTotal}`}</p>
				</div>

				<h2 className="card-headings--remove">Remove Toppings</h2>

				<div className="card-items card-remove">
					{currentPizza.ingredients.map(ingredient => (
						<div className="card-items--item" key={ingredient.name}>
							<p className="card-items--item_name">{ingredient.name}</p>
							<input
								onClick={() => {
									if (currentPizza.removeIngredients.includes(ingredient)) {
										setCurrentPizza({
											...currentPizza,
											removeIngredients: currentPizza.removeIngredients.filter(
												i => i !== ingredient
											)
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
												ingredient
											]
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
								className={cn("card-items--item_img ", {
									"card-selected": currentPizza.removeIngredients.includes(
										ingredient
									)
								})}
							/>
						</div>
					))}
					<p className="card-items--price">{`Price removed from pizza: ${removeTotal}`}</p>
				</div>
				<p className="card-price">Total: R{currentPizza.customPrice}</p>
				<Link to="/" className="custom-btnlink">
					<button
						onClick={() => {
							setCart(replaceObjInArray(currentPizza, cart));
						}}
						className="custom-btn"
					>
						Save
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Customize;
