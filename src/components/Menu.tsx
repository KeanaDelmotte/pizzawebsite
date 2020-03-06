import React, { useRef, useState, useEffect, SetStateAction } from "react";
import data from "../pizzas.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Ingredient, Pizza } from "../interfaces";
import styled from "styled-components";
import { addToArr } from "../helpers/objectSet";
import { Link } from "react-router-dom";
import nanoid from "nanoid";
import "./Menu.scss";
import DropdownMenu from "./DropdownMenu";

interface styledCompProps {
	url: string;
}
const Background = styled.div<styledCompProps>`
	background: ${props => `url("../img/pizza-${props.url}.jpg")`};
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 5px;
	z-index: 1;
`;
interface MenuProps {
	menuExtended: boolean;
	setMenuExtended: React.Dispatch<SetStateAction<boolean>>;
	cart: Pizza[];
	currentPizza?: Pizza;
	setCart: React.Dispatch<SetStateAction<Pizza[]>>;
	setCurrentPizza: React.Dispatch<SetStateAction<Pizza>>;
	setCartTotal: React.Dispatch<SetStateAction<number>>;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
}
const Menu: React.FC<MenuProps> = ({
	menuExtended,
	setMenuExtended,
	cart,
	setCart,
	setCurrentPizza,
	setCartTotal,
	currentPizza,
	setNavColor
}) => {
	const listRef = useRef<HTMLUListElement>(null);
	const [selectedPizza, setSelectedPizza] = useState();
	let scrollAmount = 905;
	if (window.matchMedia("(max-width: 320px)").matches) {
		scrollAmount = 260;
		console.log("1");
	} else if (window.matchMedia("(max-width: 375px)").matches) {
		scrollAmount = 290;
		console.log("2");
	} else if (window.matchMedia("(max-width: 430px)").matches) {
		scrollAmount = 340;
		console.log("3");
	} else if (window.matchMedia("(max-width: 600px)").matches) {
		scrollAmount = 767;
		console.log("4");
	} else if (window.matchMedia("(max-width: 836px)").matches) {
		scrollAmount = 670;
		console.log("5");
	} else if (window.matchMedia("(max-width: 958px)").matches) {
		scrollAmount = 317;
		console.log("6");
	}

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
		if (cart.length > 0) {
			setCartTotal(
				cart
					.map(pizza =>
						pizza.amount > 1
							? pizza.customPrice * pizza.amount
							: pizza.customPrice
					)
					.reduce((prev, curr) => prev + curr)
			);
		} else {
			setCartTotal(0);
		}
	}, [cart, setCartTotal]);

	return (
		<div className="content" id="menu">
			<h1 className="menulist-heading">Select Pizzas</h1>
			<button
				className="content-backbtn "
				onClick={() => {
					if (listRef.current) {
						listRef.current.scrollBy({
							top: 0,
							left: -scrollAmount,
							behavior: "smooth"
						});
					}
				}}
			>
				<IoIosArrowBack className="content-backbtn--icon" />
			</button>
			<ul className="menulist" ref={listRef}>
				{data.pizzas.map((pizza: Pizza) => (
					<li className={`menulist-item menulist-${pizza.name}`} key={pizza.id}>
						<Background
							url={pizza.name}
							className="menulist-item--img"
						></Background>
						<p className="menulist-item--name">{pizza.name}</p>
						<ul className="menulist-item--ingredients">
							{pizza.ingredients.map((ingredient: Ingredient) => (
								<li
									className="menulist-item--ingredients_ingredient"
									key={ingredient.name}
								>
									{ingredient.name}
								</li>
							))}
						</ul>
						<p className="menulist-item--price">{`${pizza.currency}${
							currentPizza === pizza
								? currentPizza.customPrice
								: pizza.customPrice
						} `}</p>

						<div className="menulist-item--btns">
							<button
								className="menulist-item--btns_cart"
								onClick={() => {
									setSelectedPizza(pizza);
									if (selectedPizza !== undefined) {
										if (selectedPizza.name === pizza.name) {
											setCart(addToArr(selectedPizza, cart));
											setSelectedPizza(undefined);
										} else {
											setCart(addToArr(pizza, cart));
										}
									} else {
										setCart(addToArr(pizza, cart));
									}
								}}
							>
								Add to cart
							</button>
							<Link
								to={`/custom-order/${pizza.id}`}
								className="content-customize"
							>
								<button
									className="menulist-item--btns_custom"
									onClick={() => {
										setNavColor(true);
										if (
											selectedPizza !== undefined &&
											selectedPizza.name === pizza.name
										) {
											const pizzaWithOrderId: Pizza = {
												...selectedPizza,
												orderId: nanoid()
											};
											setCurrentPizza(pizzaWithOrderId);
										} else {
											const pizzaWithOrderId: Pizza = {
												...pizza,
												orderId: nanoid()
											};
											setCurrentPizza(pizzaWithOrderId);
										}
									}}
								>
									Customize
								</button>
							</Link>
						</div>

						<DropdownMenu
							setCurrentPizza={setCurrentPizza}
							pizza={pizza}
							currentPizza={currentPizza}
							selectedPizza={selectedPizza}
							setSelectedPizza={setSelectedPizza}
						/>
					</li>
				))}
				<div className="menulist-last"></div>
			</ul>

			<button
				className="content-nextbtn"
				onClick={() => {
					if (listRef.current) {
						listRef.current.scrollBy({
							top: 0,
							left: scrollAmount,
							behavior: "smooth"
						});
					}
				}}
			>
				<IoIosArrowForward className="content-nextbtn--icon" />
			</button>

			{!menuExtended && (
				<button
					className="content-menubtn"
					onClick={() => {
						setMenuExtended(!menuExtended);
					}}
				>
					View Full Menu
				</button>
			)}
		</div>
	);
};

export default Menu;
