using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phaeton.Interfaces
{
    public interface IData
    {
        public string GetAllInformationInJson();
        public string GetFavoriteVendorCodes();
        public string GetConversion();
        public string GetContragentsByCity(string city);
    }
}
