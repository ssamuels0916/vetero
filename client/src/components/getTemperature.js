import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import '../App.css';


const getTemperature = gql`
query temperature($city: String!){
    temperature(city: $city) {
      name,
      id,
      cod,
      weather {
        id,
        main,
        description
      }
      main {
        temp,
        humidity,
        temp_min,
        temp_max
      }
    }
  }
`
class GetTemperature extends Component {
  state = {
    city: '',
  }

  // functions
  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state.city);
  }

  handleChange = (e) => {
    let city = e.target.value;
    this.setState({
      city: city
    })
  }
  clearForm = () => {
    document.getElementById("get-temperature").reset();
  }
  render() {
    return (
      <div id="temperature">
        <form id="get-temperature" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label>Enter a City:</label>
            <input type="text"
            placeholder="Enter a city..."
            onBlur={this.handleChange}/>
          </div>
          <div className="buttons">
            <input className="button" type="submit" value="Submit" />
            <button className="button" onClick={this.clearForm}>Clear</button>
          </div>
        </form>
        <div>
          <Query query={getTemperature} variables={{city: this.state.city}}>
            {({ data, loading, error, refetch, networkStatus }) => {
                if (loading || error) return <div></div>;
                if (loading) return 'Loading';
                if (error) return console.log(`Error!: ${error}`);
              return (
                <div >
                  <div className="weather">
                    <h2>{data.temperature.name}</h2>
                    {data.temperature.weather.map(w => <p key={w.id}>{w.description}</p>)}
                    <p className="celcius">high: {Math.floor(data.temperature.main.temp_min)}&#8451;</p>
                    <p className="celcius">low: {Math.floor(data.temperature.main.temp_max)}&#8451;</p>
                  </div>
                </div>
              )
            }}
          </Query>
        </div>
      </div>
      )
    }
  }
export default graphql(getTemperature)(GetTemperature)
