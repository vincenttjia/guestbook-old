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
        $guestbook_target.empty();
        $.ajax({
            type: "GET",
            url: "./controllers/getGuestBook.php",
            dataType: "JSON",
            success: function(res){
                if(res.error==0){
                    $row = res.result;
                    $.each($row, function(i,data){
                        renderTable(data);
                    })
                }else{
                    renderAlert("Undefined Error");
                }
            },
            error: function(err){
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
                content: $message.val()
            },
            dataType: "JSON",
            success: function(res){
                console.log(res);
                if(res.error==0){
                    loadtable();
                    $addModal.modal('hide');
                    $name.val("");
                    $message.val("");
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
        loadtable();
    });

    setInterval(function(){ 
        loadtable();
    }, 60000);

    $form.on("submit", function(e){
        $modalAlertDiv.empty();
        e.preventDefault();
        $submit.prop('disabled', true);
        submit();
    })
})