var host = "https://localhost:44325/";
var content = document.getElementById('content');
console.log("JS connected!");
function GetAllInfo()

{
    $.ajax({
        type: "GET",
        url: host + "Data/All",
        success: function (result) {
            if (result != "Failed") {
                var data = JSON.parse(result);
                content.innerHTML = "<h1 style='text-align:center;'>" + 
                "Вся информация" + "</h1>";

                //Пользователи
                content.innerHTML += "<h3>" + "Пользователи:" + "<h3>";
                let flexBox = document.createElement('div');
                flexBox.style.display = "flex";
                flexBox.style.flexWrap = "wrap";
                data.Users.forEach(element => {
                    let div = document.createElement('div');
                    let label1 = document.createElement('h4');
                    let label2 = document.createElement('h4');
                    let label3 = document.createElement('h4');
                    label1.innerText = "Имя: " + element.Name;
                    label2.innerText = "Лицо: " + element.UserType;
                    label3.innerText = "Логин:" + element.Login;
                    div.style.margin = "5px 50px";
                    div.appendChild(label1);
                    div.appendChild(label2);
                    div.appendChild(label3);
                    flexBox.appendChild(div);
                });
                content.appendChild(flexBox);

                //Контрагенты
                content.innerHTML += "<h3>" + "Контрагенты:" + "<h3>";
                flexBox.innerHTML = "";
                div.innerHTML = "";
                data.Contragents.forEach(element => {
                    let div = document.createElement('div');
                    let label1 = document.createElement('h4');
                    let label2 = document.createElement('h4');
                    let label3 = document.createElement('h4');
                    label1.innerText = "Название компании: " + element.OrganizationName;
                    label2.innerText = "Номер счета: " + element.AccountNumber;
                    label3.innerText = "Город: " + element.City;div.appendChild(label1);
                    div.appendChild(label2);
                    div.appendChild(label3);
                    flexBox.appendChild(div);
                });
                content.appendChild(flexBox);

                //Покупки
                content.innerHTML += "<h3>" + "История покупок:" + "<h3>";
                flexBox.innerHTML = "";
                div.innerHTML = "";
                data.Orders.forEach(element => {
                    let div = document.createElement('div');
                    let label1 = document.createElement('h4');
                    let label2 = document.createElement('h4');
                    let label3 = document.createElement('h4');
                    label1.innerText = "Артикул: " + element.VendorCode;
                    label2.innerText = "Название компании: " + element.OrganizationName;
                    label3.innerText = "Количество: " + element.Amount;
                    div.appendChild(label1);
                    div.appendChild(label2);
                    div.appendChild(label3);
                    flexBox.appendChild(div);
                });
                content.appendChild(flexBox);

                //Поиск
                content.innerHTML += "<h3>" + "История поиска:" + "<h3>";
                flexBox.innerHTML = "";
                div.innerHTML = "";
                data.Searching.forEach(element => {
                    let div = document.createElement('div');
                    let label1 = document.createElement('h4');
                    let label2 = document.createElement('h4');
                    let label3 = document.createElement('h4');
                    label1.innerText = "Артикул: " + element.VendorCode;
                    label2.innerText = "Название компании: " + element.OrganizationName;
                    label3.innerText = "IP-адресс: " + element.IpAdress;
                    div.appendChild(label1);
                    div.appendChild(label2);
                    div.appendChild(label3);
                    flexBox.appendChild(div);
                });
                content.appendChild(flexBox);
            }
        }
    })
}
function GetFavorite()
{
    $.ajax({
        type: "GET",
        url: host + "Data/Favorite",
        success: function (result) {
            if (result != "Failed") {
                var data = JSON.parse(result);
                content.innerHTML = "<h1 style='text-align:center; margin: 40px 0px;'>" + 
                "Топовые артиклы" + "</h1>";
                let main_div = document.createElement('div');
                main_div.style.display = "flex";
                data.forEach(element => {
                    let child_div = document.createElement('div');
                    child_div.style.margin = "20px 40px";
                    let label1 = document.createElement('h4');
                    let label2 = document.createElement('h4');
                    label1.innerText = "Артикл: " + element.Code;
                    label2.innerText = "Куплено: " + element.Amount + " шт.";
                    child_div.appendChild(label1);
                    child_div.appendChild(label2);
                    main_div.appendChild(child_div);
                });
                content.appendChild(main_div);
            }
        }
    });
}
function GetChecked()
{
    
    $.ajax({
        type: "GET",
        url: host + "Data/Conversion",
        success: function (result) {
            if (result != "Failed") {
                var data = JSON.parse(result);
                content.innerHTML = "<h1 style='text-align:center; margin: 40px 0px;'>" + 
                "Просмотрены, не приобретены " + data.Amount + " артиклов" + 
                "</h1>";
                let main_div = document.createElement('div');
                main_div.style.display = "flex";
                main_div.style.flexWrap = "wrap";
                data.Vendors.forEach(element => {
                    let label = document.createElement('h4');
                    label.innerHTML = "<i>" + element + ", </i>";
                    main_div.appendChild(label);
                });
                content.appendChild(main_div);
            }
        }
    });
}
function ChooseCity()
{
    var cities = ["Almaty", "Karaganda", "Shimkent", "Aktau", "NurSultan", "Aktobe"];
    content.innerHTML = "<h1>" + "Выберите город:" + "</h1>";
    
    cities.forEach(element => {
        let input = document.createElement('input');
        input.type = "button";
        input.value = element;
        input.onclick = function(){ GetContragents(element); }
        content.appendChild(input);
    });

}
function GetContragents(city)
{
    $.ajax({
        type: "GET",
        url: host + "Data/Contragents/?city=" + city,
        success: function (result) {
            if (result != "Failed") {
                var data = JSON.parse(result);
                content.innerHTML = "<h1 style='text-align:center; margin: 40px 0px;'>" + 
                "Контрагенты в выбранном городе:  " + city + "</h1>";
                let main_div = document.createElement('div');
                let amount_block = document.createElement('h2');
                amount_block.innerText = "Количество контрагентов: " + data.ContragentsAmount;
                main_div.appendChild(amount_block);
                data.Contragents.forEach(element => {
                    let label1 = document.createElement('h4');
                    let label2 = document.createElement('h4');
                    label1.innerHTML = "Название: " + element.OrganizationName;
                    label2.innerHTML = "Номер счета: " + element.AccountNumber;
                    main_div.appendChild(label1);
                    main_div.appendChild(label2);
                });
                content.appendChild(main_div);
            }
            else
                alert("Error!");
        }
    });
}