console.log('Connected!');
GetContent();

var host = "http://hormone09-001-site1.itempurl.com/";
//var host = "https://localhost:44325/";

function DeleteRate(id) {
    $.ajax({
        type: "GET",
        url: host + "Content/Delete/?objectId=" + id + "&objectType=Rate",
        success: function (result) {
            if (result != "Error!") {
                alert(result);
                location.reload();
            }
        }
    })
}
function DeleteService(id) {
    $.ajax({
        type: "GET",
        url: host + "Content/Delete/?objectId=" + id + "&objectType=Service",
        success: function (result) {
            if (result != "Error!") {
                alert(result);
                location.reload();
            }
        }
    })
}
function EditSendForm(address, formId) {
    $.ajax({
        type: "POST",
        url: host + address,
        dataType: "html",
        data: $("#" + formId).serialize(),
        success: function (result) {
            var validate = document.getElementById('_validate');
            if (result == "Succes") {
                validate.style.color = "green";
                validate.innerText = "Добавленно!";
            }
            else {
                validate.style.color = "red";
                validate.innerText = result;
            }
        }
    })
}
function SendForm(address, formId)
{
    $.ajax({
        type: "POST",
        url: host + address,
        dataType: "html",
        data: $("#" + formId).serialize(),
        success: function (result) {
            var data = JSON.parse(result);
            if(data.IsAuthorize)
                window.location.href = host + "Home/Index";
            else
            {
                if (formId == "signIn_form") {
                    var validator = document.getElementById('signOn-validate');
                    validator.innerText = data.InfoMessage;
                    validator.style.color = "red";
                }
                else {
                    var validator = document.getElementById('signUp-validate'); 
                    validator.innerText = data.InfoMessage;
                    validator.style.color = "red";
                }

            }
        }
    })
}

function LogOff() {
    $.ajax({
        type: "POST",
        url: host + "Account/LogOff",
        success: function (result) {
            window.location.href = host + "Home/Sign";
        }
    })
}

function GetContent()
{
    console.log('Получение контента....');
    var admin_link1 = document.getElementById('admin_link1');
    var admin_link2 = document.getElementById('admin_link2');


    $.ajax({
        type: "GET",
        url: host + "Account/IsAdmin",
        success: function (result) {
            if (result) {
                admin_link1.style.display = "block";
                admin_link2.style.display = "block";
            }
            else {
                admin_link1.style.display = "none";
                admin_link2.style.display = "none";
            }
        }
    });

    $.ajax({
        type: "GET",
        url: host + "Account/AuthorizeResult",
        success: function (result) {
            WriteStatus(JSON.parse(result));
        }
    });

    if (window.location.href == (host + "Home/PersonalArea"))
    {
        $.ajax({
            type: "GET",
            url: host + "Content/GetUserData",
            success: function (result) {
                WriteUserData(JSON.parse(result));
            }
        });
    }

    if (window.location.href == (host + "Home/Applications")) {
        $.ajax({
            type: "GET",
            url: host + "Content/GetApplications",
            success: function (result) {
                applications = JSON.parse(result);
                if (applications.IsHasApplications) {
                    appConnection = applications.Connections;
                    appNewUsers = applications.NewUsers;
                    WriteApplications(appConnection, appNewUsers);
                }

                
            }
        });
    }

    if (window.location.href == (host + "Home/Services")) {
        $.ajax({
            type: "GET",
            url: host + "Content/GetServices/?serviceType=All",
            success: function (result) {
                WriteServicesByType(JSON.parse(result));
            }
        });
    }

    if (window.location.href == (host + "Home/Index")) {
        $.ajax({
            type: "GET",
            url: host + "Content/GetRates/?IsForInternet=true",
            success: function (result) {
                internetRates = JSON.parse(result);
                WriteMainRates(internetRates);
            }
        });
    }

    if (window.location.href == (host + "Home/Rates")) {

        var internetRates, mobileRates;

        $.ajax({
            type: "GET",
            url: host + "Content/GetRates/?IsForInternet=true",
            success: function (result) {
                internetRates = JSON.parse(result);
            }
        });

        $.ajax({
            type: "GET",
            url: host + "Content/GetRates/?IsForInternet=false",
            success: function (result) {
                if (result == "Error!") {
                    let internet_block = document.getElementById('internet-rates');
                    let mobile_block = document.getElementById('mobile-rates');
                    internet_block.innerHTML = "<h3>В данный момент нет доступных тарифов!</h3>";
                    mobile_block.innerHTML = "<h3>В данный момент нет доступных тарифов!</h3>";
                }
                else {
                    mobileRates = JSON.parse(result);
                    WriteAllRates(internetRates, mobileRates);
                }
            }
        });

    }

    if (window.location.href == (host + "Home/ManagerMenu")) {

        $.ajax({
            type: "GET",
            url: host + "Content/GetServices/?serviceType=All",
            success: function (result) {
                if (result != "Error!")
                    WriteServicesForAdmin(JSON.parse(result));
                else {
                    var services_block = document.getElementById('services_for_delete');
                    services_block.style.innerHTML = "<h3>На данный момент добавленных услуг!</h3>"
                }
            }
        });

        var internetRates, mobileRates;

        $.ajax({
            type: "GET",
            url: host + "Content/GetRates/?IsForInternet=true",
            success: function (result) {
                internetRates = JSON.parse(result);
            }
        });

        $.ajax({
            type: "GET",
            url: host + "Content/GetRates/?IsForInternet=false",
            success: function (result) {
                WriteRatesForAdmin(internetRates, JSON.parse(result));
            }
        });
    }

    
       

        
}

