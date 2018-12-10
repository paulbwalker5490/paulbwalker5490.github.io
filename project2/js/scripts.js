// This small function hides the tatal students then using the slice method to show the first 10 students.
const showPage = ( pageNumber, studentList ) => {
	// Hide full list of students
	studentList.hide();

	// displays the right amount of students per page
	studentList.slice( (( pageNumber - 1 ) * 10 ), ( pageNumber * 10 ) ).show(); 

};
showPage( 1, $('li.student-item') );


// This function takes the studentList as argument, and creates the linked page per 10 students
const appendPageLinks = ( studentList ) => {
	// determine how many pages for this student list
	const totalPage = Math.ceil( studentList.length / 10 );
	// create a page link section
	$('.page').append(`
			<div class="pagination">
				<ul></ul>
			</div> 
		`);

	// use a "for" loop through the divided totalPage variable.
	for ( let i = 1; i <= totalPage; i++ ) {
		// add a page link to the page link section append our new page link section to the site/
		$('.pagination ul').append(`<li><a href="#"> ${i} </a></li>`);
	}

	// define what happens when you click a link
	$('.pagination li a').on('click', function(event) {
		event.preventDefault();
		// Use the showPage function to display the page for the link clicked
		showPage( event.target.text, $('li.student-item') );
		// remove the old page link section by removeClass "active".
		$('a').removeClass('active');
		// mark that link as 'active'.
		event.target.className = 'active';
	});
};
appendPageLinks( $('li.student-item') );

/* Exceeds Grade: The Search Function        *********************************/

const searchList = ( studentList ) => {
	// first append the search bar and button
	$('.page-header').append(`
	<div class="student-search">
	<input type="text" class="find-student" placeholder="Search for students..." />		
	<button type="submit">Search</button>
	</div>
	`);

	// Obtain the value of the search input
	$('.student-search input').on('keyup', function() {
		// Declare a variable for input
		let $input = $(this).val();

		// remove the previous page link section
		$(studentList).hide();

		// Loop over the student list, and for each student...
		$(studentList).each(function() {
			// ...obtain the student's name... and the student's email
			let $listName = $( $(this), '.student-detail h3').text();

			// ...if the search value is found inside either email or name...
			if( $listName.search(new RegExp( $input, 'i')) < 0 ) {
				// If there's no "matched" students...
				$(this).hide();
			} else {
				// ...add this student to list of "matched" student
				$(this).show();
			}
		});
/* ...display a "no student's found" message ============================== */
		// Assign student-list into a jQuery variable
		let $students = $('.student-list');

		// If there's no "matched" students...
		if( $($students).children(':visible').length < 1 ) {
			// append the message to the ".student-list"
			$($students).append(`
				<span class="alert">No student's found</span>
				`).css({color: 'red', textAlign: 'center'});
		} else {
			// if input matches the ".student-list" remove span
			$('.alert').remove();
		}

	});
};
searchList( $('li.student-item') );
