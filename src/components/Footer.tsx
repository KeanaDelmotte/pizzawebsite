import React from "react";
import "./Footer.scss";
const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<img src="img/logo.png" alt="Butlers logo2" className="footer__logo" />

			<p className="footer__disclaimertext">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit deleniti
				sed suscipit, cumque culpa fugiat vero dolore eos accusamus molestiae
				reprehenderit error unde explicabo perferendis est ullam obcaecati
				dignissimos nisi.
			</p>
			<p className="footer__promisetext">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptas
				quae officiis inventore hic. Incidunt, dolore obcaecati debitis
				doloribus optio consequatur, est maiores quibusdam doloremque quia
				nostrum necessitatibus maxime. Minima recusandae quae labore laboriosam
				nisi neque magni quaerat saepe fuga? Tempora, fuga!
			</p>
		</footer>
	);
};
export default Footer;
