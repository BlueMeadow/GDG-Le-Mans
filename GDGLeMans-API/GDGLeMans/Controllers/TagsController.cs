using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GDGLeMans.Models;
using Microsoft.AspNetCore.Authorization;

namespace GDGLeMans.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly GDGContext _context;

        public TagsController(GDGContext context)
        {
            _context = context;
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GDGTag>>> GetTags()
        {
            return _context.Tags.OrderBy(t => t.TagString).ToList();
        }

        // GET: api/Tags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GDGTag>> GetGDGTag(long id)
        {
            var tag = await _context.Tags.FindAsync(id);

            if (tag == null)
            {
                return NotFound();
            }

            return tag;
        }

        // POST: api/Tags
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<GDGTag>> PostGDGTag(GDGTag tag)
        {
            _context.Tags.Add(tag);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TagExists(tag.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGDGTag", tag, null);
        }

        // PUT: api/Meetups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutTag(long id, GDGTag _tag)
        {
            var tag = await _context.Tags.FindAsync(id);

            if (tag == null)
            {
                return BadRequest(); // 400
            }


            tag.TagString = _tag.TagString;

            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
                {
                    return NotFound(); // 404
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // 204
        }


        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<GDGTag>> DeleteGDGTag(long id)
        {

            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return tag;
        }

        private bool TagExists(long id)
        {
            return _context.Tags.Any(e => e.Id == id);
        }
    }
}
