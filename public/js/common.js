/*
The following is a jquery, which alerts when the document is loaded fully. 
$(document).ready(() => {
    alert("spongebob")
})
*/

/* enables the post button when something is written */
/* when something is typed in textbox, it triggers the event */
$("#postTextarea").keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var submitButton = $("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found")

    if(value == ""){
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
    //console.log(value)
})

$("#submitPostButton").click(() => {
    var button = $(event.target);
    var textbox = $("#postTextarea");

    var data = {
        // content is important information, sent in posts in posts.js
        content: textbox.val()
    }

    // post AJAX request
    // send the data to url /api/post, after returning call the callback function.
    $.post("/api/posts", data, (postData, status, xhr) => {
         console.log(postData);
    })
})