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

# Chapter 1 - Backend
This section overviews the overall structure of the backend, and describes the components and useful commands.
## Overview and structure
-  **Clean Architecture (Bob Martin)**
	- Flow of information should go one way, e.g UI should have a dependency on the API but not the other way round.
		- **Gateways** (DB) and **Presenters** (UI)
		-  	-> **Controllers / API** (API / Controllers)
			- Input handling logic and passes on to use cases.
		- -> **Use cases / Application layer** (CRUD requests and handlers) 
			- Handle flow of data to and from Entities to achieve goals of use case.
		- -> **Entities / Domain layer** - (Entities / "business logic")
			- Core objects with methods.
## Solution
.NET / C# projects require solutions, such that projects in solutions can reference each other's classes and methods.
`dotnet new sln`
`dotnet sln add API/API.csproj`
`dotnet sln add Application/Application.csproj`
## Project References
To follow Clean Architecture principles, project references should adhere to the flow of information.

```
cd API
dotnet add reference ../Application/Application.csproj
cd ../Application
dotnet add reference ../Domain/Domain.csproj
dotnet add reference ../Persistence/Persistence.csproj
cd ../Persistence
dotnet add reference ../Domain/Domain.csproj
cd ..
dotnet restore
 ```
## API 
The API for this project contains the Controller for the API which describes all the API endpoints 
- ActivitiesController class, creates an endpoint called Activities. 
- Each method in this class has an attribute describing what type of operation it is e.g **[HttpGet("{id}"]** for getting an entity with the id parameter -> **//api/activities/id**
- We use MediatR to call the Application Commands / Queries with inputted data.

Created with `dotnet new webapi -n API --use-controllers`

## Application
The Application project contains the actual methods to perform requests on the database.
We use MediatR and CQRS patterns to do this.
For each operation we have a separate class that follows the MediatR IRequest structure.

For example for a Query the structure is as follows:


```
public class QueryOperation
{
	public class Query : IRequest<$ReturnType>
	{ 
		public var RequestVariable {get; set;}
	}
	
	public class Handler : IRequestHandler<Query,$ReturnType>
	{
		private readonly DataContext _context;
		public Handler(DataContext context)
		{
			_context = context;
		}
		
		public Task<$ReturnType> Handle(Query request, CancellationToken cancellationToken)
		{
			return await //logic
		}
}
```
Commands follow a similar structure, except they do not return anything and use `Command` instead of `Query`.

## Domain
The Domain project contains "business logic" and your Entity information, in a .NET project you just have a class with public members and no methods. 

An Entity class should reflect the structure you want your SQL table to follow, i.e the members of the class will be the columns in your db.

Here's an example of an Entity class

```
public  class  Activity
{
	public  Guid  Id { get; set; } //primary key of db automatically found
	public  string  var1 { get; set; }
	public  int  var2 { get; set; }
	public  DateTime  date { get; set; }
}
```

- They are a couple fancy key words here that automatically pipe -> i.e If you have a member called `Id` this will automatically be read as the primary key in the db. 

## Persistence

The Persistence project handles the relationship between the db and the entity classes. 

In this project we use the DbContext service:
- DbContext sets up the relationship between the Entity and the backend db
- It also adds a layer of abstraction, meaning we can change backend db simply.

```
services.AddDbContext<DataContext>(opt  =>
{
	opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
});
```
Here we are setting up the DbContext to use Sqlite as our backend db.

- GetConnectionString("DefaultConnection") refers to our appsettings.json file where we have an entry
``` 
"ConnectionStrings": 
{
	"DefaultConnection": "Data Source=reactivities.db"
}
```

To set up DBContext with our Entity we need to set up a class that derives from the DbContext class

We need two members in this class for it to be set up correctly

1) An empty constructor with `DbCOntextOptions Options` as a parameter
`public  DataContext(DbContextOptions  options) : base(options)`

2) A member `DbSet` member with the type being your Entity class and the name representing the db table name.
`public  DbSet<Activity> Activities { get; set; }`

