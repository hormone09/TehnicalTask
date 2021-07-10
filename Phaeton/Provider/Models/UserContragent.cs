using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phaeton.Models
{
    public enum Cities { Almaty, Karaganda, Taraz, Kyzylorda, Shimkent, Aktau, Aktobe, NurSultan }
    public class UserContragent
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string AccountNumber { get; set; }
        public string OrganizationName { get; set; }
        public int UserId { get; set; }
    }
}
