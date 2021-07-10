using Microsoft.EntityFrameworkCore;
using Phaeton.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phaeton.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserContragent> UserContragents { get; set; }
        public DbSet<OrderHistory> OrderHistories { get; set; }
        public DbSet<SearchHistory> SearchHistories { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserContragent>().HasOne<User>();
            builder.Entity<UserContragent>().HasMany<OrderHistory>();
            builder.Entity<UserContragent>().HasMany<SearchHistory>();

            base.OnModelCreating(builder);
        }
    }
}
