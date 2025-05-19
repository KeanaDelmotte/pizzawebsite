import React, { SetStateAction } from "react";
import "./Navbar.scss";
import CartBtn from "./CartBtn";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";

interface NavProps {
	inCart: boolean;
	setInCart: React.Dispatch<SetStateAction<boolean>>;
	headerInView: boolean;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
	navColor: boolean;
  setShowCartPopup: React.Dispatch<SetStateAction<boolean>>;
}
const Navbar: React.FC<NavProps> = ({
	inCart,
	setInCart,
	headerInView,
	setNavColor,
	navColor,
  setShowCartPopup
}) => {
	let location = useLocation();
	return (
		<nav
			className={cn("nav", {
				"nav-colored": navColor || location.pathname !== "/" || !headerInView,
			})}
		>
			<Link
				to="/"
				className="nav__heading"
				onClick={() => {
					setInCart(false);
				}}
			>
				Red Brick Pizza
			</Link>
			{!inCart && !location.pathname.includes("custom-order") && (
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
        setShowCartPopup={setShowCartPopup}
			/>
		</nav>
	);
};

export default Navbar;
