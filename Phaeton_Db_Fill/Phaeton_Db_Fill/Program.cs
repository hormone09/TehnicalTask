using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading;

namespace Phaeton_Db_Fill
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = 
                "Server=DESKTOP-7FUSBPQ;Database=Phaeton;Trusted_Connection=True;MultipleActiveResultSets=true;";


            using (var sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();

                FillUsers(sqlConnection);
                FindUsersForContragents(sqlConnection);
                FillContragents(sqlConnection);
                FindContragents(sqlConnection);

                ParameterizedThreadStart thread1 = new ParameterizedThreadStart(FillSearch);
                thread1.Invoke(sqlConnection);
                ParameterizedThreadStart thread2 = new ParameterizedThreadStart(FillOrders);
                thread2.Invoke(sqlConnection);

                sqlConnection.Close();
            }
        }

        public static void FindUsersForContragents(SqlConnection connection) //Заполняем коллекцию id юридических лиц
        {
            string commandText = "SELECT Id FROM [Users] WHERE UserType='Entity'";
            SqlCommand command = new SqlCommand(commandText, connection);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                for (int i = 0; i < reader.FieldCount; i++)
                    ContragentRandomizer.CurrentUsersId.Add(Convert.ToInt32(reader[i]));
            }
        }
        public static void FindContragents(SqlConnection connection) //Заполняем коллекцию id контрагентов
        {
            string commandText = "SELECT Id FROM [UserContragents]";
            SqlCommand command = new SqlCommand(commandText, connection);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                for (int i = 0; i < reader.FieldCount; i++)
                    HistoryRandomizer.ContragentsId.Add(Convert.ToInt32(reader[i]));
            }
        }
        public static void FillUsers(SqlConnection connection)
        {
            Console.WriteLine("Загрузка таблицы 'Пользователи'....");
            string sqlExpression = "INSERT INTO Users (UserType, Login, Password, Name, Surname, Patronymic) " +
                "VALUES (@userType, @login, @password, @name, @surname, @patronymic)";
            for (int i=0; i < 10000; i++)
            {
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlParameter typeParametr = new SqlParameter("@userType", UserRandomizer.RandomStatus(i));
                SqlParameter loginParametr = new SqlParameter("@login", UserRandomizer.RandomLogin(i));
                SqlParameter passwordParametr = new SqlParameter("@password", UserRandomizer.RandomPassword(i));
                SqlParameter nameParametr = new SqlParameter("@name", UserRandomizer.RandomName);
                SqlParameter surnameParametr = new SqlParameter("@surname", UserRandomizer.RandomSurname);
                SqlParameter patronymicParametr = new SqlParameter("@patronymic", UserRandomizer.RandomPatronymic);
                command.Parameters.Add(typeParametr);
                command.Parameters.Add(loginParametr);
                command.Parameters.Add(passwordParametr);
                command.Parameters.Add(nameParametr);
                command.Parameters.Add(surnameParametr);
                command.Parameters.Add(patronymicParametr);
                command.ExecuteNonQuery();
            }
        } //Заполняем таблицу пользователей
        public static void FillContragents(SqlConnection connection)
        {
            Console.WriteLine("Загрузка таблицы 'Контрагенты'....");
            string sqlExpression = "INSERT INTO UserContragents (City, AccountNumber, OrganizationName, UserId) " +
                "VALUES (@city, @accountNumber, @organizationName, @userId)";
            for (int i = 0; i < 50000; i++)
            {
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlParameter cityParametr = new SqlParameter("@city", ContragentRandomizer.RandomCity);
                SqlParameter accountParametr = new SqlParameter("@accountNumber", ContragentRandomizer.RandomAccountNumber);
                SqlParameter nameParametr = new SqlParameter("@organizationName", ContragentRandomizer.RandomName(i));
                SqlParameter idParametr = new SqlParameter("@userId", ContragentRandomizer.RandomUserId);
                command.Parameters.Add(cityParametr);
                command.Parameters.Add(accountParametr);
                command.Parameters.Add(nameParametr);
                command.Parameters.Add(idParametr);
                command.ExecuteNonQuery();
            }
        } //Заполняем таблицу контрагентов
        public static void FillOrders(object connectionBox) //Заполняем таблицу покупок
        {
            var connection = (SqlConnection)connectionBox;
            Console.WriteLine("Загрузка таблицы 'История покупок'....");
            Random rnd = new Random();
            string sqlExpression = "INSERT INTO OrderHistories (UserContragentId, VendorCode, Brand, Amount) " +
                "VALUES (@contragent, @vendor, @brand, @amount)";
            for (int i = 0; i < 10000; i++)
            {
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlParameter contragentParametr = new SqlParameter("@contragent", HistoryRandomizer.RandomContragentId);
                SqlParameter vendorParametr = new SqlParameter("@vendor", HistoryRandomizer.RandomVendorCode);
                SqlParameter brandParametr = new SqlParameter("@brand", 
                    ContragentRandomizer.companyNames[rnd.Next(0, ContragentRandomizer.companyNames.Length-1)]);
                SqlParameter amountParametr = new SqlParameter("@amount", rnd.Next(0, 15));
                command.Parameters.Add(contragentParametr);
                command.Parameters.Add(vendorParametr);
                command.Parameters.Add(brandParametr);
                command.Parameters.Add(amountParametr);
                command.ExecuteNonQuery();
            }
        }
        public static void FillSearch(object connectionBox) //Заполняем таблицу поиска
        {
            Console.WriteLine("Загрузка таблицы 'История поиска'....");
            var connection = (SqlConnection)connectionBox;
            Random rnd = new Random();
            string sqlExpression = "INSERT INTO SearchHistories (UserContragentId, VendorCode, Brand, UserIpAdress) " +
                "VALUES (@contragent, @vendor, @brand, @ipAdress)";
            for (int i = 0; i < 20000; i++)
            {
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlParameter contragentParametr = new SqlParameter("@contragent", HistoryRandomizer.RandomContragentId);
                SqlParameter vendorParametr = new SqlParameter("@vendor", HistoryRandomizer.RandomVendorCode);
                SqlParameter brandParametr = new SqlParameter("@brand",
                    ContragentRandomizer.companyNames[rnd.Next(0, ContragentRandomizer.companyNames.Length - 1)]);
                SqlParameter ipAdressParametr = new SqlParameter("@ipAdress", HistoryRandomizer.RandomIpAdress);
                command.Parameters.Add(contragentParametr);
                command.Parameters.Add(vendorParametr);
                command.Parameters.Add(brandParametr);
                command.Parameters.Add(ipAdressParametr);
                command.ExecuteNonQuery();
            }
        }
    }
}
