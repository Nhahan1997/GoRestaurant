$(function(){
    $('#get-button1').on('click',function(){     //when click button get MENU  
      $.ajax({                               //using ajax to write code
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
             

                $('#create-form').on('submit',function(event){
                  event.preventDefault();
                  var createInput=$('#foodcreate-input');
                  var createInput1=$('#quantitycreate-input');
                  var createInput2=$('#size-input');
                  var createInput3=$('#Add-input');
                  var createInput4=$('#namecreate-input');
                  
                  $.ajax({
                     url:'/order/orders',
                     method:'POST',
                     contentType:'application/json',
                         data:JSON.stringify({food: createInput.val(),quantity: createInput1.val(),size: createInput2.val(),add: createInput3.val(),name: createInput4.val() }),  //stringify Json
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



                
                $('#get-button9').on('click',function(){     //when click button TWEETGET defined in html  
                  $.ajax({                               //using ajax to write code
                    url: '/order/orders',               //access url data stored in serever
                    contentType: 'application/json',     //type of json
                    success: function(response){         //when suceess that function below is append these field and button in web
                      console.log(response);
                      var tbodyEl5=$('tbody5');             //using tbody to append
                      
                        response.orders.forEach(function(orders){          
                        tbodyEl5.append('\
                        <tr>\
                        <td><input type="text" class="food" value="' +orders.name+'"</td>\
                        <td><input type="text" class="food" value="' +orders.food+'"</td>\
                        <td><input type="text" class="quantity" value= "'+orders.quantity+ '"></td>\
                        <td><input type="text" class="size" value= "'+orders.size+ '"></td>\
                        <td><input type="text" class="add" value="'+orders.add+ '"></td>\
                        <td>\
                        </td>\
                        </tr>\
                        ');
                        });   
                      }
                    });
                  });
  



    });
    
        
   
     