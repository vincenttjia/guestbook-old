$(function(){
    $guestbook_target = $("#guestbook_target");
    guestbook_template = $("#guestbook_template")[0].innerHTML;
    $refresh = $("#refresh");
    $submit = $("#submit");
    $name = $("#name");
    $message = $("#message");

    function renderTable($data){
        $guestbook_target.append(Mustache.render(guestbook_template,$data));
    }

    function loadtable(){
        console.log("run");
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
                    console.log("Undefined Error");
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    }

    function submit(){
        data : 
        $.ajax({
            type: "POST",
            url: "./controllers/addGuestBook.php",
            data: {
                name: $name,
                content: $message
            },
            
        })
    }

    loadtable();

    $refresh.on("click",function(){
        loadtable();
    });

    $submit.on("click",function(){

    })
})