$(function(){
    $guestbook_target = $("#guestbook_target");
    guestbook_template = $("#guestbook_template")[0].innerHTML;
    $refresh = $("#refresh");
    $submit = $("#submit");
    $name = $("#name");
    $message = $("#message");
    $alertdiv = $("#alertdiv");
    $modalAlertDiv = $("#modalAlertDiv");
    errorAlert = $("#errorAlert")[0].innerHTML;
    $addModal = $("#addModal");
    $addButton = $("#addButton");
    $form = $("#form");
    $address = $("#address");


    function renderTable($data){
        $guestbook_target.append(Mustache.render(guestbook_template,$data));
    }

    function renderAlert($message){
        $content = {message: $message}
        $alertdiv.append(Mustache.render(errorAlert,$content))
    }

    function renderModalAlert($message){
        $content = {message: $message}
        $modalAlertDiv.append(Mustache.render(errorAlert,$content))
    }

    function loadtable(){
        $.ajax({
            type: "GET",
            url: "./controllers/getGuestBook.php",
            dataType: "JSON",
            success: function(res){
                if(res.error==0){
                    $row = res.result;
                    $guestbook_target.empty();
                    $.each($row, function(i,data){
                        data.parsedtime = moment.utc(data.time).utcOffset("+0700").format('DD-MMM-YY HH:mm:ss')
                        renderTable(data);
                    })
                    $refresh.prop('disabled', false);
                }else{
                    renderAlert("Undefined Error");
                    $refresh.prop('disabled', false);
                }
            },
            error: function(err){
                $refresh.prop('disabled', false);
                renderAlert("Please check your internet connection");
            }
        })
    }

    function submit(){
        $.ajax({
            type: "POST",
            url: "./controllers/addGuestBook.php",
            data: {
                name: $name.val(),
                content: $message.val(),
                address: $address.val()
            },
            dataType: "JSON",
            success: function(res){
                console.log(res);
                if(res.error==0){
                    loadtable();
                    $addModal.modal('hide');
                    $name.val("");
                    $message.val("");
                    $address.val("");
                    $submit.prop('disabled', false);
                }else{
                    $submit.prop('disabled', false);
                    renderModalAlert(res.message);
                }
            },
            error: function(err){
                console.log(err);
                $submit.prop('disabled', false);
                renderModalAlert("Please check your internet connection");
            }
        })
    }

    $addModal.on('shown.bs.modal', function () {
        $name.focus();
    }) 

    $addButton.on("click", function(){
        $modalAlertDiv.empty();
        
    })

    loadtable();

    $refresh.on("click",function(){
        $refresh.prop('disabled', true);
        loadtable();
    });

    setInterval(function(){ 
        loadtable();
    }, 5000);

    $form.on("submit", function(e){
        $modalAlertDiv.empty();
        e.preventDefault();
        $submit.prop('disabled', true);
        submit();
    })
})