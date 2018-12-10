// I used the jQuery ready event function in case the script was moved.
$(function() {

/****************************** JOB ROLE SECTION *********************************/

	$('#other-title').hide(); // Hides the 'other' job role unless it is selected;

	// This function uses the select:selected pseudo class and removes the class 'is-hidden'	
	//  if the value matches with 'other' option then it adds the class else it removes that class.
	const selectField = () => {
		let $selectedOption = $('#title option:selected').val();

		if ( $selectedOption === 'other' ) {
			// the removeClass is used because the CSS has a visibility: hidden.
			$('#other-title').show();
		} else {
			// if it does not match 'other' then I addClass to the selected element.
			$('#other-title').hide();
		}
	};

	$('#title').on('change', selectField);

/********************************* T-SHIRT INFO ***********************************/

// Remove the color options in the Global scope to disable the color dropdown menu.
	const $colors = $('#colors-js-puns').addClass('is-hidden');

 
// This function toggle between js puns and js heart when you select it and shows the proper color.
	const toggleFields = () => {
	// I used this as the Local scope for this function.
		$colors.removeClass('is-hidden');
		const $designs = $('#design option').first().addClass('is-hidden');
		const $themes = $('#color option').remove();

		if ($('#design').val() === 'js puns') {
			$('#color').append(`
			  	<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
              	<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
              	<option value="gold">Gold (JS Puns shirt only)</option> 
          	`);
		} else if ( $("#design").val() === 'heart js') {
			$('#color').append(`
				<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
              	<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
              	<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
			`);
		} else {
			$('#color').append(`
			  	<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
              	<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
              	<option value="gold">Gold (JS Puns shirt only)</option> 
          	`);
		}
	};
	// Calls the function on the js puns or js heart.
	$('#design').on('change', toggleFields);


/*   *****************    REGISTER FOR ACTIVITIES Cost *******************    */

// Append span tag with the input field on the .activities page using unobtrusive javascript.
	$('.activities').append(`<span class="total-sum"><input type="text" name="amount" class="amount"></span>`);

// Hide the span when page loads
	$('.total-sum').addClass('is-hidden');	

// This function takes the checked checkboxes and add them by getting the value attribute.
	const addSum = (event) => {
		let total = 0;
		$('.total-sum').removeClass('is-hidden');
		$('.total-sum').addClass('total-sum');

		$('input[type=checkbox]:checked').each(function () {
			total += parseInt( $(this).val() );	
		});

		if ( total === 0 ) {
			$('.amount').val('');
		} else {
			$('.amount').val('Amount: ' + '$ '+ total);
		}
	};
// Calls the addSum function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', addSum);


/*    **************** REGISTER FOR ACTIVITIES Time Conflict ***************     */

// This function selects the label or deselect the same time the workshop is held.
	const timeConflict = (workshopName, Workshop) => {
		if ( $(workshopName).prop("checked") ) {
			Workshop.addClass('disabled');
		} else {
			Workshop.removeClass('disabled');
		}
	};
// This function disables the checkbox when the workshop has the same time.
	const disableCB = (inputName, WorkshopOff) => {
		if ( $(inputName).prop("checked") ) {
			WorkshopOff.prop('disabled', true);		
		} else {
			WorkshopOff.prop('disabled', false);		
		}
	};

// This function call both timeConflict and disableCB when user checks the checkbox.
	const sameTime = () => {
		// list variables needed for this function.
		const $jsFrameworks = $('.activities label').eq(1);
		const $jsFrameworksOff = $('input[name="js-frameworks"]');
		const $jsLibs = $('.activities label').eq(2);
		const $jsLibsOff = $('input[name="js-libs"]');
		const $express = $('.activities label').eq(3);
		const $expressOff = $('input[name="express"]');
		const $node = $('.activities label').eq(4);
		const $nodeOff = $('input[name="node"]');

// Calls the function when the checkbox is selected and is removed when not checked.
		timeConflict($jsFrameworksOff, $express); 
		disableCB($jsFrameworksOff, $expressOff); 

		timeConflict($expressOff, $jsFrameworks);
		disableCB($expressOff, $jsFrameworksOff);

		timeConflict($jsLibsOff, $node);
		disableCB($jsLibsOff, $nodeOff);

		timeConflict($nodeOff, $jsLibs);
		disableCB($nodeOff, $jsLibsOff);
			
	};
		
// Calls the sameTime function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', sameTime);

/*   *****************         PAYMENT INFO SECTION       *******************    */

// Add the class to the select payment to hide that selection.
	const $creditCard = $('div#credit-card').addClass('is-hidden');
// Assign variables to retrieve the element when called.
	const $byCredit = $('#payment option').eq(1).val();
	const $payPal = $('div p').eq(0).addClass('is-hidden');		
	const $bitCoin = $('div p').eq(1).addClass('is-hidden');
// This function shows what payment the users has selected. 
	const makePayment = () => {
		if ( $('#payment option:selected').val() === 'credit card' ) {
			$creditCard.removeClass('is-hidden');
			// $creditCard.is(true);
			$payPal.addClass('is-hidden');
			$bitCoin.addClass('is-hidden');
		} else if ( $('#payment option:selected').val() === 'paypal' ) {
			$payPal.removeClass('is-hidden');
			// $payPal.is(true);
			$bitCoin.addClass('is-hidden');
			$creditCard.addClass('is-hidden');
		} else if ( $('#payment option:selected').val() === 'bitcoin' ) {
			$bitCoin.removeClass('is-hidden');
			// $bitCoin.is(true);
			$creditCard.addClass('is-hidden');
			$payPal.addClass('is-hidden');
		} else {
			$creditCard.addClass('is-hidden');
			$payPal.addClass('is-hidden');
			$bitCoin.addClass('is-hidden');
		}
	};


// Assign a handler to the select option dropdown menu
	$('#payment').on('change', makePayment);

/*   *****************         VALIDATE FORM      *******************    */	

// Assign the form into a jquery variable.
	const $form = $('form');
// Call the fast feedback.
	enableFastFeedback($form);

// Submit form if all validation is correct.
	$form.submit(function(event) { 
		const name = $('#name').val();
		const email = $('#mail').val();
		const isChecked = $('.activities input[type="checkbox"]').is(':checked');
		const isSelected = $('#payment option').is(':selected');
		const ccNum = $('#cc-num').val();
		const zip = $('#zip').val();
		const cvv = $('#cvv').val();
		const payPal = $('#payment option:selected').val();
		const bitCoin = $('#payment option:selected').val();

		validateNameField( name, event );
		validateEmailField( email, event );
		validateCheckboxField( isChecked, event );
		validateDropdownField( isSelected, event );
		validateCCNumField( ccNum, event );
		validateZipField( zip, event );
		validateCvvField( cvv, event );

	}); // Close the form function
}); // closing the jQuery ready function.

