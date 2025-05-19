import React, { SetStateAction } from "react";
import { Pizza, Cart } from "../interfaces";
import {
	removePizzaFromCart,
	decreasePizzaInCart,
	addPizzaToCart,
} from "../helpers/objectSet";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
interface CartItemProps {
	pizza: Pizza;
	cart: Cart;
	setCart: React.Dispatch<SetStateAction<Cart>>;
	cartTotal: number;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
}

const CartItem: React.FC<CartItemProps> = ({
	pizza,
	cart,
	setCart,
	cartTotal,
	setCartTotal,
}) => {
	return (
		<div className="popup-cart-item">
			<div className="popup-cart-item_header">
				<h1>{pizza.name}</h1>
				<button
					className="cart-item_btn popup-cart-item_remove"
					onClick={() => {
						setCart(removePizzaFromCart(pizza, cart));
						setCartTotal(cartTotal - pizza.customPrice);
					}}
				>
					<FaTimes />
				</button>
			</div>
			<div className="popup-cart-item_ingredients">
				{pizza.ingredients.map((ingredient) => {
					if (
						!pizza.removeIngredients.find((i) => i.name === ingredient.name)
					) {
						return (
							<p className="popup-cart-item_ingredient">{ingredient.name}</p>
						);
					}
				})}
				{pizza.removeIngredients.map((removedI) => (
					<p className="popup-cart-item_removedI">{`-${removedI.name} `}</p>
				))}
				{pizza.extraIngredients.map((extraI) => (
					<p className="popup-cart-item_addedI">{` +${extraI.name}`}</p>
				))}
			</div>
			<p className="popup-cart-item_base">{`${
				pizza.customSize.name
			} ${pizza.base.name.toLowerCase()} base`}</p>
			<div className="popup-cart-item_bottom">
				<p className="popup-cart-item_price">{`${pizza.currency}${
					pizza.customPrice * pizza.amount
				}`}</p>
				<div className="popup-cart-item_amount">
					<button
						className="cart-item_btn popup-cart-item_amount-decrease"
						onClick={() => {
							setCart(decreasePizzaInCart(pizza, cart));
							setCartTotal(cartTotal - pizza.customPrice);
						}}
					>
						<FaMinus />
					</button>
					<p className="popup-cart-item_amount-number">{pizza.amount}</p>
					<button
						className="cart-item_btn popup-cart-item_amount-increase"
						onClick={() => {
							setCart(addPizzaToCart(pizza, cart));
							setCartTotal(cartTotal + pizza.customPrice);
						}}
					>
						<FaPlus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
