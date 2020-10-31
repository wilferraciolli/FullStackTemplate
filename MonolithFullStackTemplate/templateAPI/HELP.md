Template monolith api

#Database server
This project is using 1 MySQL database server with multiple databases created on it. 
The image is a custom image that can be built with the `Dockerfile` on the root folder of the repository.

The image is build from the original MySql image with the additions of:
     
     1.Adding default users
     2.Adding a SQL script to ruin at the image creation stage to create databases 

To build the image, run the code below on the CMD within the folder where the dockerfile is. The command is to build the image based on the instruction of the docker file. Also the command structure is <docjker command to build> <properties and image name> *PS, Make sure that the build process succeeds*

    `docker build -t me/database .` 

The command above will create an image with MySQL with custom properties and databases created for the application.
Then to check the image created, type in to the CMD docker/images and it should have the me/database image
Then to run it, type in the CMD `docker run --name marketEngineDatabase -p3306:3306 -d me/database`

Next it is possible to log onto the container to check the database. By typing on to the CMD `docker exec -it marketEngineDatabase /bin/bash` *Ps the container name is case sensitive*

That will allow to enter on to the container, now it is possible to enter onto the database server with the command structure of `mysql -u<usernamme> -p<password>` EG
       
       `mysql -uWilFerraciolli -pPerugia2006`

#H2 console database
To see the database on the browser
    disable authentication
then add the folowing properties on the properties file
    #Add h2 database connection details
    spring.jpa.hibernate.ddl-auto=none
    spring.h2.console.enabled=true
    spring.datasource.url=jdbc:h2:file:~/test
    spring.datasource.driver-class-name=org.h2.Driver

Then go the the page `http://localhost:5001/api/h2-console` and log in

#Encryption password
plain value = password
encrypted value = {bcrypt}$2a$10$2WacIN6u7bxhQOkx9gxPAOaTZjab0GCzoCSdJF7HU5ajf5CC4hgga

#Users Registration
Currently every user that requests to register are created by default as disabled users until they activate their accounts via the emails sent with the link.
The link generated is for the activateAccount end point which will take their user id (this can be replaced with a randon token)

#Email server
Currently the email server is set up to use mailTrap.io, it is a service to quickly test emails

#Users
There are 2 tables and 1 view to display user/person informantion

#####Table User 
contains only the necessary details to authenticate, it is meant to be super fast.
Once the user is created, en event is published so the Person table can create its record
#####Table Person
Contains all the values necessary for the Person, it is all about personal details with a link to the userId. Person should not be created via an end point, it should always be created as an event handler for the user creating/
#####View UserDetailsView
Contains information for a user with added person details.

# Cache
Cache was added to this application. aa tutorial can be found in here
https://www.baeldung.com/spring-boot-ehcache

