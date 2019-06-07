var slideIdArray = ["intro","consent","personal","address","bankingInfo","employment","thankYou"];
var emailPattern = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
var phoneNumberPattern = new RegExp("/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$");
var postalCodePattern = new RegExp("\d{5}([ \-]\d{4})?");
var nycPostalCodePattern = new RegExp("(10|11)\d{3}");
var financialAccountPattern = new RegExp("\d{9}");
var slideIdx = 0;

function updateErrorMessage(message) {
	$("#errorMessage").html("Error: " + message);
	$("#errorMessage").removeClass("d-none");
};

function hideErrorMessage() { $("#errorMessage").addClass("d-none"); };

var noAdditionalValidation = function() { return true; };

var consentValidation = function() {
	if (!($("#consentCheck").is(":checked"))) {
		updateErrorMessage("You need to confirm Terms and Conditions")
		return false;
	}
	return true;
};

var personalValidation = function() {
	var firstName = $("#firstNameInput").val();
	var lastName = $("#lastNameInput").val();
	var email = $("#emailInput").val();
	var phoneNumber = $("#personalPhoneNumber").val();

	if (firstName === "" || lastName === "") {
		updateErrorMessage("You need to provide your full name");
		return false;
	} else if (!emailPattern.test(email)) {
		updateErrorMessage("You need to provide a valid Email");
		return false;
	} else if (!phoneNumberPattern.test(phoneNumber)) {
		updateErrorMessage("You need to provide a valid phone number");
		return false;
	} else {
		return true;
	}
};

var addressValidation = function() {
	var streetAddress = $("#streetAddress").val();
	var postalCode = $("#postalCode").val();

	if (streetAddress === "") {
		updateErrorMessage("You need to provide a street address");
		return false;
	} else if (!postalCodePattern.test(postalCode)) {
		updateErrorMessage("You need to provide");
		return false;
	} else if (!nycPostalCodePattern.test(postalCode)) {
		updateErrorMessage("We're only open for NYC at this time");
		return false;
	} else {
		return true;
	}
};

var bankingInfoValidation = function() {
	var routingId = $("#routingId").val();
	var accountId = $("#accountId").val();
 
	if (!financialAccountPattern.test(routingId)) {
		updateErrorMessage("You need to provide a Routing ID");
		return false;
	} else if (!financialAccountPattern.test(accountId)) {
		updateErrorMessage("You need to provide your Account ID");
		return false;
	} else {
		return true;
	}
};

var employmentValidation = function() {
	var employer = $("#employer").val();
	var employerNumber = $("#employerNumber").val();
	var file = $("#otherProof").val();

 	if (employer === "") {
		updateErrorMessage("You need to provide your employer");
		return false;
	} else if (!phoneNumberPattern.test(employerNumber) || !file === "") {
		updateErrorMessage("You need to either provide your employer's phone number or other proof of employment")
		return false;
	}
	return true;
};

var slideValidation = [noAdditionalValidation, consentValidation, personalValidation, addressValidation, bankingInfoValidation, employmentValidation, noAdditionalValidation ];

$("#backButton").addClass("d-none");
$("#submitButton").addClass("d-none");
$("#nextButton").removeClass("d-none");

$("#nextButton").click(function() {
	var validationFunction = slideValidation[slideIdx];
	if(!(validationFunction())) {
		return;
	}

	hideErrorMessage();
	$("#"+slideIdArray[slideIdx]).addClass("d-none");
	slideIdx = slideIdx + 1;
	$("#"+slideIdArray[slideIdx]).removeClass("d-none");

	if (slideIdx > 0) {
		$("#backButton").removeClass("d-none");
	}
	if (slideIdx === 5) {
		$("#nextButton").addClass("d-none");
		$("#submitButton").removeClass("d-none");
	}
});

$("#backButton").click(function() {
	hideErrorMessage();
	$("#"+slideIdArray[slideIdx]).addClass("d-none");
	slideIdx = slideIdx - 1;
	$("#"+slideIdArray[slideIdx]).removeClass("d-none");

	if (slideIdx === 0) {
		$("#backButton").addClass("d-none");
		$("#nextButton").removeClass("d-none");
	}

	if (slideIdx === 4) {
		$("#nextButton").removeClass("d-none");		
	}
	$("#submitButton").addClass("d-none");	
});
