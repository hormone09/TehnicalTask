using System;

namespace Phaeton.Models
{
    public enum UserTypes { Entity, Individual };
    public class User
    {
        public int Id { get; set; }
        public string UserType { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }

        public string ShortName
        {
            get
            {
                char[] name = Name.ToCharArray();
                char[] patronymic = Patronymic.ToCharArray();
                string result = Surname + " " + name[0] + "." + patronymic[0];

                return result;
            }
        }
        public string FullName { get { return $"{Surname} {Name} {Patronymic}"; } }
            
    }
}
