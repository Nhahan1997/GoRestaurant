$(function(){
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
