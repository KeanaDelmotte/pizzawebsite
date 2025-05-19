import React, { SetStateAction } from "react";
import "./FullMenu.scss";
import { Base, Pizza, Extra, Ingredient } from "../interfaces";
import data from "../pizzas.json";
import { FaEnvira } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface FullMenuProps {
	menuExtended: boolean;
	setMenuExtended: React.Dispatch<SetStateAction<boolean>>;
}
const FullMenu: React.FC<FullMenuProps> = ({
	menuExtended,
	setMenuExtended,
}) => {
	const bases: Base[] = data.bases;
	const pizzas: Pizza[] = data.pizzas;
	const extras: Extra[] = data.additional;
	const toppings: Ingredient[] = data.ingredients;
	return (
		<div className="fullMenu" id="fullMenu">
			<hr className=" menu-topline menu-topline--1" />
			<hr className=" menu-topline menu-topline--2" />

			<div className="menu-two">
				<picture className="menu-two__background-left">
					{/* <source
						src="img/pizza-with-pepper-and-cheese-1253737.jpg"
						type="image/jpg"
					/> */}
					<img
						src="img/shaian-ramesht-exSEmuA7R7k-unsplash.jpg"
						className="menu-two__background-left--img"
						alt="butlers"
					/>
				</picture>

				<section className="menu">
					<MdClose
						className="menu-close"
						onClick={() => {
							setMenuExtended(!menuExtended);
						}}
					/>
					<h3 className="menu-headingreg">Regular</h3>
					<p className="menu-headingreg-size">26cm</p>
					<h3 className="menu-headinglarge">Large</h3>
					<p className="menu-headinglarge-size">32cm</p>

					<h2 className=" menu__basesheading">About the Base</h2>

					<h1 className="menu__heading">World's Best Pizza</h1>
					<h2 className=" menu__freedelivery">Free delivery!</h2>
					<ul className=" menu__bases">
						{bases.map((base) => (
							<li className="menu-item " key={base.name}>
								<span className="menu-item__title">{`${base.name} base`}</span>
								<hr className="menu-item__divider" />
								<span className="menu-item__description">
									{base.description}
								</span>
								<span className="menu-item__price menu-item__price--regular">
									{base.pricereg}
								</span>
								<span className="menu-item__price menu-item__price--large">
									{base.pricelarge}
								</span>
							</li>
						))}
					</ul>

					<h3 className="menu__mainmenu">Main Menu</h3>

					<ul className=" menu__main">
						{pizzas.map((pizza) => (
							<li className="menu-item" key={pizza.orderId}>
								{pizza.lowCarb && (
									<img
										src="./img/logo-carb--black.png"
										alt="low carb"
										className=" menu-item__icon menu-item__icon--start"
									/>
								)}
								<div className="menu-item--icons">
									{pizza.vegeterian && <FaEnvira className="menu-item__icon" />}
								</div>

								<span className="menu-item__title">{pizza.name}</span>
								<hr className="menu-item__divider" />
								<span className="menu-item__description">
									{pizza.description}
								</span>
								<span className="menu-item__price menu-item__price--regular">
									{pizza.price}
								</span>
								<span className="menu-item__price menu-item__price--large">
									{pizza.price + data.sizes[1].price}
								</span>
							</li>
						))}
					</ul>

					<h2 className="menu__drinksheading">Drinks and Treats</h2>

					<ul className="menu__drinks">
						{extras.map((extra) => (
							<li className="menu-item" key={extra.name}>
								<span className="menu-item__title">
									{extra.name}{" "}
									<span className="menu__drinks--size1">{extra.size}</span>
								</span>
								<hr className="menu-item__divider" />
								<span className="menu-item__price">{extra.price}</span>
							</li>
						))}
					</ul>

					<h2 className="menu__toppingsheading">Extra Toppings</h2>

					<ul className=" menu__toppings">
						<li className="menu-item">
							<span className="menu-item__title">
								{toppings.map((ingredient) => ingredient.name).join(", ")}
							</span>
							<span className="menu-item__price menu-item__price--regular">
								R10
							</span>
							<span className="menu-item__price menu-item__price--large">
								R15
							</span>
						</li>
					</ul>

					<ul className="menu__icon">
						<li className="menu__icon-item">
							<FaEnvira />
							<span className="menu__icon-item--text">Vegeterian</span>
						</li>
					</ul>
				</section>
			</div>

			<hr className="menu-bottomline menu-bottomline--2" />

			<hr className=" menu-bottomline menu-bottomline--1" />
		</div>
	);
};

export default FullMenu;
