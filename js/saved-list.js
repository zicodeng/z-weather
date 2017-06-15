class SavedList extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {};
    }

    render() {
        return (
            <div className={this.props.isSearch !== undefined || this.props.hasError ? "saved-list-container" : "hidden"}>
                <h2>My Locations</h2>
                {
                    this.props.savedLocationList !== null ? (
                        <ul className="saved-list">
                            {this.props.savedLocationList.map((item, uid) => {
                                return (
                                    <li key={uid}>
                                        <span className="saved-weather" type="click" onClick={(e) => this.handleClickSavedWeather(uid)}>{item}</span>
                                        <span className="delete-weather" type="click" onClick={(e) => this.handleClickDelete(uid)}>Delete</span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null
                }
            </div>
        );
    }

    // When user clicks delete, it updates the savedLocationList in app.js and local storage
    handleClickDelete(uid) {
        console.log(this);
        var newList = this.props.savedLocationList.filter(function(location, index) {
            return index !== uid;
        });

        // Calls the function updateSavedLocationList created in app.js and pass in the new list
        this.props.updateSavedLocationList(newList);

        // Update local storage
        // Return a string representation of the array (encode)
        var newListJson = JSON.stringify(newList);
        localStorage.setItem("saved-location-list", newListJson);
    }

    // When user clicks previously saved weather, it searches weather again based on the clicked location
    handleClickSavedWeather(uid) {

        // Get saved location
        var location = this.props.savedLocationList[uid];
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + API_KEY;

        fetch(url)
        .then((response) => {
            this.setState({
                alert: false
            });
            return response.json();
        })
        .then((json) => {
            var weatherInfo = {
                    location: json.name,
                    longDescription: " (" + json.weather[0].description + ")",
                    shortDescription: json.weather[0].main,
                    iconURL: "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png",
                    temperature: "Temperature: " + Math.round(json.main.temp * 9 / 5 - 459.67) + " F",
                    hasError: false,
                    isSearch: true
                };
            this.props.getSavedWeatherInfo(weatherInfo);
            this.props.bgWeather(weatherInfo.shortDescription);
        })
        .catch((error) => {
            window.alert(error.message);
        });
    }
}
