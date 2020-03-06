import React, { SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/CartBtn.scss";

interface CartBtnProps {
	inCart: boolean;
	setInCart: React.Dispatch<SetStateAction<boolean>>;
	setNavColor: React.Dispatch<SetStateAction<boolean>>;
	headerInView: boolean;
}
const CartBtn: React.FC<CartBtnProps> = ({
	inCart,
	setInCart,
	setNavColor,
	headerInView
}) => {
	const { pathname } = useLocation();

	if (pathname === "/cart/") {
		return null;
	}
	return (
		<Link
			to={`/cart/`}
			className="content-cart "
			onClick={() => {
				setInCart(true);
			}}
		>
			<button className="content-cart--btn nav__item">Cart</button>
		</Link>
	);
};

export default CartBtn;
