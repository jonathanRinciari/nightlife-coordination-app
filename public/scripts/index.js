$(document).ready(function(){
    $.getJSON('/auth/user_data', (data) => {
        
        if(data.username){
            $.ajax({
              type: 'GET',
              url: '/search'
            }).then( (data) => {
            data.forEach((data) =>{
                
            var el = `<li class="results> 
                <a href='${data.link}'>
                    <div class="title> 
                        <h3> ${data.name} </h3>
                        <h5> ${data.address} </h5>
                    </div>
                    <button class="attendance" id=${data._id}> 
                        Going? <span> ${data.attending} </span> 
                    </button>
                </a>
            </li>
            `
         $('ul').append(el)
        })
    })
    }
});

    $('.btn').click(() =>{
        $('.resultContainer').empty();
        var search = $('input').val();
        console.log(search, 'Test')
        $.ajax({
            type: 'GET',
            url: '/search',
            data: {search: search}
        }).then( (data) => {
           
            data.forEach((data) =>{
                
        var el = `<li class="results> 
            <a href='${data.link}'>
                <div class="title> 
                    <h3> ${data.name} </h3>
                    <h5> ${data.address} </h5>
                </div>
                <button class="attendance" id=${data._id}> 
                    Going? <span> ${data.attending} </span> 
                </button>
            </a>
         </li>
        `
    $('ul').append(el)
    
    })
})
    
    $.ajax({
        type: 'PUT',
        url: '/auth/history',
        data: {search: search}
    }).then((data) =>{
      console.log('success')       
    })
        
    
})

    

  });
  
  $('ul').on('click', '.attendance', function(){
      var count = ($(this).children());
      var id = $(this).attr('id');
      $.ajax({
          type: 'PUT',
          url: '/auth/going',
          data: {id: id}
      }).then((data, error) => {
           if(data.attending){
            count.text(data.attending)
           } else {
               console.log(data.login)
           }
      })
  })
 