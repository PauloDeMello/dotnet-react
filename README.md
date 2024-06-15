# Reactivities
## Aims
- Get involved and practical experience with building end-to-end webapps with .NET and React.
- Learn the tools and workflows involved.
- Learn about clean architecture and patterns.
- Build something to showcase!
## Tools used
- .NET Core - Backend.
- React - Frontend.
- Vite - Framework we are using for React.
- Semantic UI React - Library for frontend dev.
- Axios - Fancy fetch requests with more control and callbacks.
- Postman - Used to test API endpoints.
- Typescript - strongly typed version of js.
- SQLite - used for dev SQL db - very lightweight.
## Concepts and Design patterns
-  **Clean Architecture (Bob Martin)**
	- Flow of information should go one way, e.g UI should have a dependancy on the API but not the other way round.
		- **Gateways** (DB) and **Presenters** (UI)
		-  	-> **Controllers / API** (API / Controllers)
			- Input handling logic and passes on to use cases.
		- -> **Use cases / Application layer** (CRUD requests and handlers) 
			- Handle flow of data to and from Entities to achieve goals of use case.
		- -> **Entities / Domain layer** - (Entities / "business logic")
			- Core objects with methods.
- **MVC** - Model View Controller 
	- **Model** represents the Data layer / Business logic and handles Entities.
	- **View** represents UI / Presentation layer and displaying of data, renders Entity data and sends user input to Controller.
	- **Controller** represents Controllers / Use cases and the intermediary components between the Views and Models. Processes user inputs and updates views / models as needed.
- **CRUD** - Create, Read, Update and Delete API endpoints.
- **CQRS** - Command and Query Responsibility Separation.
	- Separate out logic for _doing_ (Commands) and _returning_ (Queries). 
	- E.g  create entity = command, get list of entities = query.
- **Mediator pattern** - Use separate Mediator objects to _handle_ commands and queries from API to Application Layer. 
	- Means that API and Application layer do not have any code for this logic inside of them, so interactions can be modified independently of either.
