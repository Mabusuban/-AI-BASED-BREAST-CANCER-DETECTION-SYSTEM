$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);

                if(data=="bud borer")
                {
                    $("#remedi").html("Bordeaux mixture: After removing affected tissues, smear with 10% Bordeaux paste.Terra Fungicide: A biological product for managing bud rot");
                }
                else if(data=="yellow leaf")
                {
                    $("#remedi").html("Application of additional dose of superphosphate (1 Kg/palm) alone or in combination with lime (I Kg/palm). Manuring with green leaf and compost @ 12 Kg each/palm. Irrigation at four days interval during summer months.");
                }
                else if(data=="male koleroga")
                {
                    $("#remedi").html("Dissolve 1 kg of Copper Sulphate in 50 litres of water and kg of lime in 50 litres of water separately and mix just before spraying. If the quality of lime is inferior, 1 kg of lime may not be sufficient to neutralise the copper sulphate.");
                }
            },
        });
    });

});
