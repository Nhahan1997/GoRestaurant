Introduction:
      GoRestaurant is a software project that help student practice to create the software based on these knowlegde from lecture through 10 chapters and 3 homework. The goal of our project is project vision: "FOR any kind of restaurant WHO would like to utilize the technologies in the 4.0 generation to expand their network, sell the food more widely, and reach out more customers, GoRestaurant is a Web-based service THAT helps restaurants create their own mobile app for ordering food online or making table reservations. Unlike other services, OUR product aims to produce a mobile app that gives a great experience of convenience for restaurant and their customers and create a friendly environment between them
     Since we can not create a mobile app, we would create a webpage for restaurants instead.
     After finishing this project, we learn a lot of knowledge how to create a software with 2 main tasks: frontend and backend
Technology:
Front_End: 
  Design these websites to display all data about all information we need for restaurant.We also create 6 buttons on menu bar. Thus, 3 buttons are using for 3 apps: menu app, reservation app, order app and 2 buttons for login and contact. We also use css for html and scripts file with AJAX jquery
     For ejs files: buildapp.ejs, contact.ejs, cratemenu.ejs, createReservation.ejs, home.ejs, login.ejs, order.ejs, register.ejs, reservation.ejs.
     For css files: style.css, stylebuildapp.css, stylecontact.css, stylecreatemenu.css, styleCreateReservation.css, stylefeedback.css, styleOrder.css, stleReservation.css
      For scripts files: script.js, script1.js, scripts2.js, script3.js, script4.js.
The sample of structure from these website:
<!DOCTYPE html>
<html lang="en">
<head>
  <title>  GoRestaurant Apps   </title>
  <link rel="stylesheet" href="stylebuildapp.css">    
</head>
  <body> 
  <h1>    <div class="h1">  GoRestaurant </div></h1>
  <h1>  <div class="h2">MENU SELECTION</div> <br> 
  </h1>
  <div class="th3"> 
  <button id="get-button"> <div class="button">  MENU_GET</div> </button> 
  <form id="create-form">
     <label > <div class="th2">id</div></label>
      <input type="text" id="idcreate-input">
      <label > <div class="th2">name </div></label>
      <input type="text" id="textcreate-input">
      <label > <div class="th2">price</div> </label> 
      <input type="text" id="price-input">
      <label > <div class="th2">kind </div></label> 
      <input type="text" id="kind-input">
      <button><div class="button1"> MENU_POST </div></button>
  </form>
  </div>
  <hr>
  <table>
      <thead> 
          <tr>            
              <th><div class="th1">  ID  </div></th>
              <th> <div class="th1"> Name </div></th>
              <th> <div class="th1">Price </div> </th>
              <th> <div class="th1"> Kind </div></th>
              <th> <div class="th1"> Button </div></th>
          </tr>
</thead>
<tbody>   </tbody>
  </table>
  <script src="./javascripts/jquery-3.6.0.min.js" >  </script>
  <script src="./javascripts/scripts.js">   </script>
  </body>
<a href="/createmenu"> <button  id="apps-button"><div class="button2">   CREATE_MENU </div></button></a>
</html>


Back_End: Using mongodb and file for data via REST FUL API Node js: server.js, app.js, user.js