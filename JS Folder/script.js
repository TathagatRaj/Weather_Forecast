const body = document.getElementById("body");
const row1 = document.getElementById("row1");
const outputElement = document.getElementById("outputElement");
const sunRise = document.getElementById("sunRise");
const sunSet = document.getElementById("sunSet");
const sun = document.getElementById("sun");
const windDirection = document.getElementById("windDirection");
const locations = document.getElementById("location");
const MoonRising = document.getElementById("MoonRising");
const MoonSeting = document.getElementById("MoonSeting");
const PhaseInfo = document.getElementById("PhaseInfo");
const aqi = document.getElementById("aqi");
const aqiInfo = document.getElementById("aqiInfo");
const aqiPara = document.getElementById("aqiPara");
const PresentTime = document.getElementById("PresentTime");
const DayNDate = document.getElementById("DayNDate");
const aqiDescription = document.getElementById("aqiDescription");
const PM25val = document.getElementById("PM25val");
const COval = document.getElementById("COval");
const PM10val = document.getElementById("PM10val");
const O3val = document.getElementById("O3val");
const SO2val = document.getElementById("SO2val");
const NO2val = document.getElementById("NO2val");
const PresentCity = document.getElementById("PresentCity");
const currentWeatherSun = document.getElementById("currentWeatherSun");
const content = document.getElementById("content");
const HeadBg = document.getElementById("HeadBg");
const Search = document.getElementById("Search");
const Title = document.getElementById("Title");
const ContainAll = document.getElementById("ContainAll");
const errorBtn = document.getElementById("errorBtn");
const NewRing = document.getElementById("NewRing");
var Dynamic = document.getElementById("Dynamic");
var DynamicCities = document.getElementById("DynamicCities"); 

// show icons
function show_icons(input_var,max_icons) {
    const data = []
    for(let i = 1; i < max_icons; i++) {
        data.push(document.getElementById(`${input_var}${i}`));
    }
    return data
}

const TotalPara = show_icons("Para",15)
const CurrentWeatherIcons = show_icons("currentWeatherIcon",8)                          // Current Weather Icons  
const TotalCloudNLight = show_icons("cloudNlightning",25)                               // Cloud N Yellow Lightning Icons (24-hour)
const TotalCloudOnly = show_icons("cloudOnly",25)                                       // Cloud Only Icons (24-hour)
const TotalDownpour = show_icons("downpour",25)                                         // Rainy Cloud Icons (24-hour)
const TotalSun = show_icons("yellowSun",25)                                             // Yellow Sun Icons (24-hour)  
const TotalCloudySun = show_icons("cloudySun",25)                                       // Sun with Cloud Icons (24-hour)
const TotalBlueMoon = show_icons("blueMoon",25)                                         // Blue Moon Icons (24-hour)
const TotalCloudyMoon = show_icons("cloudyMoon",25)                                     // Cloudy Moon Icons (24-hour)  
const TotalOneCloudSun = show_icons("oneCloudSun",25)                                   // One Cloud with Sun (24-hour)
const TotalStars = show_icons("onlyStars",25)                                           // Only Stars (24-hour);
const TotalVeryHot = show_icons("VeryHot",16)                                           // Very Hot Icons (15-day)
const TotalSunny = show_icons("Sunny",16)                                               // Yellow Sun Icons (15-day)
const TotalVeryCold = show_icons("VeryCold",16)                                         // Very Cold Icons (15-day)
const TotalRaining = show_icons("Raining",16)                                           // Rainy Cloud Icons (15-day)
const TotalStorm = show_icons("Storm",16)                                               // Cloud N Yellow Lightning Icons (15-day)
const TotalSunNCloud = show_icons("SunNCloud",16)                                       // Sun with Cloud Icons (15-day)
const TotalSunNManyCloud = show_icons("SunNManyCloud",16)                               // Sun with Many Clouds Icons (15-day)
const TotalCloudyDay = show_icons("cloudDay",16)                                        // Cloud Only Icons (15-day)
const TotalAqi = show_icons("Aqi",7)                                                    // Aqi-Meter Icons
const TotalDays = show_icons("EightDay",15)                                             // WeekDays (15-day) 
const TotalBoxes = show_icons("Box",31)
const TotalHr = show_icons("Hourly",25)
const TotalDates = show_icons("Date",16)
const TotalDatesHi = show_icons("DateHi",16)
const TotalDatesLo = show_icons("DateLo",16)
const TotalInfo = show_icons("Info",16)
const TotalRain = show_icons("DateRain",16)
const TotalTime = show_icons("Time",25)
const TotalTemp = show_icons("Temp",25)
const TotalPreci = show_icons("Preci",25)

