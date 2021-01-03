# PetSit!
<h2> ExpressJs/JavaScript/Sequelize/PostgreSQL/REST </h4> 
<h2> Purpose </h2>
<p> PetSit! is going to be a web application that will serve as a platform to bring together pet owners and people who are available to provide services related to those pets when the owners cannot take care of them (pet sitters). The platform is to be an intermediary between both parties and won’t be responsible for providing the said service, however it will help both of them get exposure and hopefully find exactly what they need. 

The idea is to have clients sign up as either a pet sitter or a pet owner, and upon their choice, they will have different interfaces/tabs and options according to what they need from the platform. After creating accounts, the owners will be able to add information about their pets and view pet sitter profiles to find the one most appropriate, then send pet-sitting requests. The pet sitters on the other hand will be able to add on their profiles the categories of pets they can pet-sit and any important details that would influence the viewers, then either accept requests or decline them. 

To maintain good quality services from the pet sitters, there will exist the option to promote pet sitters amongst other pet sitters(Good ratings) or warn the owners about them (Flagging/Reporting). Flagging owner is also an option. 
</p>

<h3> Technologies </h3>
<p> The implementation of the application is in JavaScript, I used the Node.js backend framework “Express.js”. For the ORM framework, I chose Sequelize which will link the MySQL database to the backend. The protocol of the web service is REST. The front-end would potentially be done with the Nuxt.js framework.</p>

<h3> Functional Requirements </h3>
<h4>Actors</h4>
There will be three actors on this web application:
<ul>
<li>Two types of clients: Pet owners, and Pet sitters(people who offer to take care of the pets).
Admin</li>
</ul>
<h4> Pet owner Functionalities</h4>
<ul>
<li> A pet owner shall be able to search for pet-sitters by city and pet. </li>
<li> A pet owner shall be able to search for pet-sitters by (part of) their name. </li>
<li> A pet owner shall be able to create an account (Pet-owner role) </li>
<li> A pet owner shall be able to send a pet-sitting request. </li>
<li> A pet owner shall be able to keep track of accepted pet-sitting sessions. </li>
<li> A pet owner shall be able to rate a pet-sitter. </li>
<li> A pet owner shall be able to flag/report a pet-sitter </li>
<li> A pet owner shall be able to add-modify-delete a pet (description/relevant information) </li>
</ul>
<h4> Pet sitter Functionalities</h4>
<li> A pet sitter shall be able to create an account (Pet-sitter role)</li>
<li> A pet sitter shall be able to accept/decline a pet-sitting request. </li>
<li> A pet sitter shall be able to add a category of pets they are willing to take care of. </li>
<li> A pet sitter shall be able to search for accepted pet-sitting requests.</li>
<h4> Admin Functionalities </h4>
<li> An admin shall be able to create other admin accounts. </li>
<h3> Non-functional Requirements </h3>
<h4> Performance</h4>
<li> The system shall demonstrate a decent level of performance i.e. The system shall allow the client to pass Google Lighthouse performance test with at least 80% </li>
<h4>Scalability.</h4>
<li> The system shall maintain, at a reasonable cost, a good performance level in peak times and with an increase in load.</li>
<h4>Security</h4>
<li> Data traffic shall be confidential and its integrity shall be protected.</li>
<li> An authentication of the client and server shall be carried out and verified.</li>
<li> Pet owners/Pet sitters shall only have access to their own accounts, and related actions/records.</li>
<li> The high availability of the servers shall be guaranteed.</li>

<h2> Architecture </h2>

<h4> Physical Architecture - Initial </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Initial.png)

<h4> Physical Architecture - Protocols & Software </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Protocols%26Software.png)

<h4> Physical Architecture - Resilient (No SPoF) / Scalable </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Scalable.png)

<h4> Logical Architecture - Inside an Application Server </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Inside-App-Server.png)

<h2> Design </h2>

<h4> Models Diagram </h4>
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Models.png)

<p>In my diagram there are a few entities that represent the classes of my web application that were mentioned. First we have the user entity; each user is connected in a 1:1 relationship with “pet owner” or “pet sitter” models, which are two types of clients of my application. There is a pet entity where everything related to the pets owned by pet owners is; since each owner can have many pets, there is a 1:M relationship between them. A pet owner can make many requests, a pet sitter can receive many requests: request is an entity of its own that is related to both of them in a 1:M relationship since each request is specific to one pet owner/pet user. Each pet sitter can have one rating as an evaluation of their service. The authority model holds attributes for admin accounts.</p>

<h4> Services Diagram </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Services.png)

<p>The services of my application according to my functional requirements are: rating a pet sitter since it requires some calculations to be done before updating the entity, pet sitting request related actions, pet actions because of associations and certain verifications, and finally, user/account-related actions because of the different data checks needed.</p>

<p><strong><em>User Service:</em></strong> uses 4 models; the user model, the pet sitter/owner models, and authority model.</p>

<p><strong><em>Rating Service:</em></strong>  uses 2 models; the rating model and the user model for certain attributes.</p>

<p><strong><em>Request Service:</em></strong>  uses 2 models; the request model and the user model for certain attributes.</p>

<p><strong><em>Pet Service:</em></strong>  uses 2 models; the pet model and user model for certain attributes.</p>

<h3>Sequence Diagrams</h3>

<h4> Data-driven Sequence Diagram </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Data-driven.png)

<p>When the user sends a request through the REST Capable client with parameters in a JSON file, those parameters are then parsed by the ExpressJs body parser for the use of the models in creation for example, or else. Responses to client requests can sometimes have bodies as well, the parser encloses that data and sends it to the client which then serves it to the user.</p>

<h4> Service-driven Sequence Diagram </h4>
![alt text](https://github.com/aidahimm/petsit/blob/master/diagrams/Sequence.png)

<p>The user uses a REST capable client to send a request to a REST routing API. The router forwards the HTTP request to the appropriate controller based on the request path (e.g “http://localhost:####/api/<strong>getUsers</strong>”). The controller will then call the service specified and send any parameters needed. The services call methods on certain models that are mapped to the DBMS as tables. When the queries are executed, there is a “waterfall” of returns until reaching again the REST capable Client which renders the UI with the result for the user. </p>

<h2> Development </h2>
<ul>
<li>Clone this repository</li>
<li>install npm</li>
<li>cd petsit</li>
<li>run "npm install" to install the dependecies</li>
</ul>


//instructions for Sequelize + Database

