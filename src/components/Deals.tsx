import React from "react";
import "./Deals.scss";
import dealdata from "../deals.json";
import { Deal } from "../interfaces";
import FlipCard from "./FlipCard";

const Deals: React.FC = () => {
	return (
		<section className="deals" id="deals">
			<h1 className="deals__heading">Amazing Deals</h1>
			{dealdata.deals.map((deal: Deal) => (
				<FlipCard deal={deal} key={deal.name} />
			))}
		</section>
	);
};

export default Deals;
