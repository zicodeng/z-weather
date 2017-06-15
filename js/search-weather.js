// My API key for openweathermap.org
// Global var
var API_KEY = '5efee3c386f4345ea93be1b768f43f78';

class SearchWeather extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            alert: false,
            alertText: ""
        };
    }

    componentDidMount() {
        // When page loads, auto-focus input, get user ready to type
        ReactDOM.findDOMNode(this.refs.query).focus();
    }

    render() {
        return (
        <div className="search-weather">
            <form className="search-form" role="search" onSubmit={(e) => this.handleSubmitSearch(e)}>
                <div className="input-group add-on">
                    <input type="text" ref="query" className="form-control input-group" placeholder="What is the weather like in ..." />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-default btn-md"><i className="glyphicon glyphicon-search"></i></button>
                    </span>
                </div>
            </form>
            <div className={this.state.alert ? "alert alert-danger" : "hidden"}>{this.state.alertText}</div>
        </div>
        )
    }

    // Search function
    handleSubmitSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;
        var url = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + queryValue + "&appid=" + API_KEY;
        var weatherInfo = {};

        // fetch is a new built-in function for browser
        // It fetches provided url and turns it to json
        fetch(url)
        .then((response) => {
            this.setState({
                alert: false
            });
            return response.json();
        })
        .then((json) => {
            weatherInfo = {
                    location: json.name,
                    longDescription: " (" + json.weather[0].description + ")",
                    shortDescription: json.weather[0].main,
                    iconURL: "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png",
                    temperature: "Temperature: " + Math.round(json.main.temp * 9 / 5 - 459.67) + " F",
                    hasError: false,
                    isSearch: true
                };
            this.props.getWeatherInfo(weatherInfo);
            this.props.bgWeather(weatherInfo.shortDescription);
        })
        .catch((error) => {
            weatherInfo = {
                hasError: true
            };
            this.props.getWeatherInfo(weatherInfo);
            this.setState({
                alert: true,
                alertText: "Error: Not found city"
            });
        });
    }
}
