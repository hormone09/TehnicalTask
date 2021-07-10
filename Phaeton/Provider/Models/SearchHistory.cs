using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phaeton.Models
{
    public class SearchHistory
    {
        public int Id { get; set; }
        public int UserContragentId { get; set; }
        public string VendorCode { get; set; }
        public string Brand { get; set; }
        public string UserIpAdress { get; set; }
    }
}
