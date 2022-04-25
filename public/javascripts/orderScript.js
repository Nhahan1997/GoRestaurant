$(function(){
    $('#get-button1').on('click',function(){     //when click button get MENU  
      $.ajax({                                 //using ajax to write code
        url: '/buildapp/menus',               //access url data stored in serever
        contentType: 'application/json',     //type of json
        success: function(response){         //when suceess that function below is append these field and button in web
            console.log(response);
            var tbodyEl1=$('tbody1');             //using tbody to append
            tbodyEl1.html(''); 
            response.menus.forEach(function(menus){          
              tbodyEl1.append('\
              <tr>\
              <td class="id" >' +menus.id+'</td>\
              <td><input type="text" class="name" value= "'+menus.name+ '"></td>\
              <td><input type="text" class="price" value= "$'+menus.price+ '"></td>\
               </td>\
              </tr>\
              ');
            });   
          }
        });
      });
    

    $('#get-button2').on('click',function(){     //when click button TWEETGET defined in html  
        $.ajax({                               //using ajax to write code
          url: '/buildapp/menus/sizes',               //access url data stored in serever
              contentType: 'application/json',     //type of json
              success: function(response){         //when suceess that function below is append these field and button in web
                  console.log(response);
                  var tbodyEl2=$('tbody2');             //using tbody to append
                  tbodyEl2.html(''); 
                  response.sizes.forEach(function(sizes){          
                    tbodyEl2.append('\
                    <tr>\
                    <td><input type="text" class="name" value= "'+sizes.size+ '"></td>\
                     </tr>\
                    ');
                  });   
                }
          });
        });
    
        $('#get-button3').on('click',function(){     //when click button TWEETGET defined in html  
            $.ajax({                               //using ajax to write code
              url: '/buildapp/menus/sizes',               //access url data stored in serever
              contentType: 'application/json',     //type of json
              success: function(response){         //when suceess that function below is append these field and button in web
                  console.log(response);
                  var tbodyEl3=$('tbody3');             //using tbody to append
                  tbodyEl3.html(''); 
                  response.sizes.forEach(function(sizes){          
                    tbodyEl3.append('\
                    <tr>\
                    <td><input type="text" class="favorite" value= "'+sizes.favorite+ '"></td>\
                    <td>\
                     </tr>\
                    ');
                  });   
                }
              });
            });
            $('#get-button4').on('click',function(){     //when click button TWEETGET defined in html  
              $.ajax({                               //using ajax to write code
                url: '/buildapp/menus/sizes',               //access url data stored in serever
                contentType: 'application/json',     //type of json
                success: function(response){         //when suceess that function below is append these field and button in web
                    console.log(response);
                    var tbodyEl4=$('tbody4');             //using tbody to append
                    tbodyEl4.html(''); 
                    response.sizes.forEach(function(sizes){          
                      tbodyEl4.append('\
                      <tr>\
                      <td><input type="text" class="feature" value= "'+sizes.featured+ '"></td>\
                      <td>\
                       </tr>\
                      ');
                    });   
                  }
                });
              });
              $('#get-button8').on('click',function(){     //when click button TWEETGET defined in html  
                $.ajax({                               //using ajax to write code
                  url: '/order/orders',               //access url data stored in serever
                  contentType: 'application/json',     //type of json
                  success: function(response){         //when suceess that function below is append these field and button in web
                    console.log(response);
                    var tbodyEl5=$('tbody5');             //using tbody to append
                    tbodyEl5.html(''); 
                    response.orders.forEach(function(orders){          
                      tbodyEl5.append('\
                      <tr>\
                      <td class="id" >' +orders.id+'</td>\
                      <td><input type="text" class="name" value="' +orders.name+'"</td>\
                        <td><input type="text" class="food" value="' +orders.food+'"</td>\
                        <td><input type="text" class="quantity" value= "'+orders.quantity+ '"></td>\
                        <td><input type="text" class="size" value= "'+orders.size+ '"></td>\
                        <td><input type="text" class="add" value="'+orders.add+ '"></td>\
                        <td>\
                        <button class ="update-button">UPDATE</button>\
                        <button class ="delete-button">CANCEL</button>\
                        </td>\
                        </tr>\
                      ');
                    });   
                  }
                });
              });

                $('#create-form').on('submit',function(event){
                  event.preventDefault();
                  var createInput=$('#idcreate-input');
                  var createInput1=$('#namecreate-input');
                  var createInput2=$('#foodcreate-input');
                  var createInput3=$('#quantitycreate-input');
                  var createInput4=$('#size-input');
                  var createInput5=$('#Add-input');
                  
                  
                  $.ajax({
                     url:'/order/orders',
                     method:'POST',
                     contentType:'application/json',
                         data:JSON.stringify({id:createInput.val(),name: createInput1.val(),food: createInput2.val(),quantity: createInput3.val(),size: createInput4.val(),add: createInput5.val() }),  //stringify Json
                         success: function(response){                     //if success
                            console.log(response);
                            createInput.val('')
                            createInput1.val('');
                            createInput2.val('');
                            createInput3.val('');
                            createInput4.val('');
                            createInput5.val('');
              
                            $('#get-button').click();
                 
                     }
                  });
                })



                
               
                  $('table5').on('click','.update-button',function(){       //click on any button on table also to put
                    var rowEl=$(this).closest('tr');                     //using rowEl
                    var id=rowEl.find('.id').text();                     //use rowEl to find id
                    var name=rowEl.find('.name').val();    //use rowEl to find screen_name
                    var food=rowEl.find('.food').val();
                    var quantity=rowEl.find('.quantity').val();
                    var size=rowEl.find('.size').val();
                    var add=rowEl.find('.add').val();
                
                    $.ajax({
                    url: '/order/orders/'+ id,                           //access id of data
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({name:name,food:food,quantity:quantity,size:size,add:add}),
                    
                    success:function(response){
                    console.log(response);
                    $('#get-button').click();
                     }
                  })
                
                
                  })
                  
                  $('table5').on('click','.delete-button',function(){        //click on any button on table also to delete
                    var rowEl=$(this).closest('tr');
                    var id=rowEl.find('.id').text();
                    $.ajax({
                    url:'/order/orders/'+id,
                    method:'DELETE',
                    contentType:'application/json',
                    success: function(response){
                    console.log(response);
                    $('#get-button').click();
                    }
                  })
                  
                  })              


    });
    
        
   
     