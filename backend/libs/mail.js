var nodemailer = require('nodemailer');

module.exports = function(to, from, subject, text){
	// enabling smtp service(use your own credential)
	var smtpTransport = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		auth: {
			user: "md.abud.kamil@gmail.com",
			pass: "toshisabri"
		}
	});
	// user your own credention for testing
	var mailOptions = {
		to: to,
		from: from,
		subject: subject,
		text: text
	};

	return smtpTransport.sendMail(mailOptions);
}