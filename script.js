// All functions
// To save the content to local Storage of user
function SaveContent(){
    localStorage.setItem('htmlContent', $("#htmlBody").val());
    localStorage.setItem('cssContent', $("#cssBody").val());
}

// To change the size of text-areas 
function changeSize(){
    if(($(window).height()) < ($(window).width())){
        $(".pannel").height($(window).height() - $("nav").height() - 55);
        $(".pannel").width((($(window).width()) / present) - 20);
    } 
    else{
        var div = document.getElementById("outputBody");
        if(div.classList.contains("pannel") && present > 1){
            $(".pannel").width((($(window).width()) / (present - 1)) - 20);
        }
        else{
            $(".pannel").width((($(window).width()) / present) - 20);
        }
        $("#outputBody").width($(window).width());
        $(".pannel").height($(window).width());
    }
}

// To update the output at iframe according to the input
function updateOutput() {
    $("iframe").contents().find("html").html("<html><head><style type='text/css'>" + $("#cssBody").val() + "</style></head><body>" + $("#htmlBody").val());
    // document.getElementById("outputBody").contentWindow.eval($("#javascriptBody").val());
}

var present = 2;
changeSize();
updateOutput();

// when the complete webiste is loaded check if there is already existing data in local storage
$(document).ready(function(){
    // if some html content is present then show that
    if(localStorage.getItem("htmlContent") !== null){
        $("#htmlBody").val(localStorage.getItem("htmlContent"));
    } 

    // if some css content is present then show that
    if(localStorage.getItem("cssContent") !== null){
        $("#cssBody").val(localStorage.getItem("cssContent"));
    }

    updateOutput()
});

// to change the size everytime the window size of browser change
addEventListener("resize", (event) => {
    changeSize();
});

// to save the content to local storage when save is clicked
$("#save").click(function(){
    SaveContent();
});

// to update the output whenever some change is done to the code
$("textarea").on('change keyup paste', function () {
    updateOutput();
});

// changing css class when a button is hovering and after hovering
$(".toggleButton").hover(
    function () {
        $(this).addClass('hoverclass');
    }, function () {
        $(this).removeClass('hoverclass');
    });

// changing css class when hover and after hover
$(".toggleButton").click(function () {
    $(this).toggleClass("active");

    $(this).removeClass("hoverclass");

    var butclass = $(this).attr("id") + "Body";
    $("#" + butclass).toggleClass("hide");

    present = $('.active').length;
    changeSize();
});