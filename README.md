# Specification Document

## How to start up containers

To set up port forwarding:

`ssh -f -N -L 3306:localhost:53396 YOUR_USERNAME@cs506x08.cs.wisc.edu`

To start the container itself:

`docker compose up --build`

When finished, you can kill the forwarded port with : `lsof -i tcp:30360`

## TeamName

Team 8

### Project Abstract

<!--A one paragraph summary of what the software will do.-->

The Campus Rating System is a mobile application designed to enhance the student experience by providing a platform for discovering, rating, and sharing various locations on campus. This innovative tool aims to help students find ideal spots for studying, relaxing, or engaging in specific activities. 

### Customer

<!--A brief description of the customer for this software, both in general (the population who might eventually use such a system) and specifically for this document (the customer(s) who informed this document). Every project will have a customer from the CS506 instructional staff. Requirements should not be derived simply from discussion among team members. Ideally your customer should not only talk to you about requirements but also be excited later in the semester to use the system.-->
The primary target audience for this software consists of UW-Madison students seeking convenient and suitable spaces on campus for various activities, including studying, napping, socializing, or engaging in other leisure pursuits. These students range from freshmen to graduate students across all disciplines, each with unique needs and preferences for campus spaces.
Secondary users may include UW-Madison faculty and staff who are looking for quiet areas to work, hold informal meetings, or take short breaks between classes or appointments.
Specific customers informing this document include:

1.A representative from the CS506 instructional staff, who will provide guidance and evaluate the project's alignment with course objectives.
2.A diverse group of UW-Madison students, including:

- An undergraduate student living off-campus who needs quiet study spots between classes
- A graduate student seeking comfortable areas for group project meetings
- An international student looking for welcoming spaces to socialize and meet new people
- A student athlete searching for convenient nap locations between practice sessions and classes
3.A faculty member interested in finding alternative workspaces outside their office

### Specification

<!--A detailed specification of the system. UML, or other diagrams, such as finite automata, or other appropriate specification formalisms, are encouraged over natural language.-->

<!--Include sections, for example, illustrating the database architecture (with, for example, an ERD).-->

<!--Included below are some sample diagrams, including some example tech stack diagrams.-->

#### Technology Stack

Mapping will be handled via OpenStreetMaps using Leaflet.

A <-->|"REST API"| B

```mermaid
flowchart RL
subgraph Front End
	A(React)
end
	
subgraph Back End
	B(Java: SpringBoot)
end
	
subgraph Database
	C[(MySQL)]
end

A <-->|REST API| B
B <--> C
```

#### Database

```mermaid
---
title: Our Database ERD
---
erDiagram
    User {
      INT user_id PK
      VARCHAR google_id
      VARCHAR name
      VARCHAR email
      DATETIME created_at
      DATETIME updated_at
    }

    Location {
      INT location_id PK
      VARCHAR name
      TEXT description
      VARCHAR category
      FLOAT latitude
      FLOAT longitude
      VARCHAR address
      DATETIME created_at
      DATETIME updated_at
    }

    Review {
      INT review_id PK
      INT user_id FK
      INT location_id FK
      INT rating
      TEXT comment
      DATETIME created_at
      DATETIME updated_at
    }

    Task {
      INT task_id PK
      VARCHAR name
      TEXT description
    }

    Location_Task {
      INT location_task_id PK
      INT location_id FK
      INT task_id FK
      INT suitability_rating
    }

    Favorite {
      INT favorite_id PK
      INT user_id FK
      INT location_id FK
    }

    Image {
      INT image_id PK
      INT location_id FK
      VARCHAR image_url
      DATETIME uploaded_at
    }

    User ||--o{ Review : writes
    Location ||--o{ Review : receives
    Location ||--o{ Location_Task : has
    Task ||--o{ Location_Task : rated_for
    User ||--o{ Favorite : favorites
    Location ||--o{ Favorite : is_favorited
    Location ||--o{ Image : has
```


#### Class Diagram

