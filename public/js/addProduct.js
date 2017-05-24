$(document.forms['add-product-form']).on('submit', function () {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");

    $.ajax({
        url: "/addProduct",
        method: "POST",
        data: form.serialize(),
        complete: function () {
            $(":submit", form).button("reset");
        },
        statusCode: {
            200: function () {
                form.html("You are add product").addClass('alert-success');
                window.location.href = "/office";
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    set.timeout(function () {
        $(":submit", form).button("reset");
    },1000);
    return false;
});