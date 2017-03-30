/**
 * Name: searchFunc()
 * Implements the search functionality for the Repair Dashboard.
 * The function is called each time a key is put inside the search box (at the top).
 * It will search through all rows currently loaded in the table of repair data
 * and display any and all rows that contain the word or any prefix of the word.
 * Reference: https://www.w3schools.com/howto/howto_js_filter_table.asp
 * Dependencies: jQuery
**/
function searchFunc() {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("repairTable");
  tr = $("#repairTable").find("tbody").find("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    var j, flag;
    flag = 0;
    td = tr[i].getElementsByTagName("td");

    // Loop through all the td elements in the current row
    for (j = 0; j < td.length; j++) {
        var elem = td[j];
        if (elem) {
          if (elem.innerHTML.toUpperCase().indexOf(filter) === 0) {
            // Element found in current row in a specific td
            flag = 1;
           }
        }
    }
    // If element not found in current row in any of the td elements
    // Set display for that row to be 'none'
    if (flag === 0) {
        tr[i].style.display = "none";
    }
    else {
        tr[i].style.display = "";
    }
  }
}