```mermaid
---
title: Class Diagram for Campus Rating Program
---
classDiagram
    class User {
        - private int user_id;
        - private CHAR google_id;
        - private String name;
        - private String email;
        - private String password;
        - private String created_at;
        - private String updated_at
        
        + get all variables()
        + set all variables()
    }
    class Location {
        - private int location_id
        - private String place
        - private CHAR category
        - FLOAT latitude
        - FLOAT longitude
        - private CHAR address
        - private String created_at
        - private String updated_at
        
        + get all variables()
        + set all variables()
    }
    class Favorites{
        - private int favorite_id
        - private int user_id
        - private int location_id
        
        + get all variables()
        + set all variables()
    }
    class Image{
        - private int image_id
        - private int location_id
        - private CHAR image_url
        - private String uploaded_at
        
        + get all variables()
        + set all variables()
    }
    class Task{
        - private int task_id
        - private CHAR name
        - private String description
        
        + get all variables()
        + set all variables()
    }
    class Location_Task{
        - private int location_task_id
        - private int location_id
        - private int task_id
        - private int suitability_rating
        
        + get all variables()
        + set all variables()
    }
    class MainController {
        @POST
        + Boolean addNewUser(String username, String email)
        @GET
        + Boolean loginAttempt(String email, String password)
        @GET
        + Location placeInfo(String placeName)
        @POST
        + Boolean recommendPlace(String place, String typeOfPlace)
        @POST
        + Boolean addReview(String username, String, placeName, int rating, String review)
        @POST
        + Boolean addFavoritePlace(String username, String placeName)
        @GET
        + List<Location> getFavoritePlaces(String username)
        @GET
        + List<Location> filterByRating(int rating)
        @GET
        + List<Location> filterByTask(String task)
        @GET
        +List<Location> filterBySearch(String place)
    }
    MainController <|-- User
    MainController <|-- Location
    MainController <|-- Favorites
    MainController <|-- Image
    MainController <|-- Task
    MainController <|-- Location_Task
```

#### Flowchart

```mermaid
---
title: Sample Program Flowchart
---
graph TD;
    Start([Start]) --> Input_Data[/Input Data/];
    Input_Data --> Process_Data[Process Data];
    Process_Data --> Validate_Data{Validate Data};
    Validate_Data -->|Valid| Process_Valid_Data[Process Valid Data];
    Validate_Data -->|Invalid| Error_Message[/Error Message/];
    Process_Valid_Data --> Analyze_Data[Analyze Data];
    Analyze_Data --> Generate_Output[Generate Output];
    Generate_Output --> Display_Output[/Display Output/];
    Display_Output --> End([End]);
    Error_Message --> End;
```

#### Behavior

```mermaid
---
title: State Diagram For UW Campus Reviewer
---
stateDiagram
    [*] --> LandingPage
    LandingPage --> Login : Clicks login
    Login --> LoggedIn : Entered correct user & password
    Login --> Register : Clicks sign up
    Login --> Login : Enters incorrect user or password
    Register --> LoggedIn : Creates account
    LoggedIn --> StudySpot : Selects Study Spot
    StudySpot --> FilteredSpots : Filters by rating
    FilteredSpots --> StudySpot : Selects Study Spot
    StudySpot --> ReviewPage : Adds Review
    ReviewPage --> LoggedIn : Submits Review
```

#### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User ->> Frontend: Clicks on location name or map pin
    Frontend ->> Backend: Send location details request (location ID)
    Backend ->> Database: Query for location information
    Database -->> Backend: Return location information
    Backend ->> Database: Query for reviews and ratings
    Database -->> Backend: Return reviews and ratings data
    Backend -->> Frontend: Send location info and review data
    Frontend -->> User: Display location details, comments, and rating

    User ->> Frontend: Submit new comment and rating
    Frontend ->> Backend: Send new comment and rating
    Backend ->> Database: Update comment and rating
    Database -->> Backend: Confirm update
    Backend -->> Frontend: Confirm successful update
    Frontend -->> User: Display new comment and rating

```

### Standards & Conventions

<!--This is a link to a seperate coding conventions document / style guide-->
[Style Guide & Conventions](STYLE.md)
