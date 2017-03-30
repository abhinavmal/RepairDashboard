

// Global Variables that correspond to the design spec
var emptySpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var doneBgColorExceptLast = "rgb(228,228,228)";
var doneBgColorLast = "rgba(228,228,228,0.5)";
var doneOpacityExceptLast = "0.5";
var doneOpacityLast = "1.0";
var defaultOpacity = "1.0";
var cancelledBgColor = "#fee0e0";
var evenRowColor = "#f7f3e9";
var oddRowColor = "#ffffff"; //white
var textColorCancel = "#979797";
var defaultFontColor = "#000000";

// Input data file
var dataFile = "data.json";


/*
 * Helper functions that are used in "repair.js"
 * They have self-explanatory names
*/


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function returnFirstElem(orderState) {
    var orderClass = returnSelectClass(orderState);
    var firstElem = "    ";
    if (orderClass === "done") {
        firstElem = "<img id='doneImg' src='images/Done.png' alt='Order Done Image'>";
    }
    if (orderClass === "cancelled") {
        firstElem = "<img id='cancelImg' src='images/Cancel.png' alt='Order Cancelled Image'>";
    }
    if (orderClass === "in_progress") {
        firstElem = emptySpace;
    }
    return firstElem;
}

function returnTdStyleExceptLast(orderState) {
    var orderClass = returnSelectClass(orderState);
    var tdStyleExceptLast = "";
    if (orderClass === "cancelled") {
        tdStyleExceptLast = "background-color: " + cancelledBgColor + ";";
    }
    if (orderClass === "done") {
        tdStyleExceptLast = "background-color: " + doneBgColorExceptLast + ";";
        tdStyleExceptLast += "opacity: " + doneOpacityExceptLast + ";";
    }
    return tdStyleExceptLast;
}

function returnTdStyleLast(orderState) {
    var orderClass = returnSelectClass(orderState);
    var tdStyleLast = "";
    if (orderClass === "cancelled") {
        tdStyleLast = "background-color: " + cancelledBgColor + ";";
    }
    if (orderClass === "done") {
        tdStyleLast = "background-color: " + doneBgColorLast + ";";
    }
    return tdStyleLast;
}

function returnTdStyleLast3(orderState) {
    var orderClass = returnSelectClass(orderState);
    var tdStyleLast3 = "";
    if (orderClass === "cancelled") {
        tdStyleLast3 = "background-color: " + cancelledBgColor + ";";
        tdStyleLast3 += "color: " + textColorCancel + ";";
    }
    if (orderClass === "done") {
        tdStyleLast3 = "background-color: " + doneBgColorExceptLast + ";";
        tdStyleLast3 += "opacity: " + doneOpacityExceptLast + ";";
    }
    return tdStyleLast3;
}

function returnSelectClass(orderState) {
    var newClassText = orderState.toLowerCase();
    var newClass = newClassText.split(' ').length > 1 ? "in_progress" : newClassText.split(/\s+/g)[0];
    return newClass;
}

function returnSelectDiv(orderState) {
    var selectClass = returnSelectClass(orderState);
    var selected0, selected1, selected_1;
    selected0 = "";
    selected1 = "";
    selected_1 = "";

    if (selectClass === "done") {
        selected0 = "selected";
    }

    if (selectClass === "in_progress") {
        selected1 = "selected";
    }

    if (selectClass === "cancelled") {
        selected_1 = "selected";
    }

    var selectTemplate = '<select class="' + selectClass + '"><option value="0"'+selected0+'>Done</option><option value="1"'+selected1+'>In Progress</option><option value="-1" '+selected_1+'>Cancelled</option></select>'
    return selectTemplate;
}