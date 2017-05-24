$(document.forms['login-form']).on('submit', function () {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");

    $.ajax({
        url: "/login",
        method: "POST",
        data: form.serialize(),
        complete: function () {
            $(":submit", form).button("reset");
        },
        statusCode: {
            200: function () {
                form.html("You are login").addClass('alert-success');
                window.location.href = "/settings";
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
});