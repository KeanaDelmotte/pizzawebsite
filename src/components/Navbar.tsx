import React, { SetStateAction } from "react";
import "./Navbar.scss";
import CartBtn from "./CartBtn";
import { Link } from "react-router-dom";
import cn from "classnames";

interface NavProps {
	inCart: boolean;
	setInCart: React.Dispatch<SetStateAction<boolean>>;
	headerInView: boolean;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
	navColor: boolean;
}
const Navbar: React.FC<NavProps> = ({
	inCart,
	setInCart,
	headerInView,
	setNavColor,
	navColor
}) => {
	setNavColor(!headerInView);
	return (
		<nav
			className={cn("nav", {
				"nav-colored": navColor || inCart
			})}
		>
			<Link
				to="/"
				className="nav__heading"
				onClick={() => {
					setInCart(false);
					setNavColor(!headerInView);
				}}
			>
				<span className=" nav__heading-B">P</span>izza
				<span className=" nav__heading-P"> M</span>e
			</Link>
			{!inCart && (
				<>
					<a href="#menu" className="nav__item nav__item--1">
						Menu
					</a>

					<a href="#contact" className="nav__item nav__item--2">
						Contact
					</a>
				</>
			)}

			<CartBtn
				inCart={inCart}
				setInCart={setInCart}
				setNavColor={setNavColor}
				headerInView={headerInView}
			/>
		</nav>
	);
};

export default Navbar;
