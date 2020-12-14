$( document ).ready(function() {
  
    // SUBMIT FORM
      $("#newsletter").submit(function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      ajaxPost();
    });
      
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
          email : $("#email").val()
        }
        
        // DO POST
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "signup",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function() {
          $("#postResultDiv").html( "Ďakujeme za prihlásenie do noviniek :)"  );
          setTimeout(function() {
            $('#postResultDiv').fadeOut('fast');
        }, 3000); // <-- time in milliseconds
        },
        error : function(e) {
          alert("Nepodarilo sa prihlásiť na odber noviniek");
          console.log("ERROR: ", e);
        }
      });
        
        // Reset FormData after Posting
        resetData();
   
      }
      
      function resetData(){
        $("#firstname").val("");
        $("#lastname").val("");
        $("#email").val("");
      }
  })

