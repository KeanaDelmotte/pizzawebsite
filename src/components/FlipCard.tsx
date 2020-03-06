import React, { useState } from "react";
import { Deal } from "../interfaces";
import cn from "classnames";
import "./FlipCard.scss";

interface FlipCardProps {
	deal: Deal;
}

const FlipCard: React.FC<FlipCardProps> = ({ deal }) => {
	const [cardFlipped, setCardFlipped] = useState(false);

	return (
		<div className="deals-card">
			<div
				className={cn("deals-card_inner", {
					"flip-card--front": cardFlipped === true
				})}
			>
				<div
					className={cn(
						"deals-card_inner--front",
						{
							"deals-card_inner--front__red": deal.color === "red"
						},
						{ "deals-card_inner--front__yellow": deal.color === "yellow" }
					)}
				>
					<h3 className={cn("deals-card_inner--front__heading")}>
						{deal.name}
					</h3>
					<button
						className="deals-card_inner--front__btn"
						onClick={() => {
							setCardFlipped(true);
						}}
					>
						View deal info
					</button>
				</div>
				<div className="deals-card_inner--back">
					<p className="deals-card_inner--back__info">{deal.info}</p>
					<p className="deals-card_inner--back__save">{`Save ${deal.currency}${deal.save}`}</p>
					<p className="deals-card_inner--back__price">{`${deal.currency}${deal.price}`}</p>
					<button
						className="deals-card_inner--back__btn"
						onClick={() => {
							setCardFlipped(false);
						}}
					>
						Hide deal info
					</button>
				</div>
			</div>
		</div>
	);
};

export default FlipCard;