function DeleteConnectApplicate(id) {
    $.ajax({
        type: "GET",
        url: host + "Content/DeleteApplicate/?applicateId=" + id + "&IsConnectApp=true",
        success: function (result) {
            if (result)
                location.reload();
            else
                alert('false');
        }
    });
}

function DeleteNewUserApplicate(id) {
    $.ajax({
        type: "GET",
        url: host + "Content/DeleteApplicate/?applicateId=" + id + "&IsConnectApp=false",
        success: function (result) {
            if (result)
                location.reload();
            else
                alert('false');
        }
    });
}

function WriteUserData(data) {
    var services_block = document.getElementById('personal-services'); 
    var name = document.getElementById('data-name');
    var phone = document.getElementById('data-phone');
    var rate = document.getElementById('data-rate');
    var payment = document.getElementById('data-payment');
    name.innerText = data.Name;
    phone.innerText = data.Phone;
    rate.innerText = data.Rate;
    payment.innerText = data.Payment;
    var count = 0;
    if (data.Services != null) {
        data.Services.forEach((service) => {
            //services_block.innerHTML = "<h1>asdasd</h1>";
            services_block.innerHTML += "<div>" +
                "<h4> Название услуги:</h4> </br><p style='margin: -5px 0px; font-style: italic; font-weight: bold;'>" + service.Name + "</p>" +
                "<p>Описание:  " + service.Desk + "</p>" +
                "<p>Подключение:  " + service.Command + "</p>" +
                '<input type="button" value="Отключить" onclick="onModal(\'' + service.Command + '\')"></div>' + 
                "</div>";
            count++;
        });
    }
    if(count == 0) {
        services_block.innerHTML = "<h3>У вас нет подключенных услуг</h3>";
    }
}

function ConfirmApplicate(id) {
    $.ajax({
        type: "GET",
        url: host + "Content/ConfirmConnectApplicate/?applicateId=" + id,
        success: function (result) {
            if (result)
                location.reload();
        }
    });
}

function WriteApplications(appConnection, appNewUsers) {
    var connect_block = document.getElementById('applicate_Connection');
    var new_block = document.getElementById('applicate_NewUser');
    if (appConnection != null) {
        appConnection.forEach((app) => {
            connect_block.innerHTML += "<div class='applicate'>" +
                "<div><h4>Имя пользователя: </h4>" + app.UserName + "</div>" +
                "<div><h4>Тип подключения: </h4>" + app.Type + "</div>" +
                "<div><h4>Название услуги: </h4>" + app.ServiceName + "</div>" +
                    "<div style='display: flex; justify-content: space-between;'>" +
                    '<input type="button" value="Выполнить" onclick="ConfirmApplicate(\'' + app.Id + '\')">' +
                    '<input type="button" value="Отказать" onclick="DeleteConnectApplicate(\'' + app.Id + '\')">' +
                    "</div>" +
                "</div>"
        });
    }

    if (appNewUsers != null) {
        appNewUsers.forEach((app) => {
        new_block.innerHTML += "<div class='applicate'>" +
            "<div><h4>Имя пользователя: </h4>" + app.UserName + "</div>" +
            "<div><h4>Контактный номер: </h4>" + app.Phone + "</div>" +
            "<div><h4>ИИН: </h4>" + app.PersonalNumber + "</div>" +
            '<input style="margin: 20px 25px;" type="button" value="Удалить" onclick="DeleteNewUserApplicate(\'' + app.Id + '\')">' +
            "</div>"
        });
    }
    
}

