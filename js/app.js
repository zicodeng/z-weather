class App extends React.Component {
    constructor(props) {
        super(props);

        // Create a state to store weather info
        this.state = {
            savedLocationList: [],
            bgWeather: "bg",
        };
    }

    render() {
        return (
            <div className={this.state.bgWeather}>
                <div className="container">
                    <h1>Z-WEATHER</h1>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <SearchWeather getWeatherInfo={(weatherInfo) => this.getWeatherInfo(weatherInfo)} bgWeather={(weather) => this.bgWeather(weather)} />
                            <DisplayWeather
                                location={this.state.location}
                                longDescription={this.state.longDescription}
                                shortDescription={this.state.shortDescription}
                                iconURL={this.state.iconURL}
                                temperature={this.state.temperature}
                                isSearch={this.state.isSearch}
                            />
                            {
                                this.state.location !== undefined ? (
                                    <SaveWeather
                                        location={this.state.location}
                                        hasError={this.state.hasError}
                                        hasDuplicate={this.state.hasDuplicate}
                                        isSearch={this.state.isSearch}
                                        saveWeather={(location) => this.saveWeather(location)}
                                    />
                                ) : null
                            }
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <SavedList 
                            isSearch={this.state.isSearch}
                            hasError={this.state.hasError} 
                            savedLocationList={this.state.savedLocationList} 
                            updateSavedLocationList={(savedLocationList) => this.updateSavedLocationList(savedLocationList)} 
                            getSavedWeatherInfo={(savedWeatherInfo) => this.getSavedWeatherInfo(savedWeatherInfo)} 
                            bgWeather={(weather) => this.bgWeather(weather)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    bgWeather(weather) {
        if(weather.includes("Rain")) {
            this.setState({
                bgWeather: "bg bg-rain"
            });
        } else if(weather.includes("Clear")) {
            this.setState({
                bgWeather: "bg bg-clear"
            });
        } else if(weather.includes("Clouds")) {
            this.setState({
                bgWeather: "bg bg-clouds"
            });
        } else if(weather.includes("Drizzle")) {
            this.setState({
                bgWeather: "bg bg-drizzle"
            });
        } else if(weather.includes("Mist")) {
            this.setState({
                bgWeather: "bg bg-mist"
            });
        } else if(weather.includes("Haze")) {
            this.setState({
                bgWeather: "bg bg-haze"
            });
        } else if(weather.includes("Snow")) {
            this.setState({
                bgWeather: "bg bg-snow"
            });
        } else {
            this.setState({
                bgWeather: "bg"
            });
        }
    }

    
    // Update savedLocationList
    updateSavedLocationList(savedLocationList) {
        this.setState({
            savedLocationList: savedLocationList
        });
    }

    // Gets saved location info and set state, so the page will be re-rendered 
    getSavedWeatherInfo(savedWeatherInfo) {
        this.setState({
            location: savedWeatherInfo.location,
            longDescription: savedWeatherInfo.longDescription,
            shortDescription: savedWeatherInfo.shortDescription,
            iconURL: savedWeatherInfo.iconURL,
            temperature: savedWeatherInfo.temperature,
            hasError: savedWeatherInfo.hasError,
            isSearch: savedWeatherInfo.isSearch
        });
    }

    // Get weather info from search and store them in app state
    getWeatherInfo(weatherInfo) {
        this.setState({
            location: weatherInfo.location,
            longDescription: weatherInfo.longDescription,
            shortDescription: weatherInfo.shortDescription,
            iconURL: weatherInfo.iconURL,
            temperature: weatherInfo.temperature,
            hasError: weatherInfo.hasError,
            isSearch: weatherInfo.isSearch
        });
    }

    saveWeather(location) {
        var savedLocationList = this.state.savedLocationList;
        
        // When user clicks the save button, change isSearch to false
        this.setState({
            isSearch: false
        });

        // if indexOf returns -1, it means it is not saved in the list, so we need add it to the saved list
        if(savedLocationList.indexOf(location) < 0) {
            this.setState({
                hasDuplicate: false
            })

            // Add a new location to savedLocationList
            savedLocationList.push(location);

            // When save button is clicked, the savedLocationList will be updated
            this.setState({
                savedLocationList: savedLocationList
            });

            // Save to local storage
            // Return a string representation of the array (encode)
            var savedLocationListJson = JSON.stringify(savedLocationList);
            localStorage.setItem("saved-location-list", savedLocationListJson);
        } else {
            this.setState({
                hasDuplicate: true
            });
        }
    }
}

// Render elements to browser DOM, and display it on screen
ReactDOM.render(<App />, document.getElementById("app"));