// This section is the variables for the fast feedback form submission.
const enableFastFeedback = (formElement) => {
	const nameInput  = formElement.find('#name');
	const emailInput = formElement.find('#mail');
	const checkboxInput = formElement.find('.activities legend');
	const ccNumInput = formElement.find('#cc-num');
	const zipInput   = formElement.find('#zip');
	const cvvInput   = formElement.find('#cvv');

// This section enables the fast feedback on certain input before the form submission.
	nameInput.blur(function(event) {
		let name = $(this).val();
		validateNameField(name, event);

		if ( !isValidName(name) ) {
		    	$('.user-name').text('Please enter at least two characters.');
		} else {
				$('.user-name').text('');
			   }
	});
	emailInput.blur(function(event) {
		let email = $(this).val();
		validateEmailField(email, event);

		if ( !isValidEmail(email) ) {
	    	$('.user-email').text('Please enter a valid email address.');
		} else {
			$('.user-email').text('');
	  	}
	});
	checkboxInput.change(function(event) {
		let isChecked = $(this).is(":checked");
		validateCheckboxField( checkbox, event );

		if (!isChecked) {
	    	$('.activities legend').addClass('error');		
		} else {
			$('.activities legend').removeClass('error');
	  	}
		
	});
	ccNumInput.blur(function(event) {
		let ccNum = $(this).val();
		validateCCNumField(ccNum, event);
		event.preventDefault();

		if ( !isValidCCNum(ccNum) ) {
	    	$('.user-ccNum').text('Need 13 - 16 digits.');		
		} else {
			$('.user-ccNum').text('');
	  	}
	});
	zipInput.blur(function(event) {
		let zip = $(this).val();
		validateZipField(zip, event);
		event.preventDefault();

		if ( !isValidZip(zip) ) {
	    	$('.user-zip').text('Need 5 digits.');
		} else {
			$('.user-zip').text('');
	  	}
	});
	cvvInput.blur(function(event) {
		let cvv = $(this).val();
		validateCvvField(cvv, event);
		event.preventDefault();

		if ( !isValidCvv(cvv) ) {
	    	$('.user-cvv').text('Need 3 digits.');
		} else {
			$('.user-cvv').text('');
	  	}
	});

}; // This is the end of the fast form input validation.

