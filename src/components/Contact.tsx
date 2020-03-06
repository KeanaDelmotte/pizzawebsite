import React from "react";
import "./Contact.scss";
import {
	FiPhone,
	FiMail,
	FiGlobe,
	FiInstagram,
	FiFacebook,
	FiTwitter
} from "react-icons/fi";
import data from "../contact.json";
import { PhoneNumber, Email, Website } from "../interfaces";

const Contact: React.FC = () => {
	const phoneNumbers: PhoneNumber[] = data.phones;
	const emails: Email[] = data.emails;
	const websites: Website[] = data.website;
	return (
		<section id="contact" className="contact">
			<h2 className="contact__heading">Contact Us</h2>
			{phoneNumbers.map(number => (
				<div className="contact-item" key={number.PhoneNumber}>
					<span className="contact-item__title">{number.name}</span>

					<FiPhone className="contact-item__icon" />
					<p className="contact-item__description">{number.PhoneNumber}</p>
				</div>
			))}

			{emails.map(email => (
				<div className="contact-item" key={email.adress}>
					<span className="contact-item__title">{email.name}</span>
					<FiMail className="contact-item__icon" />
					<p className="contact-item__description">{email.adress}</p>
				</div>
			))}

			{websites.map(website => (
				<div className="contact-item" key={website.adress}>
					<span className="contact-item__title">{website.name}</span>
					<FiGlobe className="contact-item__icon" />
					<p className="contact-item__description">{website.adress}</p>
				</div>
			))}

			<div className="contact--social">
				<div className="contact--social-facebook">
					<a
						className="contact--social-facebook_buttontext"
						href="#butlers"
						target="__blank"
						rel="noreferrer noopener"
					>
						<span> @pizzaMe</span>
					</a>

					<a
						className="contact--social-facebook_buttonicon"
						href=" #"
						target="__blank"
						tabIndex={-1}
						aria-label="Go to Facebook Page"
						rel="noreferrer noopener"
					>
						<FiFacebook className="contact--social-facebook_buttonicon-facebook" />
					</a>
				</div>

				<div className="contact--social-twitter">
					<a
						className="contact--social-twitter_buttontext"
						href="#butlers"
						target="__blank"
						rel="noreferrer noopener"
					>
						@pizzaMe
					</a>

					<a
						className="contact--social-twitter_buttonicon"
						href="#butlers"
						target="__blank"
						tabIndex={-1}
						aria-label="Go to Twitter Page"
						rel="noreferrer noopener"
					>
						<FiTwitter className="contact--social-twitter_buttonicon-twitter" />
					</a>
				</div>

				<div className="contact--social-insta">
					<a
						className="contact--social-insta_buttontext"
						href="#butlers"
						target="__blank"
						rel="noreferrer noopener"
					>
						@Pizzamee
					</a>

					<a
						className="contact--social-insta_buttonicon"
						href="#butlers"
						target="__blank"
						tabIndex={-1}
						aria-label="Go to Instagram Page"
						rel="noreferrer noopener"
					>
						<FiInstagram className="contact--social-insta_buttonicon-insta" />
					</a>
				</div>
			</div>
		</section>
	);
};

export default Contact;
