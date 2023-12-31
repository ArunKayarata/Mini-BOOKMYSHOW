## A mini-version of book my show 

* Features of this project
    + user can register and after succesfull registration ,user can login and  **jwt token**  is sent on succesfull login.
    + all the user info is stored in __mongodb__ and passwords are being encrypted using __bcrypt__ library.
    + all users  are of two types __users__ and __Admins__
    + users can book tickets and also  can send the request to include their theatre into the website.  
    + only __Admins__ can add movies to the website and accept/decline the request for adding theatres to the websites.
    + user can make payments using a library __stripe__ and on succesfull bookings the catalog of their bookings are shown in the page.



* Tech stacks used are
   + for frontend==>__React__
  + for backend ==> __mongoDB,express() ,Node.js__
   + libararies used ==>__bcrypt,jwt,cors,axios,moment,antd,mongoose,dotenv__
