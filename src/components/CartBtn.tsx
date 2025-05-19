import React, { SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/CartBtn.scss";

interface CartBtnProps {
	inCart: boolean;
	setInCart: React.Dispatch<SetStateAction<boolean>>;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
	headerInView: boolean;
	setShowCartPopup: React.Dispatch<SetStateAction<boolean>>;
}
const CartBtn: React.FC<CartBtnProps> = ({
	inCart,
	setInCart,
	setNavColor,
	headerInView,
	setShowCartPopup,
}) => {
	const { pathname } = useLocation();

	if (pathname === "/cart/") {
		return null;
	}
	return (
		<div
			// to={`/cart/`}
			className="content-cart "
			onClick={() => {
				setShowCartPopup(true);
				// setInCart(true);
			}}
		>
			<button className="content-cart--btn nav__item">Cart</button>
		</div>
	);
};

export default CartBtn;