//Global variables
let globalData;
let globalCountryId;
let globalCity;
let globalLatitude;
let globalLongitude;
let globalCountry;
let globalHr;
let globalMin;
let globalSunRiseHr;
let globalSunRiseMin;
let globalSunSetHr;
let globalSunSetMin;
let globalPreci;
let globalCloud;
let globalMoonRiseHr;
let globalMoonRiseMin;
let globalMoonSetHr;
let globalMoonSetMin;
let HourCloudCover = [];   
let HourPreci = [];
let HourPreciPercent = []; 

function showList() {
    select.classList.toggle('show');
}

$(document).ready(function() {                     //Initialize select2 for Country
    $('.SearchCountry').select2({   
        placeholder: 'Search Country'
    });
});

$(document).ready(function() {                     //Initialize select2 for City
    $('.SearchCity').select2({   
        placeholder: 'Search City'
    });
});

//Reset 24-hour Weather Icons
function resetWeatherIcons() {
    for (let i = 0; i < 24; i++) {
        TotalCloudNLight[i].style.display = "none";
        TotalCloudOnly[i].style.display = "none";
        TotalDownpour[i].style.display = "none";
        TotalCloudySun[i].style.display = "none";
        TotalBlueMoon[i].style.display = "none";
        TotalCloudyMoon[i].style.display = "none";
        TotalOneCloudSun[i].style.display = "none";
        TotalStars[i].style.display = "none";
        TotalSun[i].style.display = "none";
    }
}

//Reset 15-day Weather Icons
function resetDaysIcons() {
    for (let i = 0; i < 15; i++) {
        TotalSunny[i].style.display = "none";
        TotalVeryCold[i].style.display = "none";
        TotalRaining[i].style.display = "none";
        TotalStorm[i].style.display = "none";
        TotalSunNCloud[i].style.display = "none";
        TotalSunNManyCloud[i].style.display = "none";
        TotalCloudyDay[i].style.display = "none";
        TotalVeryHot[i].style.display = "none";
    }
}

//Function to fetch api
function FetchApiData(url) {
    const ApiUrl = url;

    return fetch(url)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Data not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.json();
    })
}

