$(function(){
   
      $.ajax({                               //using ajax to write code
        url: '/createmenu/menus',               //access url data stored in serever
        contentType: 'application/json',     //type of json
        success: function(response){         //when suceess that function below is append these field and button in web
          console.log(response);
          var tbodyEl=$('tbody');             //using tbody to append
          tbodyEl.html(''); 
          response.menus.forEach(function(menus){          
            tbodyEl.append('\
            <tr>\
            <td class="id" >' +menus.id+'</td>\
            <td><input type="text" class="name" value= "'+menus.name+ '"></td>\
            <td><input type="text" class="price" value= "'+menus.price+ '"></td>\
            <td><input type="text" class="kind" value="'+menus.kind+ '"></td>\
            <td>\
                  ');
          });   
        }
      });
    });
