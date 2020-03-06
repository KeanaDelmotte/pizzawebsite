import { Pizza } from "../interfaces";
import nanoid from "nanoid";
const makeComparable = (pizza: Pizza) => {
	const { amount, orderId, ...result } = pizza;
	return result;
};

export const addToArr = (obj: Pizza, arr: Pizza[]): Pizza[] => {
	const duplicate = arr.find(
		pizza =>
			JSON.stringify(makeComparable(pizza)) ===
			JSON.stringify(makeComparable(obj))
	);

	if (duplicate) {
		return arr.map(pizza =>
			pizza.orderId === duplicate.orderId
				? { ...pizza, amount: pizza.amount + 1 }
				: pizza
		);
	} else {
		return [...arr, { ...obj, amount: 1, orderId: nanoid() }];
	}
	// FIrst checks if obj is already in array.
	// If it is, increases the amount of that object instead of inserting it,
	// otherwise generates an id for it, and inserts it along with that id into the array
};

export const deleteFromArr = (obj: Pizza, arr: Pizza[]): Pizza[] => {
	// Finds obj in arr, and removes it.
	// If doesn't exist, throws error saying not found

	return arr.filter(pizza => pizza.orderId !== obj.orderId);
};
export const decreasePizza = (obj: Pizza, arr: Pizza[]): Pizza[] => {
	if (obj.amount > 1) {
		return arr.map(pizza =>
			pizza.orderId === obj.orderId
				? { ...pizza, amount: pizza.amount - 1 }
				: pizza
		);
	} else {
		return deleteFromArr(obj, arr);
	}
};

export const replaceObjInArray = (newObj: Pizza, arr: Pizza[]): Pizza[] => {
	// Finds object in arr, and replaces it with new obj, preserving existing amount
	if (newObj.orderId && arr.find(obj => obj.orderId === newObj.orderId)) {
		return arr.map(pizza =>
			pizza.orderId === newObj.orderId
				? { ...newObj, amount: pizza.amount, orderId: pizza.orderId }
				: pizza
		);
	} else {
		return addToArr(newObj, arr);
	}

	// If doesn't, throw error saying not found
};
