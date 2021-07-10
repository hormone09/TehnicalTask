using System;
using System.Collections.Generic;
using System.Text;

namespace Phaeton_Db_Fill
{
    public static class ContragentRandomizer
    {
        public static List<int> CurrentUsersId = new List<int>();

        private static int number = 0;
        private static Random rand = new Random();

        private static string[] cities = { "Almaty", "Karaganda", "Taraz", "Kyzylorda", "Shimkent", "Aktau", "Aktobe" };

        public static string[] companyNames =
        {
            "Кристал", "Щит и Меч", "Bavaria Centr", "Казактелеком", "Ростелеком", "Acer", "Bloody", "Sony",
            "Xiomi", "Apple", "Samsung", "Intel", "VAG Company", "Nvidia", "Radeon", "Gygabyte", "Palit", "Asus"
        };

        public static string RandomCity { get { return cities[rand.Next(0, (cities.Length - 1))]; } }
        public static string RandomAccountNumber 
        {
            get
            {
                int part1 = rand.Next(10000, 99999);
                int part2 = rand.Next(10000, 99999);
                int part3 = rand.Next(10000, 99999);
                int part4 = rand.Next(10000, 99999);
                string result = Convert.ToString(part1) + Convert.ToString(part2)
                    + Convert.ToString(part3) + Convert.ToString(part4);

                return result;
            }
        }
        public static int RandomUserId
        {
            get
            {
                if (number == (CurrentUsersId.Count - 1))
                    number = 0;
                int result = CurrentUsersId[number];
                number++;
                return result;
            }
        }
        public static string RandomName(int number)
        {
            string result;
            if (number < 25000)
                result = "ИП  " + UserRandomizer.RandomSurname;
            else
                result = "ТОО  " + companyNames[rand.Next(0, (companyNames.Length - 1))];

            return result;
        }
    }
}
