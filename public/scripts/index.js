$(document).ready(function(){
    $('.btn').click(() =>{
        $('.resultContainer').empty();
        var search = $('input').val();
        console.log(search)
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
                        <button class="attendence"> 
                            Going? <span> ${data.attending} </span> 
                        </button>
                    </a>
                </li>
                `
    $('ul').append(el)
    
})
})
    
   
})

    

  });
  
  $('ul').on('click', '.attendence', function(){
      console.log($(this).children('span').text())
  })
 