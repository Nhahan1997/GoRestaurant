$(function(){
    $('#get-button').on('click',function(){     //when click button TWEETGET defined in html  
      $.ajax({                               //using ajax to write code
        url: '/buildapp/',               //access url data stored in serever
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
    
  
      //CREATE/POST
  
      $('#create-form').on('submit',function(event){  //when click on the button CREATE/POST to submit
  
        event.preventDefault();                      //prevent the submit default
        var createInput=$('#idcreate-input');        // create object createInput for id input field
        var createInput1=$('#textcreate-input');     //create object createInput1 for text input field
        $.ajax({
          url:"/arrayof3Items",                      //access data of server
          method: 'POST',                            //post data on server
          contentType:'application/json',
          data:JSON.stringify({id: createInput.val(),text: createInput1.val() }),  //stringify Json
          success: function(response){                     //if success
             console.log(response);
             createInput.val('');
             createInput1.val('');
             $('#get-button').click();
          }
  
        })
        })
  
        //UPDATE /PUT
  
      $('table').on('click','.update-button',function(){       //click on any button on table also to put
        var rowEl=$(this).closest('tr');                     //using rowEl
        var id=rowEl.find('.id').text();                     //use rowEl to find id
        var screen_name=rowEl.find('.screen_name').val();    //use rowEl to find screen_name
        var text=rowEl.find('.text').val();                  //use rowEl to find text
        var created_at=rowEl.find('.created_at').val();      //use rowEl to find created_at
  
        $.ajax({
        url: '/arrayof3Items/'+'screen_name',                           //access id of data
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({screen_name: screen_name}),
        success:function(response){
        console.log(response);
        $('#get-button').click();
         }
      })
    })
       //DELETE
       $('table').on('click','.delete-button',function(){        //click on any button on table also to delete
        var rowEl=$(this).closest('tr');
        var id=rowEl.find('.id').text();
        $.ajax({
        url:'/arrayof3Items/'+id,
        method:'DELETE',
        contentType:'application/json',
        success: function(response){
        console.log(response);
        $('#get-button').click();
        }
      })
  
    })
  })
       
  
  
  
  
    
        
      
      
                 
      
    
  