$(function(){
   
      $.ajax({                               //using ajax to write code
        url: '/createmenu/menus',               //access url data stored in serever
        contentType: 'application/json',     //type of json
        success: function(response){         //when suceess that function below is append these field and button in web
          console.log(response);
          var body=$('body');             //using tbody to append
          body.html('');
          body.append('MENU TODAY');
         // body.append('Number           Name               Price                 Kind') ;
          response.menus.forEach(function(menus){          
            body.append('\
            <h1>' +menus.id+'.    '+menus.name    +'..........  $'+menus.price        + '..........    '   +menus.kind+ '</h1>\
                  ');
          });   
        }
      });
    });
