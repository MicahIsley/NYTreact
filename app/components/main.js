// Include React
var React = require("react");

// Here we include all of the sub-components
var Article = require("./children/Article");
var Form = require("./children/Form");
// Helper for making AJAX requests to our API
var helpers = require("./utils/helper");

var Main = React.createClass({
	getInitialState: function() {
		return { searchTerm: "", results: "", article: []};
	},

	componentDidMount: function() {
		helpers.getArticles().then(function(response) {
			console.log(response);
			if (response !== this.state.article) {
				console.log("Aricle", response.data);
				this.setState({ article: response.data});
			}
		}.bind(this));
	},

	componentDidUpdate: function() {
		helpers.runQuery(this.state.searchTerm).then(function(data) {
			if (data !== this.state.results) {
				console.log("Search", data);
				this.setState({ results: data });

				helpers.postHistory(this.state.searchTerm).then(function() {
					console.log("Updated!");

					helpers.getHistory().then(function(response) {
						console.log("Current Articles", response.data);

						console.log("Aricles", response.data);

						this.setState({ article: response.data});
					}.bind(this));
				}.bind(this));
			}
		}.bind(this));
	},

	setTerm: function(term) {
		this.setState({ searchTerm: term});
	},

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="jumbotron">
						<h2 className="text-center">NYT Article Finder!</h2>
						<p className="text-center">
							<em>Enter the subject you would like to search for.</em>
						</p>
					</div>
					
					<div className="col-md-6">
						<Form setTerm={this.setTerm} />
					</div>
					
					<div className="col-md-6">
						
					</div>
				</div>

				<div className="row">
					<Article article={this.state.article} />
				</div>
			</div>
		);
	}
});

module.exports = Main;