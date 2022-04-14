$(function(){
  $('#get-button').on('click',function(){     //when click button TWEETGET defined in html  
    $.ajax({                               //using ajax to write code
      url: '/buildapp/menu',               //access url data stored in serever
      contentType: 'application/json',     //type of json
      success: function(response){         //when suceess that function below is append these field and button in web
        console.log(response);
        var tbodyEl=$('tbody');             //using tbody to append
        tbodyEl.html(''); 
        response.menu.forEach(function(menu){          
          tbodyEl.append('\
          <tr>\
          <td class="id" >' +menu.id+'</td>\
          <td><input type="text" class="name" value= "'+menu.name+ '"></td>\
          <td><input type="text" class="price" value= "'+menu.price+ '"></td>\
          <td><input type="text" class="kind" value="'+menu.kind+ '"></td>\
          <td>\
          <button class ="update-button">UPDATE</button>\
          <button class ="delete-button">DELETE</button>\
          </td>\
          </tr>\
          ');
        });   
      }
    });
  });
})
  

   

  
      
  
  

     
      
    
    
               
    
  
