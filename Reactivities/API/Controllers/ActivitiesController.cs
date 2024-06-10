using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {


        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query()); //Lists all entries in Activities table
        }

        [HttpGet("{id}")] //api/activities/fdfeiowfjw
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost] //api/activities/fdfeiowfjw
        public async Task<IActionResult> CreateActivity(Activity activity) //Figures out creating the Activity from the request by itself
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")] //api/activities/fdfeiowfjw
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) //Figures out creating the Activity from the request by itself
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command { Activity = activity });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id) //Figures out creating the Activity from the request by itself
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }


    }
}