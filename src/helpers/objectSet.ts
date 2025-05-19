import { Pizza, Extra, Cart } from "../interfaces";
import nanoid from "nanoid";
const makeComparable = (pizza: Pizza) => {
	const { amount, orderId, ...result } = pizza;
	return result;
};

export const addPizzaToCart = (pizza: Pizza, cart: Cart): Cart => {
	const duplicate = cart.pizzas.find(
		(p) =>
			JSON.stringify(makeComparable(p)) ===
			JSON.stringify(makeComparable(pizza))
	);

	if (duplicate) {
		return {
			...cart,
			pizzas: cart.pizzas.map((pizza) =>
				pizza.orderId === duplicate.orderId
					? { ...pizza, amount: pizza.amount + 1 }
					: pizza
			),
		};
	} else {
		return {
			...cart,
			pizzas: [...cart.pizzas, { ...pizza, amount: 1, orderId: nanoid() }],
		};
	}
	// FIrst checks if obj is already in array.
	// If it is, increases the amount of that object instead of inserting it,
	// otherwise generates an id for it, and inserts it along with that id into the array
};

export const addExtraToCart = (extra: Extra, cart: Cart): Cart => {
	const matchingExtra = cart.extras.find((e) => e.name === extra.name);

	if (matchingExtra) {
		return {
			...cart,
			extras: cart.extras.map((e) =>
				e.name === matchingExtra.name ? { ...e, amount: e.amount + 1 } : e
			),
		};
	} else {
		return { ...cart, extras: [...cart.extras, { ...extra, amount: 1 }] };
	}
};

export const removePizzaFromCart = (pizza: Pizza, cart: Cart): Cart => {
	// Finds obj in arr, and removes it.
	// If doesn't exist, throws error saying not found

	return {
		...cart,
		pizzas: cart.pizzas.filter((p) => p.orderId !== pizza.orderId),
	};
};
export const decreasePizzaInCart = (pizza: Pizza, cart: Cart): Cart => {
	if (pizza.amount > 1) {
		return {
			...cart,
			pizzas: cart.pizzas.map((p) =>
				p.orderId === pizza.orderId
					? { ...pizza, amount: pizza.amount - 1 }
					: pizza
			),
		};
	} else {
		return removePizzaFromCart(pizza, cart);
	}
};

export const removeExtraFromCart = (extra: Extra, cart: Cart): Cart => {
	return { ...cart, extras: cart.extras.filter((e) => e.name !== extra.name) };
};

export const decreaseExtrasInCart = (extra: Extra, cart: Cart): Cart => {
	const matchingExtra = cart.extras.find((e) => e.name === extra.name);
	if (matchingExtra && matchingExtra.amount > 1) {
		return {
			...cart,
			extras: cart.extras.map((e) =>
				e.name === matchingExtra.name ? { ...e, amount: e.amount - 1 } : e
			),
		};
	} else {
		return removeExtraFromCart(extra, cart);
	}
};

export const increaseExtrasInCart = (extra: Extra, cart: Cart): Cart => {
	const matchingExtra = cart.extras.find((e) => e.name === extra.name);
	if (matchingExtra) {
		cart = {
			...cart,
			extras: [
				...cart.extras.filter((e) => e.name !== extra.name),
				{ ...matchingExtra, amount: matchingExtra.amount + 1 },
			],
		};
	}
	return cart;
};

export const addExtrasToCart = (extras: Extra[], cart: Cart): Cart => {
	let c = cart;
	extras.forEach((e) => (c = addExtraToCart(e, c)));
	return c;
};

export const replacePizzaInCart = (newPizza: Pizza, cart: Cart): Cart => {
	// Finds object in arr, and replaces it with new obj, preserving existing amount
	if (
		newPizza.orderId &&
		cart.pizzas.find((obj) => obj.orderId === newPizza.orderId)
	) {
		return {
			...cart,
			pizzas: cart.pizzas.map((pizza) =>
				pizza.orderId === newPizza.orderId
					? { ...newPizza, amount: pizza.amount, orderId: pizza.orderId }
					: pizza
			),
		};
	} else {
		return addPizzaToCart(newPizza, cart);
	}

	// If doesn't, throw error saying not found
};
