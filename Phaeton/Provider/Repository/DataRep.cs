using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Phaeton.Data;
using Phaeton.Interfaces;
using Phaeton.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Phaeton.Repository
{
    public class DataRep : IData
    {
        private readonly ApplicationDbContext db;

        public DataRep(ApplicationDbContext db)
        {
            this.db = db;
        }

        public string GetAllInformationInJson() //Возвращает 4 таблицы в формате Json
        {
            dynamic json = new JObject();
            json.Users = new JArray();
            json.Contragents = new JArray();
            json.Orders = new JArray();
            json.Searching = new JArray();

            using (db)
            {
                foreach(User user in db.Users)
                {
                    dynamic obj = new JObject();
                    obj.UserType = user.UserType;
                    obj.Name = user.ShortName;
                    obj.Login = user.Login;
                    obj.Password = user.Password;

                    json.Users.Add(obj);
                }

                foreach (UserContragent contragent in db.UserContragents)
                {
                    var user = db.Users.FirstOrDefault(x => x.Id == contragent.UserId);

                    dynamic obj = new JObject();
                    obj.AccountNumber = contragent.AccountNumber;
                    obj.City = contragent.City;
                    obj.OrganizationName = contragent.OrganizationName;
                    obj.UserName = user.ShortName;

                    json.Contragents.Add(obj);
                }

                foreach (OrderHistory orderHistory in db.OrderHistories)
                {
                    var contragent = db.UserContragents.FirstOrDefault(x => x.Id == orderHistory.UserContragentId);

                    dynamic obj = new JObject();
                    obj.VendorCode = orderHistory.VendorCode;
                    obj.Brand = orderHistory.Brand;
                    obj.Amount = orderHistory.Amount;
                    obj.OrganizationName = contragent.OrganizationName;

                    json.Orders.Add(obj);
                }

                foreach(SearchHistory search in db.SearchHistories)
                {
                    var contragent = db.UserContragents.FirstOrDefault(x => x.Id == search.UserContragentId);

                    dynamic obj = new JObject();
                    obj.VendorCode = search.VendorCode;
                    obj.Brand = search.Brand;
                    obj.IpAdress = search.UserIpAdress;
                    obj.OrganizationName = contragent.OrganizationName;

                    json.Searching.Add(obj);
                }
            }

            return JsonConvert.SerializeObject(json);
        }

        private List<string> GetVendorCodesPurchased() //Получаем все возможные Артиклы
        {
            List<string> venderCodes = new List<string>();

            foreach (var order in db.OrderHistories)
            {
                bool IsHas = false;
                foreach (var code in venderCodes)
                    if (order.VendorCode.Equals(code))
                        IsHas = true;
                if (!IsHas)
                    venderCodes.Add(order.VendorCode);
            }

            return venderCodes;
        }

        public string GetFavoriteVendorCodes() 
        {
            var codes = GetVendorCodesPurchased();
            int vendorCount = codes.Count;
            string[,] favoriteCodes = new string[vendorCount, 3];

            using (db)
            {
                for (int i = 0; i < vendorCount; i++) //Массив Артиклов с количество совершенных покупок
                {
                    string currentCode = codes[i];
                    favoriteCodes[i, 0] = currentCode;
                    int num = 0;

                    foreach(var order in db.OrderHistories)
                        if (order.VendorCode.Equals(currentCode))
                            num++;
                    favoriteCodes[i, 1] = Convert.ToString(num);
                }
            }

            if (vendorCount >= 3)
            {
                for (int i = 1; i < vendorCount; i++) //Сортируем массив по количеству покупок
                {
                    string keyName = favoriteCodes[i, 0];
                    int keyCount = Convert.ToInt32(favoriteCodes[i, 1]);
                    var j = i;
                    while ((j > 0) && (Convert.ToInt32(favoriteCodes[j - 1, 1]) > keyCount))
                    {
                        favoriteCodes[j, 0] = favoriteCodes[j - 1, 0];
                        favoriteCodes[j, 1] = favoriteCodes[j - 1, 1];

                        j--;
                    }
                    favoriteCodes[j, 0] = keyName;
                    favoriteCodes[j, 1] = Convert.ToString(keyCount);
                }

                dynamic json = new JArray(); // Отдаем 3 верхних элемента
                for (int i = 0; i < 3; i++)
                {
                    dynamic obj = new JObject();
                    obj.Code = favoriteCodes[vendorCount - 1 - i, 0];
                    obj.Amount = favoriteCodes[vendorCount - 1 - i, 1];

                    json.Add(obj);
                }

                return JsonConvert.SerializeObject(json);
            }
            else
                return "Failed";
        }

        public string GetConversion()
        {
            List<string> notPurchased = new List<string>();
            using (db)
            {
                var history = db.SearchHistories.ToList();
                var purchased = GetVendorCodesPurchased();
                foreach(var search in history)
                {
                    bool IsPurhased = false;
                    foreach(var purchasedVendor in purchased)
                        if (search.VendorCode.Equals(purchasedVendor))
                            IsPurhased = true;
                    if (!IsPurhased)
                        notPurchased.Add(search.VendorCode); 
                }
            }

            dynamic json = new JObject();
            json.Amount = notPurchased.Count;
            json.Vendors = new JArray();
            foreach(var el in notPurchased)
                json.Vendors.Add(el);

            return JsonConvert.SerializeObject(json);
        }

        public string GetContragentsByCity(string city)
        {
            bool IsCorrect = CityHandler(ref city);
            if (IsCorrect)
            {
                List<UserContragent> currentContragents = new List<UserContragent>();
                using (db)
                {
                    currentContragents = db.UserContragents.Where(x => x.City.Equals(city)).ToList();
                }
                dynamic json = new JObject();
                json.City = city;
                json.ContragentsAmount = currentContragents.Count;
                json.Contragents = new JArray();
                foreach(var el in currentContragents)
                {
                    dynamic obj = new JObject();
                    obj.OrganizationName = el.OrganizationName;
                    obj.AccountNumber = el.AccountNumber;
                    json.Contragents.Add(obj);
                }

                return JsonConvert.SerializeObject(json);
            }
            else
                return "Failed";
        }

        private bool CityHandler(ref string city)
        {
            bool IsCorrect = false;
            foreach (Cities val in Enum.GetValues(typeof(Cities)))
                if (val.ToString().Equals(city))
                    IsCorrect = true;

            return IsCorrect;
        }
    }
}
