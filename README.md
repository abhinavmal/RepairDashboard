# Responsive Repair Dashboard

This is an *interactive frontend web design* of a "repairs" dashboard, basis a given design specification. It allows the user to view the state of different orders along with other information pertaining to it. The user can search through the search box for specifics in the loaded data, and can change the state of any order using a dropdown. The user's changes will persist for the current/immediate session.

The design uses a table to show all orders with a search box and navigation in the header. Each row represents one repair order and the design uses a host of visual clues (like a background-color, an image on the leftmost column of each row and design of the select box) to indicate the state of each order to the user. All these visual clues are visible or can be seen by interactivity through the select box.

See a Demo Video Here: https://youtu.be/sHASm48l38Q 


## Features

* The implementation is made using HTML, CSS and JavaScript, along with libraries - jQuery, Twitter Bootstrap and Fontawesome. For session-storage, it uses the local-storage (client-side) provided by HTML5.
* The current implementation is responsive, to work on all devices.
* A search box in the header allows for searching through the data/rows with every key press, the user will start seeing results of the prefix search as soon as (s)he presses a key in it.
* Changes in the state of the order are recorded for each session. Changes persist after refresh and across multiple tabs.
* The current implementation reads input data from a JSON file (`data.json`) to populate the entries in the table.
* All used images have alternate text for better accessibility of the website.


## Installation and Dependencies

* Dependencies
  * Python - to run a simple HTTP server on your machine (both python versions 2.x and 3.x should work). Tested on Python Python 2.7.12.
  * jQuery - (linked in the header of `index.html`)
  * Twitter Bootstrap - (linked in the header of `index.html`)
  * Fontawesome - (linked in the header of `index.html`)
 
* Installing and viewing the design in a browser
  * Download the zip file of the codebase, or clone it into your system using `git clone https://github.com/abhinavmal/RepairDashboard.git`
  * Go to the directory that contains `index.html` (`cd RepairDashboard/`)  
  * From your (Python) command prompt or shell, type `python -m SimpleHTTPServer`. This will start a local server at the default port of `8000`. If it runs, you should see `Serving HTTP on 0.0.0.0 port 8000 ...` on the command prompt or shell.
  * Open any web-browser and in the address bar, type `localhost:8000/`. The design should be visible now.
  * Interact with the webpage by trying to change order state using the select box, searching through the table and changing the screen size of the browser.
  * See a demo video here for running: https://youtu.be/sHASm48l38Q

## References

* [Stackoverflow](http://www.stackoverflow.com)
* [w3schools](https://www.w3schools.com)
* [HTML Color Codes](http://html-color-codes.info)
