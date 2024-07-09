
        const outputElement = document.getElementById("outputElement");
        const maxTemp = document.getElementById("maxTemp");
        const minTemp = document.getElementById("minTemp");
        const Temp = document.getElementById("Temp");
        const feelLikeTemp = document.getElementById("feelLikeTemp");
        const sunRise = document.getElementById("sunRise");
        const sunSet = document.getElementById("sunSet");
        const sun = document.getElementById("sun");
        const humidity = document.getElementById("humidity");
        const pressure = document.getElementById("pressure");
        const windSpeed= document.getElementById("windSpeed");
        const windDirection = document.getElementById("windDirection");
        const visible = document.getElementById("visible");
        const cloud = document.getElementById("cloud");
        const locations = document.getElementById("location");
        const dewPoint = document.getElementById("dewPoint");
        const MoonRising = document.getElementById("MoonRising");
        const MoonSeting = document.getElementById("MoonSeting");
        const PhaseInfo = document.getElementById("PhaseInfo");
        const aqi = document.getElementById("aqi");
        const aqiInfo = document.getElementById("aqiInfo");
        const aqiPara = document.getElementById("aqiPara");
        const PresentTime = document.getElementById("PresentTime");

        const TotalDates = []; 
        for(let i = 1; i <= 15; i++) {
          TotalDates.push(document.getElementById(`Date${i}`));
        }
        
        const TotalDatesHi = [];
        for(let i = 1; i <= 15; i++) {
          TotalDatesHi.push(document.getElementById(`Date${i}Hi`));
        }
        
        const TotalDatesLo = [];
        for(let i = 1; i <= 15; i++) {
          TotalDatesLo.push(document.getElementById(`Date${i}Lo`));
        }
        
        const TotalInfo = [];
        for(let i = 1; i <= 15; i++) {
          TotalInfo.push(document.getElementById(`Info${i}`));
        }
       
        const TotalRain = [];
        for(let i = 1; i <= 15; i++) {
          TotalRain.push(document.getElementById(`Date${i}Rain`));
        }
        
        const TotalTime = [];
        for(let i = 1; i <= 24; i++) {
          TotalTime.push(document.getElementById(`Time${i}`));
        }

        
        const TotalTemp = [];
        for(let i = 1; i <= 24; i++) {
          TotalTemp.push(document.getElementById(`Temp${i}`));
        }
        
        const TotalPreci = [];
        for(let i = 1; i <= 24; i++) {
          TotalPreci.push(document.getElementById(`Preci${i}`));
        }
        
        const CountryCityUrl = 'https://countriesnow.space/api/v0.1/countries';
        
        var Dynamic = document.getElementById("Dynamic");
        var DynamicCities = document.getElementById("DynamicCities"); 
        let globalData;
        let globalCountryId;
        let globalCity;
        let globalLatitude;
        let globalLongitude;
        let globalPM10;
        let globalPM25;
        let globalCO;
        let globalO3;
        let globalSO2;
        let globalNO2;

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

        fetch(CountryCityUrl)                              //Fetch Country Data
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

          $(Dynamic).on('change', function() {    
            console.log("Hello");  
            const answer = Dynamic.value;
            const selectedCountry = globalData.data.find(country => country.country == answer);
          
            DynamicCities.innerHTML = "";

            if(selectedCountry) {
              const cities = selectedCountry.cities;
              globalCountryId= selectedCountry.iso2;
              
              for (var i = 0; i < cities.length; i++) {
                var option = document.createElement("option");
                option.value = cities[i];
                option.text = cities[i];Date15Lo
                DynamicCities.appendChild(option);
              
              }
              $(DynamicCities).on('change', function() {
              globalCity = DynamicCities.value;
              locations.innerHTML = globalCity + " , " + answer;
              WeatherInfo();
              MoonPhase();
            })
            }
        });

            function WeatherInfo() {                      //Fetch Weather Data
              const WeatherApi = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${globalCity},${globalCountryId}?key=TGEMXMJDH3CFS6VZRKP3HP4ZZ`;

              fetch(WeatherApi)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                const days = data.days;

                // 15-day forecast
                const DayMax = [];
                for (let i = 0; i < 15; i++) {
                  DayMax.push(Math.round((days[i].tempmax - "32") * 5/9));
                }

                const DayMin = [];
                for (let i = 0; i < 15; i++) {
                  DayMin.push(Math.round((days[i].tempmin - "32") * 5/9));
                }

                const Dates = [];
                for (let i = 0; i < 15; i++) {
                  Dates.push(days[i].datetime.substring(8,10) + "/" + days[i].datetime.substring(5,7));
                }

                const Descriptions = [];
                for (let i = 0; i < 15; i++) {
                  Descriptions.push(days[i].description);
                }

                const Precipitations = [];
                for (let i = 0; i < 15; i++) {
                  Precipitations.push(Math.round(days[i].precipprob));
                }

                // 24-hour forecast
                const Hourss = [];
                for ( let i = 1; i < 24; i++) {
                  Hourss.push(days[0].hours[i].datetime.substring(0,2));
                }
                
                const HourlyTemperature = [];
                for (let i = 1; i < 24; i++) {
                  HourlyTemperature.push(Math.round((days[0].hours[i].temp - "32") * 5/9));
                }

                const HourlyPrecipation = [];
                for (let i = 1; i < 24; i++) {
                  HourlyPrecipation.push(Math.round(days[0].hours[i].precipprob));
                }

                const Hourly0 = days[1].hours[0].datetime.substring(0,2);
                const HourlyTemp0 = Math.round((days[1].hours[0].temp - "32") * 5/9);
                const HourlyPreci0 = Math.round(days[1].hours[0].precipprob);
                const FeelLike = Math.round((data.currentConditions.feelslike - "32") * (5/9));
                const standardTemp = Math.round((data.currentConditions.temp - "32") * (5/9));
                const Humid = Math.round(data.currentConditions.humidity);
                const Pr = Math.round(data.currentConditions.pressure);
                const myRise = data.currentConditions.sunrise.substring(0,5); 
                const RiseHr = data.currentConditions.sunrise.substring(0,2);
                const RiseMin = data.currentConditions.sunrise.substring(3,5);
                const TotalRMin = (+RiseHr) * 60 + (+RiseMin);  
                const mySet = data.currentConditions.sunset.substring(0,5);
                const SetHr = data.currentConditions.sunset.substring(0,2);
                const SetMin = data.currentConditions.sunset.substring(3,5);  
                const TotalSMin = (+SetHr) * 60 +  (+SetMin); 
                const TotalMin = TotalSMin - TotalRMin;
                var hours = (TotalMin / 60);      
                var rhours = Math.floor(hours);   
                var minutes = (hours - rhours) * 60;    
                var rminutes = Math.round(minutes);
                const standardWind = Math.round(data.currentConditions.windspeed * "1.609");
                const visibility = data.currentConditions.visibility;
                const standardVisibility = Math.round(visibility * "1.609");
                const cloudi = Math.round(data.currentConditions.cloudcover);
                const Dew = Math.round((days[0].dew - "32") * 5/9);
                const direction = data.currentConditions.winddir;
                globalLatitude = data.latitude;
                globalLongitude = data.longitude;

                AirQualityInfo();
                AirQualityInfo1();
                CurrentTime();

                maxTemp.innerHTML = "Hi : " + DayMax[0] + "&degC";
                minTemp.innerHTML = "Lo : " + DayMin[0] + "&degC";
                feelLikeTemp.innerHTML = "Feel Like : " + FeelLike + "&degC";
                sunRise.innerHTML = "Sunrise : " + myRise;
                sunSet.innerHTML = "Sunset : " + mySet;
                sun.innerHTML = "Sun : " + rhours + " hrs " + rminutes + " mins";
                Temp.innerHTML = "Temp : " + standardTemp + "&degC"; 
                humidity.innerHTML = "Humidity : " + Humid + " %";
                pressure.innerHTML = "Pressure : " + Pr + " mbar";
                windSpeed.innerHTML = "Wind Speed : " + standardWind + " km/h";
                visible.innerHTML = "Visibility : " + standardVisibility + " km";
                cloud.innerHTML = "Cloudiness : " + cloudi + " %";
                dewPoint.innerHTML = "Dew Point : " + Dew + "&degC";
                if (direction > 11 && direction <= 33) {
                  windDirection.innerHTML = "Wind Direction : NNE";
                } else if (direction > 33 && direction <= 56) {
                  windDirection.innerHTML = "Wind Direction : NE";
                } else if (direction > 56 && direction <= 79) {
                  windDirection.innerHTML = "Wind Direction : ENE";
                } else if (direction > 79 && direction <= 101) {
                  windDirection.innerHTML = "Wind Direction : E";
                } else if (direction > 101 && direction <= 124) {
                  windDirection.innerHTML = "Wind Direction : ESE";
                } else if (direction > 124 && direction <= 147) {
                  windDirection.innerHTML = "Wind Direction : SE";
                } else if (direction >147 && direction <= 169) {
                  windDirection.innerHTML = "Wind Direction : SSE";
                } else if (direction > 169 && direction <= 191) {
                  windDirection.innerHTML = "Wind Direction : S";
                } else if (direction > 191 && direction <= 214) {
                  windDirection.innerHTML = "Wind Direction : SSW";
                } else if (direction > 214 && direction <= 236) {
                  windDirection.innerHTML = "Wind Direction : SW";
                } else if (direction > 236 && direction <= 259) {
                   windDirection.innerHTML = "Wind Direction : WSW";
                } else if (direction > 259 && direction <= 281) {
                  windDirection.innerHTML = "Wind Direction : W";
                } else if (direction > 281 && direction <= 304) {
                  windDirection.innerHTML = "Wind Direction : WNW";
                } else if (direction > 304 && direction <= 326) {
                  windDirection.innerHTML = "Wind Direction : NW";
                } else if (direction > 326 && direction <= 249) {
                  windDirection.innerHTML = "Wind Direction : NNW";
                } else if (direction > 249 && direction <= 11) {
                  windDirection.innerHTML = "Wind Direction : N";
                }

                for(let i = 0; i < Dates.length; i++) {
                  TotalDates[i].innerHTML = Dates[i];
                  TotalDatesHi[i].innerHTML = DayMax[i] + "&deg";
                  TotalDatesLo[i].innerHTML = DayMin[i] + "&deg";
                  TotalInfo[i].innerHTML = Descriptions[i];
                  TotalRain[i].innerHTML = Precipitations[i] + "%";
                }

                for(let i = 0; i < 23; i++) {
                  TotalTime[i].innerHTML = Hourss[i];
                  TotalTemp[i].innerHTML = HourlyTemperature[i] + "&degC";
                  TotalPreci[i].innerHTML = HourlyPrecipation[i] + "%";
                }

                TotalTime[23].innerHTML = Hourly0;
                TotalTemp[23].innerHTML = HourlyTemp0 + "&degC";
                TotalPreci[23].innerHTML = HourlyPreci0 + "%";
              
              })
              .catch(error => {
                console.error('Error:', error);
              });

            }

            function AirQualityInfo() {                    //Fetch Air Pollution Data
              const apiUrl = `https://api.weatherbit.io/v2.0/current/airquality?lat=${globalLatitude}&lon=${globalLongitude}&key=9aed60476c234f40a451296a85b9c6a8`;

              fetch(apiUrl)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  globalCO = Math.round(data.data[0].co);
                  globalO3 = data.data[0].o3;
                  globalPM10 = data.data[0].pm10;
                  globalPM25 = data.data[0].pm25; 
                  const AirQuality = data.data[0].aqi;
                  if (AirQuality >= 0 && AirQuality <= 19) {
                    aqi.innerHTML = "Air Quality : Excellent & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "cyan";
                    aqiInfo.innerHTML = "The air quality is ideal for most individuals, enjoy your normal outdoor activities.";
                   } else if (AirQuality >= 20 && AirQuality <= 50) {
                    aqi.innerHTML = "Air Quality : Fair & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "green";
                    aqiInfo.innerHTML = "Air quality is satisfactory, and air pollution poses little or no risk.";
                   } else if (AirQuality >= 51 && AirQuality <= 100) {
                    aqi.innerHTML = "Air Quality : Moderate & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "yellow";
                    aqiInfo.innerHTML = "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.";
                   } else if (AirQuality >= 101 && AirQuality <= 150) {
                    aqi.innerHTML = "Air Quality : Unhealthy for Sensitive Groups & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "orange";
                    aqiInfo.innerHTML = "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
                   } else if (AirQuality >= 151 && AirQuality <= 200) {
                    aqi.innerHTML = "Air Quality : Unhealthy & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "red";
                    aqiInfo.innerHTML = "Some members of the general public may experience health effects, members of sensitive groups may experience more serious health effects.";
                   } else if (AirQuality >= 201 && AirQuality <= 300) {
                    aqi.innerHTML = "Air Quality : Very Unhealthy & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "purple";
                    aqiInfo.innerHTML = "Health alert: The risk of health effects is increased for everyone.";
                   } else if (AirQuality >= 301) {
                    aqi.innerHTML = "Air Quality : Hazardous & AQI : " + AirQuality;
                    aqi.style.backgroundColor = "maroon";
                    aqiInfo.innerHTML = "Health warning of emergency conditions: Everyone is more likely to be affected.";
                   }
                  PollutionInfo();
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }

            function AirQualityInfo1() {                   //Fetch Air Pollution Pollutants Data 
              const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${globalLatitude}&longitude=${globalLongitude}&current=nitrogen_dioxide,sulphur_dioxide`;

              fetch(apiUrl)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  globalNO2 = Math.round(data.current.nitrogen_dioxide);
                  globalSO2 = Math.round(data.current.sulphur_dioxide);
                  PollutionInfo();
                })
                .catch(error => {
                  console.error('Error:', error);
                });
             }
            
             function MoonPhase() {                         //Fetch Moon Data
              const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${globalCity},${globalCountryId}?unitGroup=us&key=TGEMXMJDH3CFS6VZRKP3HP4ZZ&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`;

              fetch(apiUrl)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  const MoonRise = data.days[0].moonrise.substring(0,5);
                  const MoonSet = data.days[0].moonset.substring(0,5);
                  MoonRising.innerHTML = "Moonrise : " + data.days[0].moonrise.substring(0,5);
                  MoonSeting.innerHTML = "Moonset : " + data.days[0].moonset.substring(0,5);
                  const moonPhase = data.days[0].moonphase;
                  if (moonPhase == 0) {
                    PhaseInfo.innerHTML = "Moon Phase : New Moon";
                  } else if (moonPhase > 0 && moonPhase < 0.25) {
                    PhaseInfo.innerHTML = "Moon Phase : Waxing Crescent";
                  } else if (moonPhase == 0.25) {
                    PhaseInfo.innerHTML = "Moon Phase : First Quarter";
                  } else if (moonPhase > 0.25 && moonPhase < 0.5) {
                    PhaseInfo.innerHTML = "Moon Phase : Waxing Gibbous";
                  } else if (moonPhase == 0.5) {
                    PhaseInfo.innerHTML = "Moon Phase : Full Moon";
                  } else if (moonPhase > 0.5 && moonPhase < 0.75) {
                    PhaseInfo.innerHTML = "Moon Phase : Waning Gibbous";
                  } else if (moonPhase == 0.75) {
                    PhaseInfo.innerHTML = "Moon Phase : Last Quarter";
                  } else if (moonPhase > 0.75 && moonPhase <= 1) {
                    PhaseInfo.innerHTML = "Moon Phase : Waning Crescent";
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                });
             }

             function PollutionInfo() {
              aqiPara.innerHTML = "PM10 : " + globalPM10 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "PM2.5 : " + globalPM25 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "CO : " + globalCO + "&nbsp&nbsp&nbsp&nbsp" + 
              "O3 : " + globalO3 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "NO2 : " + globalNO2 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "SO2 : " + globalSO2;
             }
             
             function CurrentTime() {                       //Fetch Current Date and Time
              const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=4f23a4b6279643c1a8e4b22f3685d95c&lat=${globalLatitude}&long=${globalLongitude}`

              fetch(apiUrl)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  const time = (data.time_24.substring(0,5));
                  const day = (data.date_time_wti.substring(0,11).toUpperCase());
                  PresentTime.innerHTML = time + " & " + day;
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }
    