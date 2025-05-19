import React, { SetStateAction, useEffect } from "react";
import "./Header.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useInView } from "react-intersection-observer";
interface HeaderProps {
	setInCart: React.Dispatch<SetStateAction<boolean>>;
	setHeaderInView: React.Dispatch<SetStateAction<boolean>>;
	headerInView: boolean;
}
const Header: React.FC<HeaderProps> = ({
	setInCart,
	setHeaderInView,
	headerInView
}) => {
	const [ref, inView] = useInView({
		threshold: 0.08
	});

	useEffect(() => {
		setHeaderInView(inView);
	}, [inView, setHeaderInView]);
	setInCart(false);
	return (
		<header className="header " ref={ref} id="butlers">
			<h1 className="header__title">Real Ingredients, Real Flavour</h1>

			<picture className="header__background ">
				<source srcSet="./img/pizza-header.jpg" type="image/jpg" />
				<img
					className="header__background-image"
					alt="cheese pizza"
					src="./img/pizzza-header.jpg"
				/>
			</picture>
			<a href="#deals" className="header__btn">
				<IoIosArrowDown className="header__btn--icon" />
			</a>
		</header>
	);
};

export default Header;
