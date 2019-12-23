using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GDGLeMans.DataTransferObjects;
using Meetup.Api;
using Microsoft.AspNetCore.Mvc;

namespace GDGLeMans.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : ControllerBase
    {

        /*
         * This API only has a GET method
         * We fetch the data from the meetupAPI
         * Check the consistency with the DB
         *      => Add any event from the site to the Db if they aren't already in it
         *      => Remove any event from the Db if they aren't on the meetup website anymore
         */

        public StatsController() { }


        // GET: api/Stats
        [HttpGet]
        public async Task<ActionResult<StatsDTO>> GetStats()
        {
            var group = await MeetupApi.Group.Group("GDG-Le-Mans", CancellationToken.None);
            var events = await MeetupApi.Events.Events("GDG-Le-Mans", "past,upcoming", CancellationToken.None);

            if (!events.results.Any())
            {
                return new StatsDTO
                {
                    MembersCount = group.Members,
                    AverageParticipant = 0,
                    EventCount = 0
                };
            }

            int averageParticipant = events.results.Sum(e => e.YesRSVPCount) / events.results.Count;
            
            return new StatsDTO
            {
                MembersCount = group.Members,
                AverageParticipant = averageParticipant,
                EventCount = events.results.Count
            };

        }       
    }
}