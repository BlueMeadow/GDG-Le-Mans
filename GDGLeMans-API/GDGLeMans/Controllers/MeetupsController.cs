using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GDGLeMans.Models;
using Meetup.Api;
using System.Threading;
using GDGLeMans.DataTransferObjects;
using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace GDGLeMans.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetupsController : ControllerBase
    {
        private readonly GDGContext _context;

        public MeetupsController(GDGContext context, ILogger<MeetupsController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet("populate")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GDGMeetup>>> PopulateDb()
        {
            var _meetups = _context.Meetups.OrderByDescending(m => m.Id).ToList();
            if(_meetups == null)
            {
                var events = (await MeetupApi.Events.Events("GDG-Le-Mans", "upcoming, past", CancellationToken.None)).results;

                await CheckDbAPIConsistency(events, _meetups);
            }            

            return NoContent();
        }

        [HttpGet("mockdata")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GDGMeetup>>> PopulateDbWithMockData()
        {

            var meetups = new List<GDGMeetup>();
            var tags = new List<GDGTag>();
            int i;

            var meetup = new GDGMeetup() { Content = "MockData", SpeakerName = "Blue Meadow", MeetupId = "265177852", Upcoming = false };

            var tag1 = new GDGTag() { TagString = "tag1" };
            var tag2 = new GDGTag() { TagString = "tag2" };
            var tag3 = new GDGTag() { TagString = "tag3" };

            meetup.MeetupTags = new List<MeetupTag> { new MeetupTag() { GDGTag = tag1, GDGMeetup = meetup } };
            meetup.MeetupTags.Add(new MeetupTag() { GDGTag = tag2, GDGMeetup = meetup });
            meetup.MeetupTags.Add(new MeetupTag() { GDGTag = tag3, GDGMeetup = meetup });

           _context.Meetups.Add(meetup);                

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private readonly ILogger<MeetupsController> _logger;

        // GET: api/Meetups/status/{status}
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<MeetupDTO>>> GetUpcomingMeetups(string status)
        {
            var _meetups = await _context.Meetups.OrderByDescending(m => m.Id).Include(m => m.MeetupTags).ToListAsync();
            List<GDGMeetup> meetups;
            if (status.Equals("upcoming"))
            {

                meetups = _meetups.FindAll(m => m.Upcoming);

            } else if(status.Equals("past"))
            {
                meetups = _meetups.FindAll(m => !m.Upcoming);
            } else
            {
                return BadRequest("Error 400: BAD REQUEST\n"+ status + " is not a valid endpoint.");
            }
            
            //var allTags = _context.Tags.ToList();
            var events = (await MeetupApi.Events.Events("GDG-Le-Mans", status, CancellationToken.None)).results;

            await CheckDbAPIConsistency(events, meetups);

            List<MeetupDTO> meetupList = new List<MeetupDTO>();

            if (events.Any())
                foreach (Event e in events)
                {
                    GDGMeetup m = meetups.Find(m => m.MeetupId.Equals(e.Id));
                    List<GDGTag> tags = new List<GDGTag>();

                    if (m.MeetupTags != null)
                    {
                        foreach (MeetupTag mt in m.MeetupTags)
                        {
                            var tag = _context.Tags.ToList().Find(t => t.Id == mt.GDGTagId);
                            tags.Add(new GDGTag() { Id = tag.Id, TagString = tag.TagString });
                        }
                    }

                    meetupList.Add(new MeetupDTO
                    {
                        Event = e,
                        GDGMeetup = m,
                        Tags = tags
                    });
                }

            return meetupList;

        }

        // GET: api/Meetups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeetupDTO>> GetMeetup(long id)
        {
            var meetup = _context.Meetups.Find(id);

            var meetuptags = _context.MeetupTag.Include(mt => mt.GDGTag).ToList();


            if (meetup == null)
            {
                return NotFound(); // 404
            }

            List<GDGTag> tags = new List<GDGTag>();

            if (meetup.MeetupTags != null)
            {
                foreach (MeetupTag mt in meetup.MeetupTags)
                {
                    tags.Add(new GDGTag() { TagString = mt.GDGTag.TagString });
                }
            }            

            var Event = await MeetupApi.Events.Event("GDG-Le-Mans", meetup.MeetupId, CancellationToken.None);

            return new MeetupDTO { GDGMeetup = meetup, Event = Event, Tags = tags };
        }

        // PUT: api/Meetups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutMeetup(long id, MeetupDTO _meetup)
        {
            if (id != _meetup.GDGMeetup.Id)
            {
                return BadRequest(); // 400
            }

            var meetup = _context.Meetups.Include(m => m.MeetupTags).FirstOrDefault(m => m.Id == id);
            var tags = _context.Tags.ToList();
            var meetupTags = _context.MeetupTag.Include(mt => mt.GDGTag).Include(mt => mt.GDGMeetup).ToList();

            meetup.Content = _meetup.GDGMeetup.Content;
            meetup.SpeakerName = _meetup.GDGMeetup.SpeakerName;
            
            meetup.MeetupTags = new List<MeetupTag>();
            

            // Adding non existing tags
            foreach (GDGTag t in _meetup.Tags)
            {
                MeetupTag mt;
                // Check if the tag already exists in the database
                if (tags.Contains(t))
                {
                    // If Yes, check if the MeetupTag joining the Meetup and Tag already exists
                    mt = meetupTags.FirstOrDefault(mt => (mt.GDGTag.Equals(t) && mt.GDGMeetup.Equals(meetup)) );                   
                   
                    if(mt == null)
                    {
                        // If not, create it
                        mt = new MeetupTag()
                        {
                            GDGMeetup = meetup,
                            GDGTag = tags.First(tagInDB => tagInDB.Equals(t))
                        };
                    } 
                }
                else
                {
                    // If not, create the Tag and the meetup Tag
                    GDGTag tag = new GDGTag() { TagString = t.TagString };
                    mt = new MeetupTag()
                    {
                        GDGMeetup = meetup,
                        GDGTag = tag
                    };
                }
                meetup.MeetupTags.Add(mt);      
            }

            _context.SaveChanges();

            _context.Entry(meetup).State = EntityState.Modified;


            return NoContent(); // 204
        }

        // DELETE: api/Meetups/5
        // Doesn't actually delete the meetup, just sets the additional infos field / Speaker name to an empty string
        // The deletion of an event from the database is done when checking if the event is still on the meetup website.
        // TODO
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<ActionResult<GDGMeetup>> DeleteMeetup(long id)
        {
            var meetup = _context.Meetups.Find(id);
            
            if (meetup == null)
            {
                return NotFound(); // 404
            }            

            meetup.Content = "";
            meetup.SpeakerName = "";
            meetup.MeetupTags = null;

            var MeetupTagsToRemove = _context.MeetupTag.ToList().FindAll(mt => mt.GDGMeetupId == meetup.Id);

            _context.MeetupTag.RemoveRange(MeetupTagsToRemove);
            

            _context.Entry(meetup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetupExists(id))
                {
                    return NotFound(); // 404
                }
                else
                {
                    throw;
                }
            }

            return meetup;
        }

        private bool MeetupExists(long id)
        {
            return _context.Meetups.Any(e => e.Id == id);
        }

        // Checks whether all events from the Events object fetched from the meetup API are stored in the database
        // Adds them if they aren't
        // Then checks to see if an event has been removed from the meetup API to remove it from the database
        private async Task CheckDbAPIConsistency(List<Event> events, List<GDGMeetup> meetups)
        {
            foreach (Event e in events)
            {
                if (!meetups.Exists(m => m.MeetupId == e.Id))
                {
                    _context.Meetups.Add(new GDGMeetup { Content = "", 
                                                         SpeakerName = "", 
                                                         MeetupId = e.Id, 
                                                         Upcoming = !e.Status.Equals("past") ,
                                                         MeetupTags = new List<MeetupTag>()
                    });
                    await _context.SaveChangesAsync();
                }
            }

            foreach (GDGMeetup m in meetups)
            {
                if (!events.Exists(e => e.Id == m.MeetupId))
                {
                    _context.Meetups.Remove(m);
                    await _context.SaveChangesAsync();
                }
            }
        }

       
    }
}
