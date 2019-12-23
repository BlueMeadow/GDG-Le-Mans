using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GDGLeMans.Models;

namespace GDGLeMans.Models
{
    public class GDGContext : DbContext
    {

        public DbSet<GDGMeetup> Meetups { get; set; }
        public DbSet<GDGTag> Tags { get; set; }

        public DbSet<MeetupTag> MeetupTag { get; set; }

        public GDGContext(DbContextOptions<GDGContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite primary key

            modelBuilder.Entity<MeetupTag>()
                .HasKey(t => new { t.GDGMeetupId, t.GDGTagId });

            // GDGMeetup    <----<  MeetupTag

            modelBuilder.Entity<GDGMeetup>()
                .HasMany(gdgMeetup => gdgMeetup.MeetupTags)
                .WithOne(meetupTag => meetupTag.GDGMeetup)
                .HasForeignKey(meetupTag => meetupTag.GDGMeetupId);

            modelBuilder.Entity<MeetupTag>()
                .HasOne(meetupTag => meetupTag.GDGMeetup)
                .WithMany(gdgMeetup => gdgMeetup.MeetupTags)
                .HasForeignKey(meetupTag => meetupTag.GDGMeetupId);

            // GDGTag    <----<  MeetupTag

            modelBuilder.Entity<GDGTag>()
                .HasMany(gdgTag => gdgTag.MeetupTags)
                .WithOne(meetupTag => meetupTag.GDGTag)
                .HasForeignKey(meetupTag => meetupTag.GDGTagId);

            modelBuilder.Entity<MeetupTag>()
                .HasOne(meetupTag => meetupTag.GDGTag)
                .WithMany(gdgTag => gdgTag.MeetupTags)
                .HasForeignKey(meetupTag => meetupTag.GDGTagId);

            
        }

    }
}
