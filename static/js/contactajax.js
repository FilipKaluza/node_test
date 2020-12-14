$(() => {
    const $form = $('#contactform')
  
    $form.on('submit', handleSignup)
  
    function handleSignup (e) {
      e.preventDefault()

      var contactData = {
        name : $("#name").val(),
        email :  $("#email").val(),
        message : $("#message").val()
      }
  
      var options = {
        method: "POST",
        url: "contact/contactform",
        data: contactData
      }
  
      $.ajax(options).done(response => {
        alert(response)
      }
      )
    }
  })