//Fetch Country Data
FetchApiData('https://countriesnow.space/api/v0.1/countries')
  .then(data => {
    globalData = data;
    const CountryNames = data.data.map(countryData => countryData.country);
  
    for (var i =0; i < CountryNames.length; i++ ) {
        var option = document.createElement("option");
        option.value = CountryNames[i];
        option.text = CountryNames[i];
        Dynamic.appendChild(option);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
//JS for accessing cities of selected country
  $(Dynamic).on('change', function() {     
    globalCountry = Dynamic.value;
    const selectedCountry = globalData.data.find(country => country.country == globalCountry);
  
    DynamicCities.innerHTML = "";

    if(selectedCountry) {
        const cities = selectedCountry.cities;
        globalCountryId= selectedCountry.iso2;
      
        for (var i = 0; i < cities.length; i++) {
            var option = document.createElement("option");
            option.value = cities[i];
            option.text = cities[i];DateLo15
            DynamicCities.appendChild(option);
        }

        $(DynamicCities).on('change', function() {
        globalCity = DynamicCities.value;
        WeatherInfo();
        MoonPhase();
        for(let i = 0; i < TotalBoxes.length; i++) {
            TotalBoxes[i].style.filter = "blur(10px)";
        }
        setTimeout(() => {
            NewRing.style.display = "block";
        }, 0);
        })
    }
});

//Fetch Weather Data
function WeatherInfo() {                      
    const WeatherApi = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${globalCity},${globalCountryId}?key=TGEMXMJDH3CFS6VZRKP3HP4ZZ`;

    fetch(WeatherApi)
    .then(response => {
        if (!response.ok) {
            NewRing.style.display = "none";
            body.style.overflow = "hidden";
            for(let i = 0; i < TotalBoxes.length; i++) {
            TotalBoxes[i].style.filter = "blur(0px)";
            }
            for(let i = 0; i < TotalPara.length; i++) {
                TotalPara[i].innerHTML = "- -";
            }
            TotalPara[5].innerHTML = "!!!  Weather data for this city is not available.";
            TotalPara[5].style.color = "red";
            TotalPara[9].style.color = "black";
            currentWeatherSun.style.visibility = "hidden";
            PresentCity.innerHTML = "- -";
            for(let i = 0; i < CurrentWeatherIcons.length; i++) {
                CurrentWeatherIcons[i].style.display = "none";
            }
        }
        return response.json();
    })
    
    .then(data => {
        console.log(data);
        const days = data.days;
        NewRing.style.display = "none";
        body.style.overflow = "auto";
        for(let i = 0; i < TotalBoxes.length; i++) {
        TotalBoxes[i].style.filter = "blur(0px)";
        }

    //15-Day forecast
    const DayMax = [];
    const DayMin = [];
    const Precipitations = [];                                         // 15-PerDay Avg Precipitation Percentage
    const Dates = [];
    const Descriptions = [];
    const DaysCloudCover = [];                                         // 15-PerDay Avg Cloudcover Data
    const DaysPreci = [];                                              // 15-PerDay Avg Precipitation Amount Data
    const DaysTemp = [];                                               // 15-PerDay Avg Temp Data                                      
    for (let i = 0; i < 15; i++) {
        DayMax.push(Math.round((days[i].tempmax - "32") * 5/9));
        DayMin.push(Math.round((days[i].tempmin - "32") * 5/9));
        Precipitations.push(Math.round(days[i].precipprob));
        Dates.push(days[i].datetime.substring(8,10) + "/" + days[i].datetime.substring(5,7));
        Descriptions.push(days[i].description);
        DaysCloudCover.push(Math.round(data.days[i].cloudcover));
        DaysPreci.push(data.days[i].precip);
        DaysTemp.push(Math.round(data.days[i].temp));
    }

    // 24-hour forecast
    const Hourss = [];
    const HourlyTemperature = [];
    HourCloudCover = [];                                            // 24-PerHour Avg Cloudcover Data
    HourPreci = [];                                                 // 24-PerHour Avg Precipitation Amount Data 
    HourPreciPercent = [];                                          // 24-PerHour Avg Precipitation Percentage
    for (let i = 0; i < 24; i++) {
        Hourss.push(days[0].hours[i].datetime.substring(0,2));
        HourlyTemperature.push(Math.round((days[0].hours[i].temp - "32") * 5/9));
        HourCloudCover.push(Math.round(data.days[0].hours[i].cloudcover));
        HourPreci.push(data.days[0].hours[i].precip);
        HourPreciPercent.push(Math.round(data.days[0].hours[i].precipprob));
    }

    const WeekDates = [];                                           // 15-PerDay date
    for (let i = 1; i < 15; i++) {
        WeekDates.push(new Date(data.days[i].datetime));
    }
       
    const Hourly0 = days[1].hours[0].datetime.substring(0,2);
    const HourlyTemp0 = Math.round((days[1].hours[0].temp - "32") * 5/9);
    const HourlyPreci0 = Math.round(days[1].hours[0].precipprob);
    const FeelLike = Math.round((data.currentConditions.feelslike - "32") * (5/9));
    const standardTemp = Math.round((data.currentConditions.temp - "32") * (5/9));
    const Humid = Math.round(data.currentConditions.humidity);
    const Pr = Math.round(data.currentConditions.pressure);
    const myRise = data.currentConditions.sunrise.substring(0,5); 
    globalSunRiseHr = data.currentConditions.sunrise.substring(0,2);
    globalSunRiseMin = data.currentConditions.sunrise.substring(3,5);
    const TotalRMin = (+globalSunRiseHr) * 60 + (+globalSunRiseMin);  
    const mySet = data.currentConditions.sunset.substring(0,5);
    globalSunSetHr = data.currentConditions.sunset.substring(0,2);
    globalSunSetMin = data.currentConditions.sunset.substring(3,5);  
    const TotalSMin = (+globalSunSetHr) * 60 +  (+globalSunSetMin); 
    const TotalMin = TotalSMin - TotalRMin;
    var hours = (TotalMin / 60);      
    var rhours = Math.floor(hours);   
    var minutes = (hours - rhours) * 60;    
    var rminutes = Math.round(minutes);
    const standardWind = Math.round(data.currentConditions.windspeed * "1.609");
    const visibility = data.currentConditions.visibility;
    const standardVisibility = Math.round(visibility * "1.609");
    globalCloud = Math.round(data.currentConditions.cloudcover);
    const Dew = Math.round((days[0].dew - "32") * 5/9);
    const direction = data.currentConditions.winddir;
    const AheadDescription = data.description;
    const Address = data.resolvedAddress.split(", ")
    const AddressCity = Address[0];
    const AddressState = Address[1];
    globalLatitude = data.latitude;
    globalLongitude = data.longitude;
    globalPreci = data.currentConditions.precip;
    const CurrentPreci = data.currentConditions.precipprob;
    AirQualityInfo();          //for CO,O3,PM10,PM.5
    AirQualityInfo1();         //for SO2,NO2
    CurrentTime();

    //for Wind direction
    let directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    function WindDir(direction) {
        return directions[Math.floor((direction + 11.25) / 22.5) % 16];
    }
    let windDirection = WindDir(direction);

    TotalPara[0].innerHTML = DayMax[0];
    TotalPara[1].innerHTML = DayMin[0];
    TotalPara[3].innerHTML = standardTemp + "&deg";
    TotalPara[4].innerHTML = "RealFeel " + FeelLike + "&deg";
    TotalPara[5].innerHTML = Descriptions[0];
    TotalPara[5].style.color = "black";
    TotalPara[6].innerHTML = Humid + " %";
    TotalPara[7].innerHTML = windDirection + " " + standardWind + " km/h";
    TotalPara[8].innerHTML = Pr + " mbar";
    TotalPara[10].innerHTML = Dew + "&degC";
    TotalPara[11].innerHTML = standardVisibility + " km";
    TotalPara[12].innerHTML = globalCloud + " %";
    TotalPara[13].innerHTML = AheadDescription;
    sunRise.innerHTML = myRise;
    sunSet.innerHTML = mySet;
    sun.innerHTML = rhours + " hrs " + rminutes + " mins";

    for(let i = 0; i < 14; i++) {
        TotalDays[i].innerHTML = WeekDates[i].toString().substring(0,3).toUpperCase();
    }

    for(let i = 0; i < Dates.length; i++) {
        TotalDates[i].innerHTML = Dates[i];
        TotalDatesHi[i].innerHTML = DayMax[i] + "&deg";
        TotalDatesLo[i].innerHTML = DayMin[i] + "&deg";
        TotalInfo[i].innerHTML = Descriptions[i];
        TotalRain[i].innerHTML = Precipitations[i] + "%";
    }

    for(let i = 0; i < 24; i++) {
        TotalTime[i].innerHTML = Hourss[i];
        TotalTemp[i].innerHTML = HourlyTemperature[i] + "&deg";
        TotalPreci[i].innerHTML = HourPreciPercent[i] + "%";
    }
    
    if (AddressState == undefined) {
        PresentCity.innerHTML = AddressCity + ", " + standardTemp + "&degC";    
    } else {
        PresentCity.innerHTML = AddressCity + ", " + AddressState + " " + standardTemp + "&degC";
    }

    resetDaysIcons();
        
    // For 15-Days Weather Icons
    for(let i = 0; i < 15; i++) {
        if (DaysTemp[i] > 104) {
            TotalVeryHot[i].style.display = "block";
        } else if (DaysTemp[i] < 32) {
            TotalVeryCold[i].style.display = "block";
        } else if ((DaysCloudCover[i] >= 60) && (DaysPreci[i] > 0.2 && DaysPreci[i] < 0.4) && (Precipitations[i] > 50)) {
            TotalStorm[i].style.display = "block";
        } else if (DaysPreci[i] >= 0.4) {
            TotalRaining[i].style.display = "block";
        } else if ((DaysCloudCover[i] <= 25) && (DaysPreci[i] <= 0.1) && (Precipitations[i] < 50) && (DaysTemp[i] <= 104 && DaysTemp[i] > 50 )) {
            TotalSunny[i].style.display = "block";
        } else if ((DaysCloudCover[i] > 25 && DaysCloudCover[i] <= 60) && (DaysPreci[i] <= 0.1 || DaysPreci[i] == undefined || DaysPreci[i] == null) && (DaysTemp[i] <= 104)) {
            TotalSunNCloud[i].style.display = "block";
        } else if ((DaysCloudCover[i] > 60) && ((DaysPreci[i] <= 0.1) || (DaysPreci[i] == null) || (DaysPreci[i] == undefined)) && (DaysTemp[i] <= 104)) {
            TotalSunNManyCloud[i].style.display = "block";
        } else if ((((DaysCloudCover[i] > 40) && (Precipitations[i] > 40))  || (DaysCloudCover[i] >= 90) || ((DaysCloudCover[i] < 40) && Precipitations[i] >= 50)) && (DaysPreci[i] < 0.4)) {
            TotalCloudyDay[i].style.display = "block";
        }
    }

    HeadBg.style.transform = "translate(0px,0px)";
    Search.style.transform = "translate(0px,0px)";
    content.style.display = "block";

  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//Fetch Air Pollution Data
function AirQualityInfo() {                    
FetchApiData(`https://api.weatherbit.io/v2.0/current/airquality?lat=${globalLatitude}&lon=${globalLongitude}&key=9aed60476c234f40a451296a85b9c6a8`)
    .then(data => {
        const AirQuality = data.data[0].aqi;

        COval.innerHTML = Math.round(data.data[0].co);       //Carbon Monoxide
        O3val.innerHTML = data.data[0].o3;                   //Ozone
        PM10val.innerHTML = data.data[0].pm10;               //PM10
        PM25val.innerHTML = data.data[0].pm25;               //PM2.5
        aqi.innerHTML = AirQuality;     

    function AqiData(aqi_Grade,border_Color,Aqi_Brief,Meter_num) {
        aqiInfo.innerHTML = aqi_Grade;
        aqiInfo.style.borderColor = border_Color;
        TotalPara[9].innerHTML = aqi_Grade;
        TotalPara[9].style.color = border_Color;
        aqiDescription.innerHTML = Aqi_Brief;
        AqiMeter(Meter_num);
    }

    if (AirQuality >= 0 && AirQuality <= 19) {
        AqiData("Excellent","rgb(6, 206, 206)","The air quality is ideal for most individuals, enjoy your normal outdoor activities.",0)
    } else if (AirQuality >= 20 && AirQuality <= 50) {
        AqiData("Fair","rgb(14, 231, 14)","Air quality is satisfactory, and air pollution poses little or no risk.",0)
    } else if (AirQuality >= 51 && AirQuality <= 100) {
        AqiData("Moderate","rgb(225, 238, 44)","Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",1)
    } else if (AirQuality >= 101 && AirQuality <= 150) {
        AqiData("Unhealthy for Sensitive Groups","rgb(255, 112, 16)","Members of sensitive groups may experience health effects. The general public is less likely to be affected.",2)
    } else if (AirQuality >= 151 && AirQuality <= 200) {
        AqiData("Unhealthy","rgb(255, 16, 16)","Some members of the general public may experience health effects, members of sensitive groups may experience more serious health effects.",3)
    } else if (AirQuality >= 201 && AirQuality <= 300) {
        AqiData("Very Unhealthy","rgb(169, 29, 58)","Health alert: The risk of health effects is increased for everyone.",4)
    } else if (AirQuality >= 301) {
        AqiData("Hazardous","rgb(83, 2, 2)","Health warning of emergency conditions: Everyone is more likely to be affected.",5)
    }

    function AqiMeter(index) {
        TotalAqi[index].style.display = "block";
        for (let i = 0; i < TotalAqi.length; i++) {
            if (i != index) {
                TotalAqi[i].style.display = "none";
            }
        }
    }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//Fetch Air Pollution Pollutants Data
function AirQualityInfo1() {                    
FetchApiData(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${globalLatitude}&longitude=${globalLongitude}&current=nitrogen_dioxide,sulphur_dioxide`)
    .then(data => {
        NO2val.innerHTML = Math.round(data.current.nitrogen_dioxide);
        SO2val.innerHTML = Math.round(data.current.sulphur_dioxide);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
    
//Fetch Moon Data
function MoonPhase() {                         
FetchApiData(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${globalCity},${globalCountryId}?unitGroup=us&key=TGEMXMJDH3CFS6VZRKP3HP4ZZ&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`)
    .then(data => {
        const MoonRise = data.days[0].moonrise.substring(0,5); 
        globalMoonRiseHr = MoonRise.substring(0,2);
        globalMoonRiseMin = MoonRise.substring(3,5);
        const MoonSet = data.days[0].moonset.substring(0,5);
        globalMoonSetHr = MoonSet.substring(0,2);
        globalMoonSetMin = MoonSet.substring(3,5);
        if (data.days[0].moonrise == undefined) {
            MoonRising.innerHTML = "&nbsp&nbsp&nbsp&nbsp--" ;
        } else if (data.days[0].moonrise != undefined) {
            MoonRising.innerHTML = MoonRise;
        }
        MoonSeting.innerHTML = MoonSet;
        const moonPhase = data.days[0].moonphase;

    function getMoonPhase(moonPhase) {
        const phases = [{ name: "New Moon", range: [0] },{ name: "Waxing Crescent", range: [0, 0.25] },{ name: "First Quarter", range: [0.25] },{ name: "Waxing Gibbous", range: [0.25, 0.5] },
                     { name: "Full Moon", range: [0.5] },{ name: "Waning Gibbous", range: [0.5, 0.75] },{ name: "Last Quarter", range: [0.75] },{ name: "Waning Crescent", range: [0.75, 1] }];
        for (let phase of phases) {
            const [min, max] = phase.range;
            if (moonPhase >= min && moonPhase <= max) {
                return phase.name;
            }
        }
        return "Invalid moon phase";
    }
    PhaseInfo.innerHTML = getMoonPhase(moonPhase)

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

 //Fetch Current Date and Time
function CurrentTime() {                       
FetchApiData(`https://api.ipgeolocation.io/timezone?apiKey=4f23a4b6279643c1a8e4b22f3685d95c&lat=${globalLatitude}&long=${globalLongitude}`)
    .then(data => {
        const time = (data.time_24.substring(0,5));
        globalHr = data.time_24.substring(0,2);
        globalMin = data.time_24.substring(3,5);
        const day = data.date_time_wti.substring(0,3).toUpperCase();
        const date = data.date_time_wti.substring(5,7).toUpperCase();
        const month = data.date_time_wti.substring(8,11).toUpperCase();
        if (data.time_24.substring(0,1) == 0) {
            timeHr = (data.time_24.substring(1,2));  
        } else {
            timeHr = (data.time_24.substring(0,2));
        }

        DayNDate.innerHTML = day + "," + " " + month + " " + date;
        TotalPara[2].innerHTML = time;
        
        for(let i = 0; i < timeHr; i++) {
            TotalHr[i].style.backgroundColor = "rgb(172, 172, 172)";
            TotalHr[i].style.boxShadow = "0px 0px 2px black";
            TotalHr[i].style.opacity = "0.5";
            TotalHr[i].style.borderRadius = "3px";
        }

        for(let i = timeHr; i < 24; i++) {
            TotalHr[i].style.backgroundColor = "rgb(172, 172, 172)";
            TotalHr[i].style.boxShadow = "0px 0px 2px black";
            TotalHr[i].style.borderRadius = "3px";
        }

      // For Current Weather Icons
        if ((((globalHr == globalSunRiseHr) && (globalMin >= globalSunRiseMin)) || (globalHr > globalSunRiseHr)) && (((globalHr == globalSunSetHr) && (globalMin <= globalSunSetMin)) || (globalHr < globalSunSetHr)) && (globalCloud < 25) && ((globalPreci < 0.1) || (globalPreci == null) || (globalPreci == undefined))) {
            currentWeatherSun.style.visibility = "visible";
            for(let i = 0; i < 6; i++) {
                CurrentWeatherIcons[i].style.display = "none";
            }
        } else if ((((globalHr == globalSunRiseHr) && (globalMin >= globalSunRiseMin)) || (globalHr > globalSunRiseHr)) && (((globalHr == globalSunSetHr) && (globalMin <= globalSunSetMin)) || (globalHr < globalSunSetHr)) && (globalCloud >= 25 && globalCloud < 60) && ((globalPreci < 0.1) || (globalPreci == null) || (globalPreci == undefined))) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(3);
        } else if ((((globalHr == globalSunRiseHr) && (globalMin >= globalSunRiseMin)) || (globalHr > globalSunRiseHr)) && (((globalHr == globalSunSetHr) && (globalMin <= globalSunSetMin)) || (globalHr < globalSunSetHr)) && (globalCloud >= 60) && ((globalPreci < 0.1) || (globalPreci == null) || (globalPreci == undefined))) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(5);
        } else if ((globalCloud >= 80) && ((globalPreci >= 0.001 && globalPreci <= 0.1))) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(1);
        } else if ((globalCloud >= 80) && ((globalPreci > 0.1))) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(2);
        } else if ((((globalHr == globalMoonRiseHr) && (globalMin >= globalMoonRiseMin)) || (globalHr > globalMoonRiseHr)) && (((globalHr == globalSunRiseHr) && (globalMin < globalSunRiseMin)) || (globalHr < globalSunRiseHr)) && (globalCloud < 25) && ((globalPreci < 0.1) || (globalPreci == null) || (globalPreci == undefined))) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(0);
        } else if ((((globalHr == globalMoonRiseHr) && (globalMin >= globalMoonRiseMin)) || (globalHr > globalMoonRiseHr)) && (((globalHr == globalSunRiseHr) && (globalMin < globalSunRiseMin)) || (globalHr < globalSunRiseHr)) && (globalCloud >= 25) && ((globalPreci < 0.1) || (globalPreci == null) || (globalPreci == undefined))) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(4);
        } else if ((globalCloud < 40) && (((globalHr == globalMoonRiseHr) && (globalMoonRiseMin > 30)) || (globalHr < globalMoonRiseHr)) || (((globalHr == globalSunSetHr) && (globalSunSetMin < 30)) || (globalHr > globalSunSetHr) || TotalTime[0].innerHTML == 0)) {
            currentWeatherSun.style.visibility = "hidden";
            CWeatherIcons(6);
        }

        function CWeatherIcons(index) {
            CurrentWeatherIcons[index].style.display = "block";
            for(let i = 0; i < CurrentWeatherIcons.length; i++) {
                if (i != index) {
                    CurrentWeatherIcons[i].style.display = "none";
                }
            }
        }
        
        resetWeatherIcons();

      // For 24-hour Weather Icons
        for(let i = 0; i < 24; i++) {
            if ((((TotalTime[i].innerHTML == globalSunRiseHr) && (globalSunRiseMin <= 30)) || (TotalTime[i].innerHTML > globalSunRiseHr)) && (((TotalTime[i].innerHTML == globalSunSetHr) && (globalSunSetMin >= 30)) || (TotalTime[i].innerHTML < globalSunSetHr)) && (HourCloudCover[i] < 25) && ((HourPreci[i] < 0.1) || (HourPreci[i] == undefined) || (HourPreci[i] == null))) {
                TotalSun[i].style.display = "block";
            } else if ((((TotalTime[i].innerHTML == globalSunRiseHr) && (globalSunRiseMin <= 30)) || (TotalTime[i].innerHTML > globalSunRiseHr)) && (((TotalTime[i].innerHTML == globalSunSetHr) && (globalSunSetMin >= 30)) || (TotalTime[i].innerHTML < globalSunSetHr)) && (HourCloudCover[i] >= 25 && HourCloudCover[i] < 60) && ((HourPreci[i] < 0.1) || (HourPreci[i] == undefined) || (HourPreci[i] == null))) {
                TotalOneCloudSun[i].style.display = "block";
            } else if ((((TotalTime[i].innerHTML == globalSunRiseHr) && (globalSunRiseMin <= 30)) || (TotalTime[i].innerHTML > globalSunRiseHr)) && (((TotalTime[i].innerHTML == globalSunSetHr) && (globalSunSetMin >= 30)) || (TotalTime[i].innerHTML < globalSunSetHr)) && (HourCloudCover[i] >= 60) && ((HourPreci[i] < 0.1) || (HourPreci[i] == undefined) ||(HourPreci[i] == null)) && (HourPreciPercent[i] < 50)) {
                TotalCloudySun[i].style.display = "block";
            } else if ((((TotalTime[i].innerHTML == globalMoonRiseHr) && (globalMoonRiseMin <= 30)) || (TotalTime[i].innerHTML > globalMoonRiseHr)) && (((TotalTime[i].innerHTML == globalSunRiseHr) && (globalSunRiseMin > 30)) || ((TotalTime[i].innerHTML == globalSunSetHr) && (globalSunSetMin < 30)) || (TotalTime[i].innerHTML < globalSunRiseHr) || (TotalTime[i].innerHTML > globalSunSetHr)) && (((TotalTime[i].innerHTML == globalMoonSetHr) && (globalMoonSetMin > 30)) || (TotalTime[i].innerHTML < globalMoonSetHr)) && (HourCloudCover[i] < 25) && ((HourPreci[i] < 0.1) || (HourPreci[i] == undefined) || (HourPreci[i] == null))) {
                TotalBlueMoon[i].style.display = "block";
            } else if ((((TotalTime[i].innerHTML == globalMoonRiseHr) && (globalMoonRiseMin <= 30)) || (TotalTime[i].innerHTML > globalMoonRiseHr)) && (((TotalTime[i].innerHTML == globalSunRiseHr) && (globalSunRiseMin > 30 )) || ((TotalTime[i].innerHTML == globalSunSetHr) && (globalSunSetMin < 30)) || (TotalTime[i].innerHTML < globalSunRiseHr) || (TotalTime[i].innerHTML > globalSunSetHr)) && (((TotalTime[i].innerHTML == globalMoonSetHr) && (globalMoonSetMin > 30)) || (TotalTime[i].innerHTML < globalMoonSetHr)) && (HourCloudCover[i] >= 25) && ((HourPreci[i] < 0.1) || (HourPreci[i] == undefined) || (HourPreci[i] == null)) && (HourPreciPercent[i] < 50)) {
                TotalCloudyMoon[i].style.display = "block";
            } else if ((HourCloudCover[i] >= 40 || HourPreciPercent[i] >=60 ) && (HourPreci[i] <= 0.1)) {
                TotalCloudOnly[i].style.display = "block";
            } else if ((HourCloudCover[i] < 40) && (((TotalTime[i].innerHTML == globalMoonRiseHr) && (globalMoonRiseMin > 30)) || (TotalTime[i].innerHTML < globalMoonRiseHr)) || (((TotalTime[i].innerHTML == globalSunSetHr) && (globalSunSetMin < 30)) || (TotalTime[i].innerHTML > globalSunSetHr) || TotalTime[i].innerHTML == 0)) {
                TotalStars[i].style.display = "block"
            } else if ((HourCloudCover[i] > 80) && (HourPreci[i] > 0.1 && HourPreci[i] <= 0.2)) {
                TotalCloudNLight[i].style.display = "block";
            } else if ((HourCloudCover[i] > 80) && (HourPreci[i] > 0.2)) {
                TotalDownpour[i].style.display = "block";  
            } 
        }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}