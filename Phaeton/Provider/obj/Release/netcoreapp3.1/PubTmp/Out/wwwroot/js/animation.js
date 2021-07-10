var host = "http://hormone09-001-site1.itempurl.com/";
//var host = "https://localhost:44325/";

if (window.location.href == (host + "Home/Index") || window.location.href == host) {
    /* Индекс слайда по умолчанию */
    var slideIndex = 1;
    showSlides(slideIndex);

    /* Функция увеличивает индекс на 1, показывает следующй слайд*/
    function plusSlide() {
        showSlides(slideIndex += 1);
    }

    /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
    function minusSlide() {
        showSlides(slideIndex -= 1);
    }

    /* Устанавливает текущий слайд */
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    /* Основная функция сладера */
    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("item");
        var dots = document.getElementsByClassName("slider-dots_item");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        //dots[slideIndex - 1].className += " active";
    }
}

var mobileCode = "";
var type = "";


function AddServiceApplication() {
    $.ajax({
        type: "GET",
        url: host + "Content/Applicate/?mobileCode=" + mobileCode + "&type=ServiceConnection",
        success: function (result) {
            if (result)
                location.reload();
            else
                alert("Заявка на подключение  услуги была подана!");
        }
    });
}
function AddServiceDeleteApplication() {
    $.ajax({
        type: "GET",
        url: host + "Content/Applicate/?mobileCode=" + mobileCode + "&type=ServiceDisconnect",
        success: function (result) {
            if (result)
                location.reload();
            else
                alert("Заявка на удаление услуги была подана!");
        }
    });
}
function AddRateApplication() {
    $.ajax({
        type: "GET",
        url: host + "Content/Applicate/?mobileCode=" + mobileCode + "&type=RateConnection",
        success: function (result) {
            if (result)
                location.reload();
            else
                alert("Заявка на подключение тарифа была подана!");
        }
    });
}
function offModal()
{
    var modal = document.getElementById('modal');
    modal.style.display = "none";
    serviceName = "";
    serviceType = "";
}
function onModal(code)
{
    var code_label = document.getElementById('Command');
    var modal = document.getElementById('modal');
    code_label.innerText = "Команда для подключения с телефона:  " + code;
    modal.style.display = "block";
    mobileCode = code;
}
function showLoginForm()
{
    var action_name = document.getElementById('action-name');
    var login = document.getElementById('signIn-form');
    var register = document.getElementById('signUp-form');
    login.style.display = "block";
    register.style.display = "none";
    action_name.innerText = "Авторизация";
}
function showRegisterForm()
{
    var action_name = document.getElementById('action-name');
    var login = document.getElementById('signIn-form');
    var register = document.getElementById('signUp-form');
    login.style.display = "none";
    register.style.display = "block";
    action_name.innerText = "Регистрация";
}

function showService(blockId)
{
    var category = document.getElementById('service-name');
    var category_name = " ";
    var internet = document.getElementById('internet-services');
    var phone = document.getElementById('phone-services');
    var zero = document.getElementById('zero-services');
    var newUser = document.getElementById('new-services');
    var off = "none";
    var on = "block";
    switch(blockId)
    {
        case "internet":
            newUser.style.display = off;
            zero.style.display = off;
            phone.style.display = off;
            internet.style.display = on;
            category_name = "Интернет";
            break;
        case "phone":
            newUser.style.display = off;
            zero.style.display = off;
            phone.style.display = on;
            internet.style.display = off;
            category_name = "Вызовы";
            break;
        case "zero":
            newUser.style.display = off;
            zero.style.display = on;
            phone.style.display = off;
            internet.style.display = off;
            category_name = "При нуле";
            break;
        case "new":
            newUser.style.display = on;
            zero.style.display = off;
            phone.style.display = off;
            internet.style.display = off;
            category_name = "Новым пользователям";
            break;
    }
    category.innerHTML = category_name;
}

function showAnswer(index)
{
    var question = document.getElementsByClassName('question')[index];
    var answer = document.getElementsByClassName('answer')[index];
    var pointer = document.getElementsByClassName('down')[index];
    if(getComputedStyle(answer).display == "none")
    {
        answer.style.display = "block";
        question.style.border = "none";
        pointer.style.transform = "rotate(225deg)";
    }
    else
    {
        answer.style.display = "none";
        question.style.borderBottom = "1px solid black";
        pointer.style.transform = "rotate(45deg)";
        arr[index] = 0;
    }
}

function getPoosition(index) { return  }