import React, { SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { Pizza, Cart } from "../interfaces";
import "./Cart.scss";
import {
	removePizzaFromCart,
	addPizzaToCart,
	decreasePizzaInCart,
	decreaseExtrasInCart,
	addExtrasToCart,
	removeExtraFromCart,
} from "../helpers/objectSet";
import cn from "classnames";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import CartItem from "./CartItem";
import "./CartItem.scss";

interface CartProps {
	cart: Cart;
	setCart: React.Dispatch<SetStateAction<Cart>>;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	cartTotal: number;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
	currentPizza: Pizza;
	showAsPopup?: boolean;
	setShowCartPopup: React.Dispatch<SetStateAction<boolean>>;
}

const SCart: React.FC<CartProps> = ({
	setCurrentPizza,
	cartTotal,
	cart,
	setCart,
	setCartTotal,
	setShowCartPopup,
	showAsPopup = false,
}) => {
	const cartFilled = cart.pizzas.length > 0 || cart.extras.length > 0;

	return (
		<div
			className={cn(
				{ "cart-content": !showAsPopup },
				{ "cart-content--popup": showAsPopup }
			)}
		>
			<div
				className={cn("cart-heading-container", {
					"cart-heading-container--popup": showAsPopup,
				})}
			>
				<h1 className="cart-heading">Shopping Cart</h1>
				{showAsPopup && (
					<button
						className="cart-dismiss"
						onClick={() => setShowCartPopup(false)}
					>
						<FaTimes size={25} />
					</button>
				)}
			</div>

			{cartFilled && !showAsPopup && (
				<div className={cn("cart", { "cart--popup": showAsPopup })}>
					{cart.pizzas.map((pizza) => (
						<div
							className={cn("cart-item", { "cart-item--popup": showAsPopup })}
							key={pizza.orderId}
						>
							<h2
								className={cn("cart-item--heading", {
									"cart-item--heading--popup": showAsPopup,
								})}
							>
								{pizza.name}
							</h2>

							<img
								src={`/img/pizza-${pizza.name}.jpg`}
								alt="pizza"
								className={cn("cart-item--img", {
									"cart-item--img--popup": showAsPopup,
								})}
							/>
							<p
								className={cn("cart-item--description", {
									"cart-item--description--popup": showAsPopup,
								})}
							>
								{pizza.ingredients
									.filter(
										(ingredient) =>
											!pizza.removeIngredients.includes(ingredient)
									)
									.map((ingredient) => ingredient.name)
									.join(", ")}
							</p>
							<p className="cart-item--size">{pizza.customSize.name}</p>
							<h2
								className={cn("cart-item--headingbase", {
									"cart-item--headingbase--popup": showAsPopup,
								})}
							>
								Pizza Base
							</h2>
							<p className="cart-item--base">{pizza.base.name}</p>
							<h2
								className={cn("cart-item--headingtoppings", {
									"cart-item--headingtoppings--popup": showAsPopup,
								})}
							>
								Extra Toppings
							</h2>
							<p className="cart-item--toppings">
								{pizza.extraIngredients.length > 0
									? pizza.extraIngredients
											.map((ingredient) => ingredient.name)
											.join(", ")
									: "None"}
							</p>
							{/* <h2
								className={cn("cart-item--headingextra", {
									"cart-item--headingextra--popup": showAsPopup,
								})}
							>
								Addtional items
							</h2>
							<p className="cart-item--extra">
								{pizza.extras.length > 0
									? pizza.extras.map((ingredient) => ingredient.name).join(", ")
									: "None"}
							</p> */}
							<h2
								className={cn("cart-item--headingremoved", {
									"cart-item--headingremoved--popup": showAsPopup,
								})}
							>
								Removed Toppings
							</h2>
							<p className="cart-item--removed">
								{pizza.removeIngredients.length > 0
									? pizza.removeIngredients
											.map((ingredient) => ingredient.name)
											.join(", ")
									: "None"}
							</p>
							<button
								className={cn("cart-item--deletebtn cart-item_btn", {
									"cart-item--deletebtn--popup": showAsPopup,
								})}
								onClick={() => {
									setCart(removePizzaFromCart(pizza, cart));
									setCartTotal(cartTotal - pizza.customPrice);
								}}
							>
								<FaTimes />
							</button>
							{/* <button
								className="cart-item--customizebtn"
								onClick={() => {
									setCurrentPizza(pizza);
									history.push(`/custom-order/${pizza.id}`);
								}}
							>
								customize
							</button> */}
							<div className="cart-item--amount">
								<button
									className="cart-item--amount_decrease cart-item_btn"
									onClick={() => {
										setCart(decreasePizzaInCart(pizza, cart));
										setCartTotal(cartTotal - pizza.customPrice);
									}}
								>
									<FaMinus />
								</button>
								<p className="cart-item--amount_display">{pizza.amount}</p>
								<button
									className="cart-item--amount_increase cart-item_btn"
									onClick={() => {
										setCart(addPizzaToCart(pizza, cart));
										setCartTotal(cartTotal + pizza.customPrice);
									}}
								>
									<FaPlus />
								</button>
							</div>
						</div>
					))}
					{cart.extras.map((extra) => {
						return (
							<div className="cart-order-extra">
								<h1 className="cart-order-extra_name">{extra.name}</h1>
								<button
									className={"cart-item_btn cart-order-extra_remove"}
									onClick={() => {
										setCart(removeExtraFromCart(extra, cart));
										setCartTotal(cartTotal - extra.price);
									}}
								>
									<FaTimes />
								</button>
								<p className="cart-order-extra_price">{`${extra.currency}${extra.price}`}</p>
								<div className="cart-order-extra_amount">
									<button
										className="cart-item_btn cart-order-extra_amount-decrease"
										onClick={() => {
											if (extra.amount > 0) {
												setCart(decreaseExtrasInCart(extra, cart));
												setCartTotal(cartTotal - extra.price);
											}
										}}
									>
										<FaMinus />
									</button>
									<p className="cart-order-extra_amount-number">
										{extra.amount}
									</p>
									<button
										className="cart-item_btn cart-order-extra_amount-increase"
										onClick={() => {
											setCart(addExtrasToCart([extra], cart));
											setCartTotal(cartTotal + extra.price);
										}}
									>
										<FaPlus />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
			{cartFilled && showAsPopup && (
				<div className="cart">
					{cart.pizzas.map((pizza) => (
						<div className="cart-order">
							<CartItem
								pizza={pizza}
								cart={cart}
								setCart={setCart}
								cartTotal={cartTotal}
								setCartTotal={setCartTotal}
							/>
						</div>
					))}
					{cart.extras.map((extra) => {
						return (
							<div className="cart-order-extra">
								<h1 className="cart-order-extra_name">{extra.name}</h1>
								<button
									className={"cart-item_btn cart-order-extra_remove"}
									onClick={() => {
										setCart(removeExtraFromCart(extra, cart));
										setCartTotal(cartTotal - extra.price);
									}}
								>
									<FaTimes />
								</button>
								<p className="cart-order-extra_price">{`${extra.currency}${extra.price}`}</p>
								<div className="cart-order-extra_amount">
									<button
										className="cart-item_btn cart-order-extra_amount-decrease"
										onClick={() => {
											if (extra.amount > 0) {
												setCart(decreaseExtrasInCart(extra, cart));
												setCartTotal(cartTotal - extra.price);
											}
										}}
									>
										<FaMinus />
									</button>
									<p className="cart-order-extra_amount-number">
										{extra.amount}
									</p>
									<button
										className="cart-item_btn cart-order-extra_amount-increase"
										onClick={() => {
											setCart(addExtrasToCart([extra], cart));
											setCartTotal(cartTotal + extra.price);
										}}
									>
										<FaPlus />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* {cartFilled &&
				} */}
			{cartFilled && (
				<div className="cart-btns">
					<button
						onClick={() => {
							setCart({ pizzas: [], extras: [] });
							setCartTotal(0);
						}}
						className="cart-btn cart-clearbtn"
					>
						Clear cart
					</button>
					<button className="cart-btn cart-checkoutbtn">Checkout</button>
				</div>
			)}

			{!cartFilled && (
				<h2 className="cart-empty">You have nothing in your cart</h2>
			)}
			<h2 className="cart-total">{`Cart total : R${cartTotal}`}</h2>
		</div>
	);
};

export default SCart;
