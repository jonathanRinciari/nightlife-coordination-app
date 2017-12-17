
var loading = '<div class="loader"></div>'

$(document).ready(function(){
    $.getJSON('/auth/user_data', (data) => {
        if(data.username){
            $.ajax({
              type: 'GET',
              url: '/search'
            }).then( (data) => {
            data.forEach((data) =>{
                
            var el = `<li class='results'> 
            <a href='${data.link}'>
                <img src="${data.image}" width="50" height="50">
                <div class="title"> 
                    <h3> ${data.name} </h3>
                    <h5> ${data.address} </h5>
                </div>
                <button class="attendance" id=${data._id}> 
                    Going: <span> ${data.attending} </span> 
                </button>
            </a>
         </li>
        `
         $('.resultContainer').append(el)
        })
    })
    }
});

    $('.btn').click(() =>{
      
        $('.resultContainer').empty();
        var search = $('input').val();
        $('.resultContainer').append(loading);
        $.ajax({
            type: 'GET',
            url: '/search',
            data: {search: search}
        }).then( (data) => {
          $('.loader').remove();
            data.forEach((data) =>{
            console.log(data.image)
        var el = `<li class='results'> 
            <a href='${data.link}'>
                <img src="${data.image}" width="50" height="50">
                <div class="title"> 
                    <h3> ${data.name} </h3>
                    <h5> ${data.address} </h5>
                </div>
                <button class="attendance" id=${data._id}> 
                    Going: <span> ${data.attending} </span> 
                </button>
            </a>
         </li>
        `
        $('.resultContainer').append(el)
        $('input').val('')
    
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
  
   $('ul').on('click', '.attendance', function(e){
      var count = ($(this).children());
      var id = $(this).attr('id');
      e.preventDefault();
      e.stopPropagation();
      $.ajax({
          type: 'PUT',
          url: '/auth/going',
          data: {id: id}
      }).then((data, error) => {
          if(data.login){
              alert('Login!')
          }
            count.text(data.venue.attending)
            
            if(data.going && !data.login){
                $(this).addClass('going');
            } else {
                $(this).removeClass('going')
            }
            
      })
      
  })
 