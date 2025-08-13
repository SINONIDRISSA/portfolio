jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    var f = $form.find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    // Validation (conserve le code existant)
    f.children('input, textarea').each(function() {
      var i = $(this);
      var rule = i.attr('data-rule');
      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
        switch (rule) {
          case 'required':
            if (i.val() === '') { ferror = ierror = true; } break;
          case 'minlen':
            if (i.val().length < parseInt(exp)) { ferror = ierror = true; } break;
          case 'email':
            if (!emailExp.test(i.val())) { ferror = ierror = true; } break;
          case 'checked':
            if (!i.is(':checked')) { ferror = ierror = true; } break;
          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) { ferror = ierror = true; } break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    // Envoi AJAX adapté à Formspree
    $.ajax({
      url: $form.attr('action'),
      method: 'POST',
      data: $form.serialize(),
      dataType: 'json',
      success: function(data) {
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $form.find("input, textarea").val("");
      },
      error: function(xhr) {
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html('Erreur lors de l\'envoi.');
      }
    });
    return false;
  });

});
