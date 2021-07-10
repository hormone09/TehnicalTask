using System;
using System.Collections.Generic;
using System.Text;

namespace Phaeton_Db_Fill
{
    public static class UserRandomizer
    {
        private static Random rand = new Random();

        private static string[] names =
            {
                "Анатолий", "Владимир", "Надежда", "Василий", "Висарион", "Ганс", "Мария", "Андрей", "Артем", "Эмма",
                "Стелла", "Зулейха", "Наталья", "Олеся", "Антон", "Павел", "Олег", "Оксана", "Альбина", "Даурен",
                "Арыстан", "Едиль", "Серик", "Берик", "Акылбек", "Дильназ", "Мади", "Ксения", "Жандос", "Айдос",
                "Торехан", "Амантай", "Еркебулан", "Марат", "Мырза"
            };

        private static string[] surnames =
        {
            "Коробов", "Степанов", "Долгов", "Лошак", "Асатов", "Жарковский", "Колобанов", "Пашкевич", "Облог",
            "Близорукий", "Дальнозоркий", "Мирза", "Долгоиграющий", "Сеитбеков", "Сеиткали", "Бекмурат", "Карикпай",
        };

        private static string[] patronymices =
        {
            "Андреевич", "Аманжолович", "Бекзатулы", "Олегович", "Болатбаевич", "Серикпаевич", "Александрович",
            "Анатольевич", "Васильевич", "Артемович", "Едильулы", "Арыстанович", "Маратович", "Еркебуланович",
            "Амантаевич", "Акылбекович", "Жандосулы", "Мадиулы", "Айдосулы"
        };

        public static string RandomName { get { return names[rand.Next(0, (names.Length - 1))]; } }
        public static string RandomSurname { get { return surnames[rand.Next(0, (surnames.Length - 1))]; } }
        public static string RandomPatronymic { get { return patronymices[rand.Next(0, (patronymices.Length - 1))]; } }
        public static string RandomStatus(int number)
        {
            if (number < 2000)
                return "Individual";
            else
                return "Entity";
        }
        public static string RandomLogin(int number)
        {
            string loginBase;

            if (number < 3000)
                loginBase = "login_is_";
            else if (number > 3000 && number < 7000)
                loginBase = "login_";
            else
                loginBase = "login";

            string result = loginBase + Convert.ToString(number);

            return result;
        }
        public static string RandomPassword(int number)
        {
            string passwordBase;

            if (number < 3000)
                passwordBase = "password_is_";
            else if (number > 3000 && number < 7000)
                passwordBase = "password_";
            else
                passwordBase = "password";

            string result = passwordBase + Convert.ToString(number);

            return result;
        }

    }
}
