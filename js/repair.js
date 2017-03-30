/*
 * All actions at document reload:
 * - Load data from a JSON file - "data.json"
 * - Display the data according to its orderState in the table div
 * - A listener function that will change the UI whenever the user
 *   tries to change the order-state using the select box.
 * Global variables and helper functions defined in the file "helper.js"
 * Dependencies: "helper.js"
 */
$(document).ready(function() {


    // Read the data and render it on the webpage, as per design
    readTextFile(dataFile, function(text){

        var dataRepair = JSON.parse(text);
        data =  dataRepair["repairs"];

        // r = rowArray
        var r = new Array(), j = -1;

        // Traverse through all elements in the JSON and add them to the table
        for (var key=0, size=data.length; key<size; key++){

            var orderState = data[key].orderState;

            // Will use the id as storageKey in sessionStorage
            var storageKey = data[key].id;

            // Check if this exists in Session Storage
            // Use that value, if it exists
            if (localStorage.getItem(storageKey) !== null) {
                orderState = localStorage.getItem(storageKey);
            }

            // Styling the td elements as per design
            // Using functions in the file helper.js
            var tdStyleExceptLast = returnTdStyleExceptLast(orderState);
            var tdStyleLast = returnTdStyleLast(orderState);
            var tdStyleLast3 = returnTdStyleLast3(orderState);

            r[++j] = '<tr>';
            r[++j] = '<td ';
            r[++j] = 'style="' + tdStyleExceptLast + '">';
            r[++j] = returnFirstElem(orderState);
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleExceptLast + '">';
            r[++j] = data[key].name;
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleExceptLast + '">';
            r[++j] = data[key].technician;
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleExceptLast + '">';
            r[++j] = data[key].orderDate;
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleLast3 + '">';
            r[++j] = data[key].type.toUpperCase();
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleLast3 + '">';
            r[++j] = data[key].cellNumber;
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleLast3 + '">';
            r[++j] = data[key].email + '<input type="hidden" name="' + storageKey + '">';
            r[++j] = '</td><td ';
            r[++j] = 'style="' + tdStyleLast + '">';
            r[++j] = returnSelectDiv(orderState);
            r[++j] = '</td></tr>';

        }
        // Fill the table with created rows
        $('#repairTable').find('tbody').append(r.join(''));
    });



    // Make the table rows sensitive to any changes/clicks on its elements
    $( "#repairTable tbody" ).on( "click", "tr", function(event) {

        // Listener function corresponding to any change in select option on any row in
        // the table
        $( "select" ).change(function() {

            var newClassText = $(this).find(":selected").text().toLowerCase();
            var newClass = newClassText.split(' ').length > 1?"in_progress":newClassText.split(' ')[0];

            // Set new class according to user selected orderState
            // Each orderState corresponds to a specific design,
            // which is modeled by its respective class
            $(this).attr('class', newClass);


            // Store the changes to orderState in HTML local storage
            // Earlier tried to use session storage, but it does not
            // store changes across browser tabs
            if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                // console.log("Yes! support for storage!");
                var rowIdx = $(this).parent().parent().index();
                // var email = $(this).parent().parent().find('td:nth-child(7)').text();
                var id = $(this).parent().parent().find('input').attr("name");
                // console.log("id="+id);
                // console.log("rowIndex= " + rowIdx);
                localStorage.setItem(id, newClassText);
                // console.log("local-storage" + localStorage);
            } else {
                // Sorry! No Web Storage support..
                console.log("No support for storage!");
            }


            /*
             * Change design of the row according to the order state chosen by the user
             *
            */

            if (newClass === "cancelled") {
                $(this).parent().parent().children('th, td').css("opacity","1");
                $(this).parent().parent().children('td:nth-child(5),td:nth-child(6),td:nth-child(7)').css("color", defaultFontColor);
                $(this).parent().parent().children('td, th').css("background-color", cancelledBgColor);
                $(this).parent().parent().children('td:nth-child(5),td:nth-child(6),td:nth-child(7)').css("color", textColorCancel);
                $(this).parent().parent().children().first().html("<img id='cancelImg' src='images/Cancel.png' alt='Order Cancelled Image'>");
            }

            if (newClass === "done") {
                $(this).parent().parent().children('td, th').css("background-color", doneBgColorExceptLast);
                $(this).parent().parent().children('td:nth-child(5),td:nth-child(6),td:nth-child(7)').css("color", defaultFontColor);
                $(this).parent().parent().children('th, td:not(:last-child)').css("opacity", doneOpacityExceptLast);

                // This is done because we want to show the select box to be still active for change
                // even if it is set to Done
                $(this).parent().parent().children('td:last-child').css("background-color", doneBgColorLast);

                $(this).parent().parent().children().first().html("<img id='doneImg' src='images/Done.png' alt='Order Done Image'>");
            }

            if (newClass === "in_progress") {
                // Reset opacity to one in case it was set earlier in another order state
                // defaultFontColor
                $(this).parent().parent().children('th, td').css("opacity", defaultOpacity);
                $(this).parent().parent().children('td:nth-child(5),td:nth-child(6),td:nth-child(7)').css("color", defaultFontColor);


                // Based on whether the current row is even/odd, we keep its default
                // background color as suggested by initial design - in case the state is "In Progress"
                // if ($(this).parent().parent().is(":even")) {
                if ( $(this).parent().parent().index() % 2 === 0) {
                    $(this).parent().parent().children('td, th').css("background-color", evenRowColor);
                }
                else {
                    $(this).parent().parent().children('td, th').css("background-color", oddRowColor);
                }

                // Adding a space to first element of the row to maintain consistency with other
                // states which have a corresponding image (Done-tick, Cancelled-X) to indicate them
                $(this).parent().parent().children().first().html(emptySpace);
            }

        });
    });
// End of document.ready()
});