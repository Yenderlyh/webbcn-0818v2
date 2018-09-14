# Project Name

## Description

Describe your project in one/two lines.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user I want to access the homepage so that I see the list of students
- **Sign up** - As a user I want to sign up on the webpage so that I can use the private features
- **Login** - As a user I want to log in on the webpage so that I can get back to my account
- **Logout** - As a user I want to log out from the webpage so that I can make sure no one will access my account
- **Images list** - As a user I want to see all the images available so that I can see all the images
- **Image create** - As a user I want to upload an image so that I can share it with others
- **Image delete** - As a user I want to delete an image so that I can correct a mistake

## Backlog
List of other features outside of the MVPs scope

Images:
- Add comments to images

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of projects built by the users

## Routes:

- GET / 
  - renders the homepage

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)

- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - password
    - name
    - role
  - validation
    - fields not empty
    - user not exists
  - create user with encrypted password
  - store user in session
  - redirect to /

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)

- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty
    - user exists
    - passdword matches
  - store user in session
  - redirect to /

- POST /auth/logout
  - body: (empty)
  - redirect to /

- GET /images
  - renders the image list
  - show the create button if user is logged in

- GET /images/create
  - redirects to /auth/login if user is anonymous
  - renders the image create form
  
- POST /images/create 
  - redirects to /auth/login if user is anonymous
  - body: 
    - title
    - url
    - category
  - validation
    - fields not empty
  - upload file to cloudinary
  - create image
  - redirect to /images

- POST /images/:id/delete 
  - redirects to /auth/login if user is anonymous
  - validation
    - id is valid (redirects to /images)
    - id exists (redirects to /images)
  - body: empty
  - deletes the image
  - redirect to /images

## Models

User model
 
```
username: String (required)
password: String (required)
name: String (required)
role: String (enum: student, teacher) (required)
```

Image model

```
createdBy: ObjectId<User> (required)
title: String (required)
url: String (required)
category: String (enum: people, calendar, activity) (required)
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)