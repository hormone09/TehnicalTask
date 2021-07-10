using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Phaeton.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Phaeton.Contollers
{
    public class MainController : Controller
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IData iData;

        public MainController(IData iData, IWebHostEnvironment webHostEnvironment)
        {
            this.iData = iData;
            this.webHostEnvironment = webHostEnvironment;
        }

        public ActionResult Index()
        {
            var path = webHostEnvironment.WebRootPath + "/Index.html";
            StreamReader reader = new StreamReader(path);
            var fileBytes = System.IO.File.ReadAllBytes(path);
            FileContentResult file = File(fileBytes, "text/html");

            return file;
        }

        [HttpGet]
        [Route("Data/All")]
        public string AllInfo()
        {
            return iData.GetAllInformationInJson();
        }

        [HttpGet]
        [Route("Data/Favorite")]
        public string FavoriteVendors()
        {
            return iData.GetFavoriteVendorCodes();
        }

        [HttpGet]
        [Route("Data/Conversion")]
        public string Conversion()
        {
            return iData.GetConversion();
        }

        [HttpGet]
        [Route("Data/Contragents")]
        public string Conversion(string city)
        {
            return iData.GetContragentsByCity(city);
        }
    }
}
