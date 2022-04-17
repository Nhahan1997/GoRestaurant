$(function(){
  $('#get-button').on('click',function(){     //when click button TWEETGET defined in html  
    $.ajax({                               //using ajax to write code
      url: '/buildapp/menus',               //access url data stored in serever
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
          <button class ="update-button">UPDATE</button>\
          <button class ="delete-button">DELETE</button>\
          </td>\
          </tr>\
          ');
        });   
      }
    });
  });
   //post 

  $('#create-form').on('submit',function(event){
    event.preventDefault();
    var createInput=$('#idcreate-input');
    var createInput1=$('#textcreate-input');
    var createInput2=$('#price-input');
    var createInput3=$('#kind-input');
    
    $.ajax({
       url:'/buildapp/menus',
       method:'POST',
       contentType:'application/json',
           data:JSON.stringify({id: createInput.val(),name: createInput1.val(),price: createInput2.val(),kind: createInput3.val() }),  //stringify Json
           success: function(response){                     //if success
              console.log(response);
              createInput.val('');
              createInput1.val('');
              createInput2.val('');
              createInput3.val('');

              $('#get-button').click();
   
       }
    });
  })
  //PUT

   //UPDATE /PUT

   $('table').on('click','.update-button',function(){       //click on any button on table also to put
    var rowEl=$(this).closest('tr');                     //using rowEl
    var id=rowEl.find('.id').text();                     //use rowEl to find id
    var name=rowEl.find('.name').val();    //use rowEl to find screen_name
    var price=rowEl.find('.price').val();
    var kind=rowEl.find('.kind').val();

    $.ajax({
    url: '/buildapp/menus/'+ id,                           //access id of data
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({price:price}),
    
    success:function(response){
    console.log(response);
    $('#get-button').click();
     }
  })


  })
   $('table').on('click','.update-button',function(){       //click on any button on table also to put
    var rowEl=$(this).closest('tr');                     //using rowEl
    var id=rowEl.find('.id').text();                     //use rowEl to find id
    var name=rowEl.find('.name').val();    //use rowEl to find screen_name
    var price=rowEl.find('.price').val();
    var kind=rowEl.find('.kind').val();

    $.ajax({
    url: '/buildapp/menus/'+ id,                           //access id of data
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({price:price,name:name,kind:kind}),
    
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
  url:'/buildapp/menus/'+id,
  method:'DELETE',
  contentType:'application/json',
  success: function(response){
  console.log(response);
  $('#get-button').click();
  }
})

})
})
   
   

   

  
      
  
  

     
      
    
    
               
    
  
