window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/cafc4057aa57cceb10c0e1a67513e244/${lat},${long}`;
           
            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                const {temperature, summary, icon} = data.currently;
                temperatureDescription.textContent = summary;
                temperatureDegree.textContent =  Math.floor((temperature-32)*(5/9));
                locationTimezone.textContent = data.timezone;
                // set icon
                setIcons(icon, document.querySelector('.sky-icon'));
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});