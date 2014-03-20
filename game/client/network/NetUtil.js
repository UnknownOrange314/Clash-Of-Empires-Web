function getIP(resFun){
    $.ajax({url:'../server/IP.php',
            success: resFun
    })
}