import Deals from "./components/Deals";
import FullMenu from "./components/FullMenu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import styled from "styled-components";
import Cart from "./components/Cart";
import Customize from "./components/Customize";
import { Pizza } from "./interfaces";
import Menu from "./components/Menu";
import "./App.scss";

const App = () => {
	const [menuExtended, setMenuExtended] = useState(false);
	const [cart, setCart] = useState<Pizza[]>(
		JSON.parse(localStorage.getItem("cart") ?? "[]")
	);
	const [currentPizza, setCurrentPizza] = useState();
	const [cartTotal, setCartTotal] = useState(0);
	const [inCart, setInCart] = useState(false);
	const [headerInView, setHeaderInView] = useState(true);
	const [navColor, setNavColor] = useState(false);
	return (
		<Router>
			<Navbar
				inCart={inCart}
				setInCart={setInCart}
				headerInView={headerInView}
				navColor={navColor}
				setNavColor={setNavColor}
			/>
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
							menuExtended={menuExtended}
							setMenuExtended={setMenuExtended}
							cart={cart}
							setCart={setCart}
							currentPizza={currentPizza}
							setCurrentPizza={setCurrentPizza}
							setCartTotal={setCartTotal}
							setNavColor={setNavColor}
						/>

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
					<Cart
						cart={cart}
						setCart={setCart}
						setCurrentPizza={setCurrentPizza}
						currentPizza={currentPizza}
						cartTotal={cartTotal}
						setCartTotal={setCartTotal}
					/>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
