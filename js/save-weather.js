class SaveWeather extends React.Component {
    render() {
        return (
            <div className="save-weather">
                <button type="submit" className={this.props.hasError ? "hidden" : "btn btn-success"} onClick={(e) => this.handleClickSave(e)}>Save</button>
                <div className={(this.props.hasDuplicate && this.props.isSearch === false) ? "alert alert-danger" : "hidden"}>You have already saved this location to your list</div>
            </div>
        );
    }

    // Links to saveWeather function in app.js
    handleClickSave(e) {
        this.props.saveWeather(this.props.location);
    }
}