(function ($) {
  Drupal.behaviors.madlibs = {
    attach: function(context, settings) {

    // This will fire when the document is ready.
      // Get a pointer to the mad libs container.
      jMadLibsContainer = $( "#madlibs" );

      // Get all of the madlib elements (defined by Span
      // objects with the rel=madlib).
      jMadLibs = $( "span[rel='madlib']" );

      // Create a form element and wire up the onsubmit
      // to fire the show mad libs and then return false
      // so that the form doesn't submit anywhere.
      jMadLibsForm = $( "<form>" ).submit(
         function(){
          Drupal.madlibs.ShowMadLibs();
          return( false );
        }
        );

      // For each of the mad lib elements, we need to
      // create a corresponding form element in our new form.
      // Loop over each element and create the form fields.
      jMadLibs.each(

        // For each of the madlib nodes, we want to update
        // the contents of the mad libs form.
        function( intIndex ){
          var jMadLibsNode = $( this );

          jMadLibsForm.append(
            "<p>" +
            jMadLibsNode.attr( "type" ).toUpperCase() +
            " : " +
            jMadLibsNode.attr( "desc" ) +
            "<br />" +
            "<input type=\"text\" size=\"60\" />" +
            "</p>"
            );

        }
        );

      // Add the submit button to the form.
      jMadLibsForm.append(
        "<p>" +
        "<input type=\"submit\" value=\"Show Mad Libs!\" />" +
        "</p>"
        );


      // Hide the mad lib container.
      jMadLibsContainer.hide();

      $('#funny-picture').hide();

      // Add the mad libs form after the mad libs container.
      jMadLibsContainer.after(
        jMadLibsForm
      );
    }
  }

		// This will be used to process the mad lib form once the
		// user had entered all of the values.
		Drupal.madlibs = {
      'ShowMadLibs': function() {
			var strErrors = "";

			// Loop over the form elements to make sure that all
			// the values have been entered.
			jMadLibsForm.find( "input" ).each(
				function( intIndex ){
					var jPara = $( this.parentNode );
					var jInput = jPara.find( "input" );

					// Check to see if the form field is empty.
					// If the input is empty, echo the field
					// label and turn the field red.
					if (jInput.val() == ""){

						// Add the error text.
						strErrors += (jPara.text() + "\n");

						// Highlight the field.
						jInput.css( "background-color", "#FFCCCC" );

					} else {

						// This field is fine, make sure that it
						// is not hightlighted.
						// Highlight the field.
						jInput.css( "background-color", "#FFFFFF" );

					}
				}
				);


			// Check to see if we have any errors.
			if (strErrors.length > 0){

				// There were form validation errors. Alert them.
				alert( strErrors );

			} else {

				// There were no form validation errors. Loop over
				// each of the mad lib nodes and set the text.
				jMadLibs.each(
					function( intIndex ){
						var jMadLibsNode = $( this );

						// Set the text of the mad libs node to the
						// form field valud of the input at the
						// same index.
						jMadLibsNode.text(
							jMadLibsForm.find(
								"p:nth-child(" + (intIndex + 1) + ") input"
								).val()
							);
					}
					);

				// Hide the form.
				jMadLibsForm.hide();

				// Show the mad libs.
				jMadLibsContainer.show();

			}

      $('#funny-picture').show();
		}
    };



		// This is a collection that will store references to all of
		// our Mad Lib DOM elements.
		var jMadLibs = null;

		// This is a pointer to the mad libs container. We just need
		// something in which we can group all the editable content.
		var jMadLibsContainer = null;

		// This is a pointer to the mad libs form (yet to be created).
		var jMadLibsForm = null;

})(jQuery);
