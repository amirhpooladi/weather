var total = {
    input: document.querySelector(".form-control"),
    cityName: "",

    search: function () {
        document.querySelector(".btn").addEventListener("click",async el => {
            //console.log(this.input.value);
            this.cityName = this.input.value;
         await  total.api(this.cityName);
           total.show();
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

    }
}

total.search();
