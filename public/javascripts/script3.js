$(function(){
    $.ajax({                               //using ajax to write code
        url: '/createReservation/reservations',               //access url data stored in serever
        contentType: 'application/json',     //type of json
        success: function(response){         //when suceess that function below is append these field and button in web
          console.log(response);
          var body=$('body');             //using tbody to append
          body.html(''); 
          body.append('<h1> Reseveration Information</h1>');
          response.reservations.forEach(function(reservations){          
            body.append('\
            <h2 class="text">  '+reservations.id+'. Custome name: '+reservations.customer+' booked '+reservations.seat+ ' seats. They are '+reservations.available+' at: '+reservations.time+ '\
            ');
          });   
        }
      });
    });
