var total = {
    input: document.querySelector(".form-control"),
    cityName: "",

    search: function () {
        document.querySelector(".btn").addEventListener("click",async el => {
            //console.log(this.input.value);
            this.cityName = this.input.value;
         await  total.api(this.cityName);
           total.show();
           this.changeBg();
        });
        

    },

    infoToShow: {
        name: "",
        country: "",
        temp: "",
        humidity: "",
        mainWeather: "",
        windSpeed: "",

    },
    show: function () {
        document.querySelector("#country").textContent=this.infoToShow.country;
        document.querySelector("#name").textContent=this.infoToShow.name;
        document.querySelector("#temp").textContent=this.infoToShow.temp+" °C";
        document.querySelector("#humidity").textContent=this.infoToShow.humidity+" %";
        document.querySelector("#mainWeather").textContent=this.infoToShow.mainWeather;
        document.querySelector("#windSpeed").textContent=this.infoToShow.windSpeed+" m/s";

    },


    api: async function (city) {
        try {
            var info = this.infoToShow;

            var totalInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=150ef37052f1a7461e5a5ab7f51487ef`)
            var totalInfo = await totalInfo.json();
            console.log(totalInfo);

            info.name = await totalInfo.name;
            info.temp =await Math.floor( totalInfo.main.temp - 274);
            info.humidity =await totalInfo.main.humidity;
            info.mainWeather =await totalInfo.weather[0].description;
            info.windSpeed = await totalInfo.wind.speed;
            info.country =await totalInfo.sys.country;
        } catch {
            console.log("error");
            document.querySelector("#country").textContent="undefined city";
            document.querySelector("#name").textContent="";
            document.querySelector("#temp").textContent="";
            document.querySelector("#humidity").textContent="";
            document.querySelector("#mainWeather").textContent="";
            document.querySelector("#windSpeed").textContent="";
        }

    },
    changeBg:function(){
        if(this.infoToShow.mainWeather=="clear sky"){
            document.getElementsByTagName("body")[0].style.backgroundImage="url(https://media.istockphoto.com/photos/beautiful-sky-with-white-cloud-background-picture-id517897328?b=1&k=20&m=517897328&s=170667a&w=0&h=QpeJ9U8Kdx7Wbj96k_8pYR_5NvM2FfcufYg2NJGqPUo=)";
        }else if(this.infoToShow.mainWeather=="overcast clouds" || this.infoToShow.mainWeather=="scattered clouds" ){
            document.getElementsByTagName("body")[0].style.backgroundImage="url(https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/black-rain-abstract-dark-power-1-1.jpg?w=900)";
        }else{
            document.getElementsByTagName("body")[0].style.backgroundImage="";
        }
    }

    

}

total.search();
