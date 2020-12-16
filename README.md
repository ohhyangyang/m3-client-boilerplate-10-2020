# Wusic - M3 Project 

![](https://images.unsplash.com/photo-1499415479124-43c32433a620?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3289&q=80)

## Description

**Wusic** is a platform helping users to find a suitable musician for a project, or reverse.

There are lots of musicians available worldwide. But, there is limited access to these people to contact and invite them to become a member of a project or a band. Wusic will help musicians to find their place and make music with others.

## User Stories

* 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

* 500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

* Landing page - user can enter to signup and login here

* Signup - the page where the user can sign up to the Music platform 

* Login - the page where the user can log in to his/her dashboard

* Dashboard page - shows the user ongoing projects and the user can choose his/her project partners, also shows the projects the user recently worked and his/her liked musicians

* Project searching page - showing all the projects that are published by other users, the user can search with filters (project type, artist type and instrument ), and send a request to the project owner

* Project detail page - showing the detail info of a project, you can send a request to the project owner here

* Create project page - user can create a new project

* Edit project page - user can edit or delete his/her project

* Musician searching page - shows the musician list of Wusic platform, the user can search with filter (artist type and instrument)

* Profile page - showing the user info: basic info, description and spotify embed

* Edit profile page - user can edit his/her profile

* About page - info about Wusic

## Backlog ##

* CSS refactoring with styled component and responsive
* Message box

## Client / Frontend

### React Router Routes (React App) ###

| PATH                             | COMPONENT     | PERMISSION       | BEHAVIOUR                                                    |
| :------------------------------- | ------------- | ---------------- | ------------------------------------------------------------ |
| `/wusic`                         | Landing Page  | `<AnonRoute>`    | Landing Wusic                                                |
| `/signup`                        | Signup        | `<AnonRoute>`    | Signup form, redirect to the Dashboard after signup          |
| `/login`                         | Login         | `<AnonRoute>`    | Login form, redirect to the Dashboard after Login            |
| `/wusic/dashboard`               | Dashboard     | `<PrivateRoute>` | Show the ongoing projects, joined projects and the liked artist of the user |
| `/wusic/musicians`               | MusicianList  | `<PrivateRoute>` | Show all the Musicians                                       |
| `/wusic/musicians/:userId`       | Profile       | `<PrivateRoute>` | Show user or an artist's profile                             |
| `/wusic/projects`                | ProjectsList  | `<PrivateRoute>` | Show all the projects                                        |
| `/wusic/projects/:projectId`     | ProjectDetail | `<PrivateRoute>` | Show the detail of a project                                 |
| `/wusic/edit-profile`            | EditProfrile  | `<PrivateRoute>` | Edit user profile                                            |
| `/wusic/edit-project/:projectId` | EditProject   | `<PrivateRoute>` | Edit user's project                                          |
| `/wusic/add-project`             | AddProject    | `<PrivateRoute>` | Add new project                                              |

### Component ###

* LandingPage

* LoginPage
* SignupPage
* DashboardPage
* ProfilePage
* ProjectListPage
* MusicanListPage
* ProjectDetailPage
* EditPojectPage
* AddProjectPage
* EditProfilePage
* Menu
* ongoingProjectCard
* AnonRoute
* PrivateRoute

### Services ###

* Auth

  * auth.login(user)

  * auth.signup(user)

  * auth.logout()

  * auth.me()

  * auth.getUser()

* Api

  * api.getOneUser(userId)
  * api.updateUser(user)
  * api.createProject(project)
  * api.getOneProject(projectId)
  * api.updateProject(project)
  * api.deleteProject(projectId)
  * api.getAllOfOneUser(userId)
  * api.accepriRequest(proejctId,userId)
  * api.getAllUsers()
  * api.likeOneUser(userId)
  * api.dislikeOneUser(userId)
  * api.sendRequest(projectId,userId)
  * api.cancelRequest(projectId,userId)
  * api.getAllProjects()

  

  

  

  

  

  

  


## Server / Backend

### User model 

```js
{   username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password:{type: String, required:true},
    profileURL:{type: String, default:"/images/default_user_image.png"},
    description: {type: String, maxLength: 500},
    artistType:[{type:String,enum:['Singer', 'Composer', 'ccc', 'ddd'], required: true}],  
    genre:{type:String},
    instrument:[{type:String, enum:['Guitar', 'Piano', 'Sax', 'Violin'], required: true}],  
    spotyfyLink:{type:String},
    projectsOwned: [{type:Schema.Types.ObjectId, ref:"Project"}],
    projectsJoined:[{type:Schema.Types.ObjectId, ref:"Project"}],
    likedUsers:[{type:Schema.Types.ObjectId, ref:"User"}]
    
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
}
```



### Project model

```js
{
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    type:{ type: String, enum: ["Live", "Publication", "blabla"] },  
    lookingFor:[{type:String,enum:['Singer', 'Composer', 'ccc', 'ddd'],required:true}],   
    location:{type: String},
    fee:{type: Number},
    coverURL:{type: String, default:"/images/default_user_image.png"},
    description:{type: String, maxLength: 500},
    status:{ type: String, enum: ["open", "close"] },
    requests:[{ type: Schema.Types.ObjectId, ref: "User" }],
    participants:[{ type: Schema.Types.ObjectId, ref: "User" }]

  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
```

6 22

### API Endpoints (backend routes) ###

| METHOD | URL                                               | REQUEST BODY                                                 | SUCCESS CODE | ERROR CODE | DESCRIPTION                                                  |
| ------ | ------------------------------------------------- | ------------------------------------------------------------ | ------------ | ---------- | ------------------------------------------------------------ |
| GET    | `/auth/me`                                        |                                                              | 200          | 404        | Check if user is logged in and return profile page           |
| POST   | `/auth/signup`                                    | {username, email, password, artist type, instrument}         | 201          | 500        | SIGNUP: Create new user with the validation, and save user info in session |
| POST   | `/auth/login`                                     | {email, password}                                            | 200          | 401        | LOGIN: If user exists and password matches, save user info in session |
| GET    | `/auth/logout`                                    |                                                              | 204          | 500        | Destroy session and logs user out                            |
| GET    | `/api/projects`                                   |                                                              | 200          | 500        | PROJECTLIST: Show all populated projects                     |
| POST   | `/api/projects`                                   | {title, type, looking for, location, fee, coverURL, description} | 201          | 500        | Create a project                                             |
| GET    | `/api/projects/:projectId`                        |                                                              | 200          | 500        | PROJECT DETAIL: Show all the info of a project               |
| PUT    | `/api/projects/:projectId`                        | {title, type, looking for, location, fee, coverURL, description} | 200          | 500        | Edit a project                                               |
| DELETE | `/api/projects/:projectId`                        |                                                              | 202          | 500        | Delete a project                                             |
| GET    | `/api/projects/acceptation/:projectId/:userId`    |                                                              | 202          | 500        | Choose a participant for a project                           |
| GET    | `/api/projects/rejection/:projectId/:userId`      |                                                              | 202          | 500        | Reject requests of a project                                 |
| GET    | `/api/projects/request/:projectId/:userId`        |                                                              | 202          | 500        | Send a project request                                       |
| GET    | `/api/projects/cancel-request/:projectId/:userId` |                                                              | 202          | 500        | Cancel project request                                       |
| GET    | `/api/projects/open/projectId`                    |                                                              | 202          | 500        | Set project status to "open"                                 |
| GET    | `/api/projects/close/projectId`                   |                                                              | 202          | 500        | Set project status to "close"                                |
| GET    | `/api/users`                                      |                                                              | 200          | 500        | MUSICIANLIST: Show all musicians                             |
| GET    | `/api/users/:userId`                              |                                                              | 200          | 500        | Show all the info of one user                                |
| PUT    | `/api/users/:userId`                              | {name, email, profileURL, description, artistType, genre, instrument, spotifyLink} | 200          | 500        | Edit user profile                                            |
| DELETE | `/api/users/:userId`                              |                                                              | 202          | 500        | Delete profile                                               |
| GET    | `/api/users/like/:userId`                         |                                                              | 200          | 500        | Like a user                                                  |
| GET    | `/api/users/dislike/:userId`                      |                                                              | 200          | 500        | Cancel like a user                                           |
| POST   | `/api/projectupload`                              |                                                              |              |            | Upload project image                                         |
| POST   | `/api/userupload`                                 |                                                              |              |            | Upload user image                                            |





## Links ##

### Trello ###

 [Trello](https://trello.com/b/DrQgOYJC/m3-project)

### Git ###

[Client repo Link](https://github.com/ohhyangyang/m3-wusic-client)

[Server repo Link]( https://github.com/ohhyangyang/m3-wusic-server)

[Deployed App]( https://wusic-app.herokuapp.com/)

### Slides ###

[Presentation](https://docs.google.com/presentation/d/1MMGZ1kV6NKJFPZhA1pVXr_UndR0AGNPkk2WFp7G9uRI/edit?usp=sharing)