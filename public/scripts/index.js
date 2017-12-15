$(document).ready(function(){
    $('button').click(() =>{
        var search = $('input').val();
        $.ajax({
            type: 'GET',
            url: '/search',
            data: {search: search}
        }).then( (data) => {
            data.forEach((data) =>{
                $('ul').append(`
                <li> ${data.name} </li>
                <li> ${data.address} </li>
                `)
            })
        })
    })
})