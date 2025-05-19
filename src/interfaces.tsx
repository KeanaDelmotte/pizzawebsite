import React from "react";

export interface Pizza {
	name: string;
	vegan: boolean;
	vegeterian: boolean;
	ingredients: Ingredient[];
	base: Base;
	price: number;
	currency: string;
	size: string;
	measurementCm: number;
	id: string;
	extraIngredients: Ingredient[];
	// extras: Extra[];
	removeIngredients: Ingredient[];
	orderId?: string;
	amount: number;
	customPrice: number;
	description: string;
	lowCarb: boolean;
	litePizza: boolean;
	kidFriendly: boolean;
	img: string;
	customSize: Size;
}

export interface Cart {
	pizzas: Pizza[];
	extras: Extra[];
}
export interface Ingredient {
	name: string;
	pricelarge: number;
	pricemed: number;
	img: string;
}

export interface Base {
	name: string;
	ingredients: string[];
	size: string;
	measurementCm: number;
	pricereg: number;
	pricelarge: number;
	currency: string;
	vegan: boolean;
	img: string;
	description: string;
}

export interface Extra {
	name: string;
	price: number;
	currency: string;
	amount: number;
	size: string;
	img: string;
}

export interface Icon {
	name: string;
	img: string;
	nameShort: string;
}

export interface PhoneNumber {
	name: string;
	PhoneNumber: string;
}

export interface Email {
	name: string;
	adress: string;
}
export interface Website {
	name: string;
	adress: string;
}
export interface Size {
	name: string;
	price: number;
	measurementCm: number;
}
export interface Deal {
	name: string;
	info: string;
	save: number;
	price: number;
	currency: string;
	color: string;
}