function WriteStatus(result) {
    let panel = document.getElementById('login-status');
    if (result)
        panel.innerHTML = "<a href='/Home/PersonalArea'>Личный кабинет</a>" +
            "<input type='button' value='Выйти' onclick='LogOff()'>";
    else
        panel.innerHTML = 
            "<a href='/Home/Sign'><input type='button' value='Войти'></a>";
}

function WriteMainRates(rates)
{
    var index_rates_block = document.getElementById('main-rates');
    var block_count = 0;
    rates.forEach((rate) =>
    {
        if(block_count++ != 4)
        {
            let info_block = "<div><h4>" + rate.Name + "</h4>" + 
                "<span>" + rate.Payment + "</span></div>";
            let properties_block = "<div class='rate-desk'><p>" + rate.Desk +
                "</p><p>Безлимит внутри сети<p></p><p>Безлимит на соц сети и мессенджеры</p><p>Возможность передавать трафик</p></div>";
            let button_block = "<div style='border-bottom: none;'>" +
                '<input type="button" value="Подключить" onclick="onModal(\'' + rate.MobileCode + '\')"></div>';
                
            index_rates_block.innerHTML += "<div class='rate'>" +
            info_block + properties_block + button_block + "</div>";
        }
    });
}

function WriteAllRates(internetRates, mobileRates)
{
    var internet_block = document.getElementById('internet-rates');
    var mobile_block = document.getElementById('mobile-rates');
    var internet_count = 0, mobile_count = 0;

    internetRates.forEach((rate) => 
    {
        internet_count++;
        internet_block.innerHTML += "<div class='rate'> <div style='height: 80px; border-bottom: 2px solid darkslategrey;'>" +
            "<h4>" + rate.Name + "</h4>" + "<span>" + rate.Payment + "</span>" + "</div>" +
            "<div class='main-info'><p>" + rate.Gigabyte + " ГБ /</p><p>" + rate.Minute + " МИН /</p><p>" + rate.Sms + " СМС</p>" +
            "</div><div class='rate-info'><p>" + 
            "<ul><li>Безлимит внутри сети</li><li>Безлимит на соц сети и мессенджеры</li><li>Возможность передавать трафик</li></ul>" + 
            "</div>" + "<div>" + '<input type="button" value="Подключить" onclick="onModal(\'' + rate.MobileCode + '\')"></div>' +
            "</input></div>" + "</div>";
    });

    mobileRates.forEach((rate) => 
    {
        mobile_count++;
        mobile_block.innerHTML += "<div class='rate'> <div style='height: 80px; border-bottom: 2px solid darkslategrey;'>" +
            "<h4>" + rate.Name + "</h4>" + "<span>" + rate.Payment + "</span>" + "</div>" +
            "<div class='main-info'><p>" + rate.Gigabyte + " ГБ /</p><p>" + rate.Minute + " МИН /</p><p>" + rate.Sms + " СМС</p>" +
            "</div><div class='rate-info'>" +
            "<ul><li>Безлимит внутри сети</li><li>Безлимит на соц сети и мессенджеры</li><li>Возможность передавать трафик</li></ul>" +
            "</div>" + "<div>" + '<input type="button" value="Подключить" onclick="onModal(\'' + rate.MobileCode + '\')"></div>' +
            "</input></div>" + "</div>";
    });

    if (internet_count == 0)
        internet_block.innerHTML = "<h3>В данный момент нет доступных тарифов!</h3>";
    if (mobile_count == 0)
        mobile_block.innerHTML = "<h3>В данный момент нет доступных тарифов!</h3>"
}

