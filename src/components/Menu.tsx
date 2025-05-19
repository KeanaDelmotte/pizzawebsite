import React, { useRef, useEffect, SetStateAction } from "react";
import data from "../pizzas.json";
import { Pizza, Cart } from "../interfaces";
import styled from "styled-components";
import "./Menu.scss";
import { GridCard } from "./GridCard";
interface styledCompProps {
	url: string;
}
const Background = styled.div<styledCompProps>`
	background: ${(props) => `url("../img/pizza-${props.url}.jpg")`};
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 5px;
	z-index: 1;
`;
interface MenuProps {
	cart: Cart;
	setCart: React.Dispatch<SetStateAction<Cart>>;
	currentPizza?: Pizza;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
	setShowCartPopup: React.Dispatch<SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({
	cart,
	setCart,
	currentPizza,
	setCurrentPizza,
	setCartTotal,
	setNavColor,
	setShowCartPopup,
}) => {
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
		if (cart.pizzas.length > 0 || cart.extras.length > 0) {
			setCartTotal(
				[
					...cart.pizzas.map((pizza) =>
						pizza.amount > 1
							? pizza.customPrice * pizza.amount
							: pizza.customPrice
					),
					...cart.extras.map((extra) =>
						extra.amount > 1 ? extra.price * extra.amount : extra.price
					),
				].reduce((prev, curr) => prev + curr)
			);
		} else {
			setCartTotal(0);
		}
	}, [cart, setCartTotal]);

	return (
		<div className="content" id="menu">
			<h1 className="menulist-heading">Select Pizzas</h1>
			<ul className="menulist" ref={listRef}>
				{data.pizzas.map((pizza: Pizza) => (
					<GridCard
						pizza={pizza}
						currentPizza={currentPizza}
						setCurrentPizza={setCurrentPizza}
						cart={cart}
						setCart={setCart}
						setCartTotal={setCartTotal}
						setNavColor={setNavColor}
						className={"menu-item"}
						setShowCartPopup={setShowCartPopup}
					/>
				))}
			</ul>
		</div>
	);
};

export default Menu;
