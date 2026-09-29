import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const contactDetails = [
	{
		Icon: FiMapPin,
		label: "News, Editorial and Commercial Department",
		value:
			"Khan Plaza (8th Floor 9-C), 205/4 Fakirpool, Culbert Road, Motijheel, Dhaka-1000",
	},
	{
		Icon: FiMail,
		label: "Email",
		value: "dhakardak.mn@gmail.com",
		href: "mailto:dhakardak.mn@gmail.com",
	},
	{
		Icon: FiPhone,
		label: "Telephone",
		value: "01302613982",
		href: "tel:01302613982",
		additionalHref: "tel:01730586423",
		additionalValue: "01730586423",
	},
];

export const socialIcons = [
	{ label: "Facebook", Icon: FaFacebookF },
	{ label: "X", Icon: FaXTwitter },
	{ label: "Instagram", Icon: FaInstagram },
	{ label: "YouTube", Icon: FaYoutube },
];
