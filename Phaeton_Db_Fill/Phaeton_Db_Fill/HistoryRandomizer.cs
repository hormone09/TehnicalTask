using System;
using System.Collections.Generic;
using System.Text;

namespace Phaeton_Db_Fill
{
    static class HistoryRandomizer
    {
        public static List<int> ContragentsId = new List<int>();
        public static List<string> VendorCodes = new List<string>();
        private static Random rand = new Random();
        private static int number = 0;

        static HistoryRandomizer() { SetVendors(); }

        public static int RandomContragentId
        {
            get
            {
                if (number == (ContragentsId.Count - 1))
                    number = 0;
                int result = ContragentsId[number];
                number++;
                return result;
            }
        }

        public static string RandomVendorCode { get { return VendorCodes[rand.Next(0, (VendorCodes.Count - 1))]; } }
        public static string RandomIpAdress
        {
            get
            {
                string part1 = "192.";
                string part2 = Convert.ToString(rand.Next(162, 199)) + ".";
                string part3 = Convert.ToString(rand.Next(0, 99)) + ".0";

                return (part1 + part2 + part3);
            }
        }

        private static void SetVendors()
        {
            string vendorBase = "";

            for(int number=0; number < 90000; number++)
            {
                if (number < 10)
                    vendorBase = "000000000";
                else if (number > 10 && number < 100)
                    vendorBase = "00000000";
                else if (number >= 100 && number < 1000)
                    vendorBase = "0000000";
                else if (number >= 1000 && number < 10000)
                    vendorBase = "000000";
                else if (number >= 10000 && number < 100000)
                    vendorBase = "00000";

                VendorCodes.Add(vendorBase + Convert.ToString(number));
            }

        }
    }
}