function WriteServicesByType(allServices)
{
    let internet_block = document.getElementById('internet-services');
    let phone_block = document.getElementById('phone-services');
    let zero_block = document.getElementById('zero-services');
    let new_block = document.getElementById('new-services');
    let intenet_count = 0, phone_count = 0, zer_count = 0, new_count = 0;

    allServices.forEach((service) =>
    {
        let service_block = "<div class='service'><div class='service-info'>" +
            "<h3>" + service.Name + "</h3>" + "<p>" + service.Desk + "</p></div>" +
            "<div style='display: flex;'><div style='width: 65%;'>" +
            "<p><span>Абонентская плата:  </span>" + service.Payment + "</p>" +
            "<p><span>Стоимость подключения:  </span>" + service.Payment + "</p></div>" +
            "<div style='width: 20%;'>" + '<input type="button" value="Подключить" onclick="onModal(\'' + service.MobileCode + '\')"></div>' +
            "</div></div>";
        switch(service.Type)
        {
            case "Internet":
                intenet_count++;
                internet_block.innerHTML += service_block;
                break;
            case "Phone":
                phone_count++;
                phone_block.innerHTML += service_block;
                break;
            case "Balance":
                zer_count++;
                zero_block.innerHTML += service_block;
                break;
            case "NewUsers":
                new_count++;
                new_block.innerHTML += service_block;
                break;
        }
    });

    let lenght_message = "<h3>В данный момент нет доступных услуг</h3>";
    if(intenet_count == 0)
        internet_block.innerHTML = lenght_message;
    if(phone_count == 0)
        phone_block.innerHTML = lenght_message;
    if(zer_count == 0)
        zero_block.innerHTML = lenght_message;
    if(new_count == 0)
        new_block.innerHTML = lenght_message;
}

function WriteRatesForAdmin(internetRates, mobileRates) {
    var rates_block = document.getElementById('rates_for_admin');
    var rates_count = 0;

    if (internetRates != null) {
        internetRates.forEach((rate) => {
            rates_count++;
            rates_block.innerHTML += "<div class='rate'> <div style='height: 80px; border-bottom: 2px solid darkslategrey;'>" +
                "<h4>" + rate.Name + "</h4>" + "<span>" + rate.Payment + "</span>" + "</div>" +
                "<div class='main-info'><p>" + rate.Gigabyte + " ГБ /</p><p>" + rate.Minute + " МИН /</p><p>" + rate.Sms + " СМС</p>" +
                "</div><div class='rate-info'><p>" +
                "<h4>Описание:  " + rate.Desk + "<h4>" +
                "</div>" + "<div style='display: flex;'>" +
                '<input style="min-width: 120px; margin: 5px 75px;" type="button" value="Удалить" onclick="DeleteRate(\'' + rate.Id + '\')" >' +
                "</div>" + "</div>" + "</div>";

        });

    }

    if (mobileRates != null) {
        mobileRates.forEach((rate) => {
            rates_count++;
            rates_block.innerHTML += "<div class='rate'> <div style='height: 80px; border-bottom: 2px solid darkslategrey;'>" +
                "<h4>" + rate.Name + "</h4>" + "<span>" + rate.Payment + "</span>" + "</div>" +
                "<div class='main-info'><p>" + rate.Gigabyte + " ГБ /</p><p>" + rate.Minute + " МИН /</p><p>" + rate.Sms + " СМС</p>" +
                "</div><div class='rate-info'><p>" +
                "<h4>Описание:  " + rate.Desk + "<h4>" +
                "</div>" + "<div style='text-align: center;'>" +
                '<input style="min-width: 120px; margin: 5px 75px;" type="button" value="Удалить" onclick="DeleteRate(\'' + rate.Id + '\')" >' +
                "</div>" + "</div>" + "</div>";
        });
    }

    if (rates_count == 0)
        rates_block.innerHTML = "<h3>На данный момент тарифы не добавлены!</h3>";
}

function WriteServicesForAdmin(allServices) {
    var services_block = document.getElementById('services_for_delete');
    if (allServices != null) {
        allServices.forEach((service) => {
            let service_block = "<div class='service'><div class='service-info'>" +
                "<h3>" + service.Name + "</h3>" + "<p>" + service.Desk + "</p></div>" +
                "<div style='display: flex;'><div style='width: 65%;'>" +
                "<p><span>Абонентская плата:  </span>" + service.Payment + "</p>" +
                "<p><span>Стоимость подключения:  </span>" + service.Payment + "</p></div>" +
                "<div style='width: 20%;'>" +
                '<input style="min-width: 120px; margin: 5px 75px;" type="button" value="Удалить" onclick="DeleteService(\'' + service.Id + '\')" >' +
                "</div></div>";
            services_block.innerHTML += service_block;
        });
    }
}


