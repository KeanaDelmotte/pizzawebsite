import React, { SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { Pizza } from "../interfaces";
import "./Cart.scss";
import { useHistory } from "react-router-dom";
import { deleteFromArr, decreasePizza, addToArr } from "../helpers/objectSet";

interface CartProps {
	cart: Pizza[];
	setCart: React.Dispatch<SetStateAction<Pizza[]>>;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	cartTotal: number;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
	currentPizza: Pizza;
}

const Cart: React.FC<CartProps> = ({
	setCurrentPizza,
	cartTotal,
	cart,
	setCart,
	setCartTotal
}) => {
	const history = useHistory();
	const cartFilled = cart.length > 0;

	return (
		<div className="cart-content">
			<h1 className="cart-heading">Shopping Cart</h1>
			{cartFilled && (
				<div className="cart">
					{cart.map(pizza => (
						<div className="cart-item" key={pizza.orderId}>
							<h2 className="cart-item--heading">{pizza.name}</h2>

							<img
								src={`/img/pizza-${pizza.name}.jpg`}
								alt="pizza"
								className="cart-item--img"
							/>
							<p className="cart-item--description">
								{pizza.ingredients
									.filter(
										ingredient => !pizza.removeIngredients.includes(ingredient)
									)
									.map(ingredient => ingredient.name)
									.join(", ")}
							</p>
							<p className="cart-item--size">{pizza.customSize.name}</p>
							<h2 className="cart-item--headingbase">Pizza Base</h2>
							<p className="cart-item--base">{pizza.base.name}</p>
							<h2 className="cart-item--headingtoppings">Extra Toppings</h2>
							<p className="cart-item--toppings">
								{pizza.extraIngredients.length > 0
									? pizza.extraIngredients
											.map(ingredient => ingredient.name)
											.join(", ")
									: "None"}
							</p>
							<h2 className="cart-item--headingextra">Addtional items</h2>
							<p className="cart-item--extra">
								{pizza.extras.length > 0
									? pizza.extras.map(ingredient => ingredient.name).join(", ")
									: "None"}
							</p>
							<h2 className="cart-item--headingremoved">Removed Toppings</h2>
							<p className="cart-item--removed">
								{pizza.removeIngredients.length > 0
									? pizza.removeIngredients
											.map(ingredient => ingredient.name)
											.join(", ")
									: "None"}
							</p>
							<button
								className="cart-item--deletebtn"
								onClick={() => {
									setCart(deleteFromArr(pizza, cart));
									setCartTotal(cartTotal - pizza.customPrice);
								}}
							>
								<MdClose className="cart-item--deletebtn_icon" />
							</button>
							<button
								className="cart-item--customizebtn"
								onClick={() => {
									setCurrentPizza(pizza);
									history.push(`/custom-order/${pizza.id}`);
								}}
							>
								customize
							</button>
							<div className="cart-item--amount">
								<button
									className="cart-item--amount_decrease"
									onClick={() => {
										setCart(decreasePizza(pizza, cart));
										setCartTotal(cartTotal - pizza.customPrice);
									}}
								>
									-
								</button>
								<p className="cart-item--amount_display">{pizza.amount}</p>
								<button
									className="cart-item--amount_increase"
									onClick={() => {
										setCart(addToArr(pizza, cart));
										setCartTotal(cartTotal + pizza.customPrice);
									}}
								>
									+
								</button>
							</div>
						</div>
					))}
					<button
						onClick={() => {
							setCart([]);
							setCartTotal(0);
						}}
						className="cart-clearbtn"
					>
						Clear cart
					</button>
				</div>
			)}

			{!cartFilled && (
				<h2 className="cart-empty">You have nothing in your cart</h2>
			)}
			<h2 className="cart-total">{`Cart total : ${cartTotal}`}</h2>
		</div>
	);
};

export default Cart;
