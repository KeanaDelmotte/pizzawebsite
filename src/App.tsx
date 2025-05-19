import Deals from "./components/Deals";
import FullMenu from "./components/FullMenu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SCart from "./components/Cart";
import Customize from "./components/Customize";
import { Pizza, Cart } from "./interfaces";
import Menu from "./components/Menu";
import "./App.scss";
import cn from "classnames";

const App = () => {
	const [menuExtended, setMenuExtended] = useState(false);
	const [cart, setCart] = useState<Cart>(
		JSON.parse(localStorage.getItem("cart") ?? "{\"pizzas\": [], \"extras\": []}")
	);
	const [currentPizza, setCurrentPizza] = useState();
	const [cartTotal, setCartTotal] = useState(0);
	const [inCart, setInCart] = useState(false);
	const [headerInView, setHeaderInView] = useState(true);
	const [navColor, setNavColor] = useState(false);
	const [showCartPopup, setShowCartPopup] = useState(false);

	useEffect(() => {
		if (showCartPopup) {
			document.body.classList.add("noscroll");
		} else {
			document.body.classList.remove("noscroll");
		}
	});
	console.log(cart);
	return (
		<Router>
			<div
				className={cn("overlay", { "overlay--active": showCartPopup })}
				onClick={() => {
					setShowCartPopup(false);
				}}
			/>
			<Navbar
				inCart={inCart}
				setInCart={setInCart}
				headerInView={headerInView}
				navColor={navColor}
				setNavColor={setNavColor}
        setShowCartPopup={setShowCartPopup}
			/>
			{showCartPopup && (
				<SCart
					cart={cart}
					setCart={setCart}
					setCurrentPizza={setCurrentPizza}
					currentPizza={currentPizza}
					cartTotal={cartTotal}
					setCartTotal={setCartTotal}
					setShowCartPopup={setShowCartPopup}
					showAsPopup={true}
				/>
			)}

			<Switch>
				<Route exact path="/">
					<div className="container">
						<Header
							setInCart={setInCart}
							headerInView={headerInView}
							setHeaderInView={setHeaderInView}
						/>
						<Deals />
						<Menu
							cart={cart}
							setCart={setCart}
							currentPizza={currentPizza}
							setCurrentPizza={setCurrentPizza}
							setCartTotal={setCartTotal}
							setNavColor={setNavColor}
							setShowCartPopup={setShowCartPopup}
						/>
						{!menuExtended && (
							<a href="#fullMenu" className="content-full-menu-link">
								<button
									className="content-menubtn"
									onClick={() => {
										setMenuExtended(!menuExtended);
									}}
								>
									View Full Menu
								</button>
							</a>
						)}
						{menuExtended && (
							<FullMenu
								menuExtended={menuExtended}
								setMenuExtended={setMenuExtended}
							/>
						)}
						<Contact />
						<Footer />
					</div>
				</Route>
				<Route path="/custom-order/:pizzaId">
					<Customize
						cart={cart}
						setCart={setCart}
						currentPizza={currentPizza}
						setCurrentPizza={setCurrentPizza}
						cartTotal={cartTotal}
						setCartTotal={setCartTotal}
					></Customize>
				</Route>
				<Route path="/cart/">
					<SCart
						cart={cart}
						setCart={setCart}
						setCurrentPizza={setCurrentPizza}
						currentPizza={currentPizza}
						cartTotal={cartTotal}
						setCartTotal={setCartTotal}
						setShowCartPopup={setShowCartPopup}
					/>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
