$(document.forms['changeData-form']).on('submit', function () {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");

    $.ajax({
        url: "/settings",
        method: "POST",
        data: form.serialize(),
        complete: function () {
            $(":submit", form).button("reset");
        },
        statusCode: {
            200: function () {
                form.html("You data change").addClass('alert-success');
                window.location.href = "/office";
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
});
$(document.forms['changePassword-form']).on('submit', function () {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");
    if ($('#input-userPasswordNew').val() !== $('#input-userPasswordNewCheck').val()) {
        alert('Your data is not correct');
    } else {
        $.ajax({
            url: "/changePassword",
            method: "POST",
            data: form.serialize(),
            complete: function () {
                $(":submit", form).button("reset");
            },
            statusCode: {
                200: function () {
                    form.html("You data change").addClass('alert-success');
                    window.location.href = "/office";
                },
                403: function (jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    $('.error', form).html(error.message);
                }
            }
        });
    }

    return false;
});
