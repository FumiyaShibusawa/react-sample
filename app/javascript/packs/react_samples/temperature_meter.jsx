import React, { Component } from 'react'
import ReactDOM from 'react-dom'


const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return ( <p>The water would boil.</p> );
  } else {
    return ( <p>The water would not boil.</p> );
  }
}

function toCelcius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in { scaleNames[scale] }:</legend>
        <input value={ temperature }
               onChange={ this.handleChange } />
      </fieldset>
    )
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleCelciusChange = this.handleCelciusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: '',
      scale: 'c'
    };
  }

  handleCelciusChange(temperature) {
    this.setState({ temperature: temperature, scale: 'c' });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ temperature: temperature, scale: 'f' });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = (scale == 'f') ? tryConvert(temperature, toCelcius) : temperature;
    const fahrenheit = (scale == 'c') ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale='c'
          temperature={ celsius }
          onTemperatureChange={ this.handleCelciusChange } />
        <TemperatureInput
          scale='f'
          temperature={ fahrenheit }
          onTemperatureChange={ this.handleFahrenheitChange } />
        <BoilingVerdict celsius={ parseFloat(celsius) } />
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('temperature-root')
)
