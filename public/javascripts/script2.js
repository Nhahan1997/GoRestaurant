$(function(){
    $('#get-button').on('click',function(){     //when click button TWEETGET defined in html  
      $.ajax({                               //using ajax to write code
        url: '/reservation/reservations',               //access url data stored in serever
        contentType: 'application/json',     //type of json
        success: function(response){         //when suceess that function below is append these field and button in web
          console.log(response);
          var tbodyEl=$('tbody');             //using tbody to append
          tbodyEl.html(''); 
          response.reservations.forEach(function(reservations){          
            tbodyEl.append('\
            <tr>\
            <td class="id" >' +reservations.id+'</td>\
            <td><input type="text" class="customer" value= "'+reservations.customer+ '"></td>\
            <td><input type="text" class="seat" value= "'+reservations.seat+ '"></td>\
            <td><input type="text" class="available" value="'+reservations.available+ '"></td>\
            <td><input type="text" class="time" value="'+reservations.time+ '"></td>\
            <td>\
            <button class ="update-button">CHANGE</button>\
            <button class ="delete-button">CANCEL</button>\
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
      var createInput1=$('#customer-input');
      var createInput2=$('#seat-input');
      var createInput3=$('#available-input');
      var createInput4=$('#time-input');

      
      $.ajax({
         url:'/reservation/reservations',
         method:'POST',
         contentType:'application/json',
             data:JSON.stringify({id: createInput.val(),customer: createInput1.val(),seat: createInput2.val(),available: createInput3.val(),time: createInput4.val() }),  //stringify Json
             success: function(response){                     //if success
                console.log(response);
                createInput.val('');
                createInput1.val('');
                createInput2.val('');
                createInput3.val('');
                createInput4.val('');
  
                $('#get-button').click();
     
         }
      });
    })
    //PUT
  
     //UPDATE /PUT
  
     $('table').on('click','.update-button',function(){       //click on any button on table also to put
      var rowEl=$(this).closest('tr');                     //using rowEl
      var id=rowEl.find('.id').text();                     //use rowEl to find id
      var customer=rowEl.find('.customer').val();    //use rowEl to find screen_name
      var seat=rowEl.find('.seat').val();
      var available=rowEl.find('.available').val();
      var time=rowEl.find('.time').val();

  
      $.ajax({
      url: '/reservation/reservations/'+ id,                           //access id of data
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({customer:customer,seat:seat,available:available,time:time}),
      
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
    url:'/reservation/reservations/'+id,
    method:'DELETE',
    contentType:'application/json',
    success: function(response){
    console.log(response);
    $('#get-button').click();
    }
  })
  
  })
  })
     