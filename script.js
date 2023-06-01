var optionsButtons = document.querySelectorAll(".option-button");
var advancedOptionButton = document.querySelectorAll(".adv-option-button");
var fontName = document.getElementById("fontName");
var fontSizeRef = document.getElementById("fontSize");
var writingArea = document.getElementById("text-input");
var linkButton = document.getElementById("createLink");
var alignButtons = document.querySelectorAll(".align");
var spacingButtons = document.querySelectorAll(".spacing");
var formatButtons = document.querySelectorAll(".format");
var scriptButtons = document.querySelectorAll(".script");

// List of fontlist
var fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
    "Roboto",
    "Open Sans",
    "Lato",
];

// ... Rest of your code


var initializer = function () {
    //function calls for highlighting buttons
    //No highlights for link, unlink,lists, undo,redo since they are one time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    //create options for font names
    fontList.map(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //fontSize allows only till 8
    for (var i = 1; i <= 8; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    //default size
    fontSizeRef.value = 2;
};

function modifyText(command, defaultUi, value) {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
}

optionsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach(function (button) {
    button.addEventListener("change", function () {
        modifyText(button.id, false, button.value);
    });
});


linkButton.addEventListener("click", function () {
    var userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});


function highlighter(className, needsRemoval) {
    className.forEach(function (button) {
        button.addEventListener("click", function () {
            if (needsRemoval) {
                var alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
}


function highlighterRemover(className) {
    className.forEach(function (button) {
        button.classList.remove("active");
    });
}

window.onload = function () {
    initializer();
};


