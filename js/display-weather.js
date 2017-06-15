class DisplayWeather extends React.Component {
    render() {
        return (
            <div className={this.props.isSearch !== undefined ? "display-weather-container" : "hidden"}>
                <div className="location-weather">
                    <h2>{this.props.location}</h2>
                    <img src={this.props.iconURL} />
                </div>
                <p>{this.props.temperature}</p>
                <p>{this.props.shortDescription} {this.props.longDescription}</p>
            </div>
        );
    }
}