// Validate form input function on neccessary inputs. 
const validateNameField = (name, event) => {
	if ( !isValidName(name) ) {
	    $('#name').addClass('invalid');
		$('label[for="name"]').addClass('error');
		event.preventDefault();
	} else {
		$('#name').removeClass('invalid');
		$('label[for="name"]').removeClass('error');
	}
};
const validateEmailField = (email, event) => {
	if ( !isValidEmail(email) ) {
	    $('#mail').addClass('invalid');
		$('label[for="mail"]').addClass('error');
		event.preventDefault();
	} else {
		$('#mail').removeClass('invalid');
		$('label[for="mail"]').removeClass('error');
	}
};
const validateCheckboxField = ( isChecked, event ) => {
	if (!isChecked) {
		$('.activities legend').addClass('error');
		event.preventDefault();
	} else {
		$('.activities legend').removeClass('error');
	}
};
const validateDropdownField = ( isSelected, event ) => {
	let $selectMethod = $('#payment option:selected').val();
	const $varifyCard = validateCCNumField + validateZipField + validateCvvField;
	if ($selectMethod === 'select_method') {
		$('.payment-info legend').addClass('error');
		event.preventDefault();
	} else if ($selectMethod === 'credit card') {
		return $varifyCard;
	} else if ($selectMethod === payPal) {
		return true;
	} else if ($selectMethod === bitCoin) {
		return true;
	} else {
		$('.payment-info legend').removeClass('error');
		return true;
	} 
};											
const validateCCNumField = ( ccNum, event ) => {
	if ( !isValidCCNum(ccNum) ) {
		$('#cc-num').addClass('invalid');
		$('label[for="cc-num"]').addClass('error');
		event.preventDefault();
	} else {
		$('#cc-num').removeClass('invalid');
		$('label[for="cc-num"]').removeClass('error');
	}

};
const validateZipField = ( zip, event ) => {
	if ( !isValidZip(zip) ) {
		$('#zip').addClass('invalid');
		$('label[for="zip"]').addClass('error');
		event.preventDefault();
	} else {
		$('#zip').removeClass('invalid');
		$('label[for="zip"]').removeClass('error');
	}

};
const validateCvvField = ( cvv, event ) => {
	if ( !isValidCvv(cvv) ) {
		$('#cvv').addClass('invalid');
		$('label[for="cvv"]').addClass('error');
		event.preventDefault();
	} else {
		$('#cvv').removeClass('invalid');
		$('label[for="cvv"]').removeClass('error');
	}

};


// Varify inputs on specific RegEx.
const isValidName = (name) => {
	return name.length >= 2 && /^[a-zA-Z]+$/.test(name);
}
const isValidEmail = (email) => {
	return email.length >= 4 && /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(email);
};
const isValidCCNum = (ccNum) => {
	return ccNum.length >= 13 && /\b\d{13,16}\b/.test(ccNum); 
};
const isValidZip = (zip) => {
	return zip.length >= 5 && /^\d{5}$|^\d{5}-\d{4}$/.test(zip);
};
const isValidCvv = (cvv) => {
	return cvv.length >= 3 && /[0-9]{3}$/.test(cvv);
};
const isValidPayPal = (paypal) => {
	return true;
};
const isValidBitcoin = (bitcoin) => {
	return true;
};


