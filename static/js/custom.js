/* pre stopnutie scroolu */
function lockScroll() {

    document.body.classList.toggle("lock-scroll");

}

function currentNav(n) {
    activeStatus(Index = n);
}

// Open the Modal
function activeStatus(n) {
    var i;
    var btn_galery = document.getElementsByClassName("btn-galery");
    if (n > btn_galery.length) { Index = 1 }
    if (n < 1) { Index = btn_galery.length }
    for (i = 0; i < btn_galery.length; i++) {
        btn_galery[i].className = btn_galery[i].className.replace(" active", "");
        btn_galery[Index - 1].className += " active";
    }
    btn_galery[Index - 1].className += " active";
    console.log(btn_galery);

}


// smooth scroll
$(document).on('click', 'a[href^="#blog"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});




// Ajax for new post upload image
var imagePath = "";
$("#newblogform").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        url: "do-upload-image",
        method: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            var options = {
                method: "POST",
                url: "post",
                data: {title: data.title, description: data.description, markdown: data.markdown, pic: data.pic}
            }
            $.ajax(options).done(response => {
                alert(response)

           });
        },
    })
});


// uploadform smoothshow for updateinfo in account */
$( document ).ready( function() {
    $( "#update" ).click( function() {
        if ($( "#updateAccForm" ).css('display') == 'none') {
            $( "#updateAccForm" ).show("slow");
        } else {
            $( "#updateAccForm" ).hide("slow");
        }
    });
  });

// show info about user in admin*/
$( document ).ready( function() {
    $( "#accounts" ).click( function() {
        if ($( "#accountinfo" ).css('display') == 'none') {
            $( "#accountinfo" ).show("slow");
        } else {
            $( "#accountinfo" ).hide("slow");
        }
    });
  });



