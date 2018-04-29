import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'

function Words(props) {
  const box = document.getElementById('form_result');
  if(box && props.letters.length > 0) {
    const spread_letters = props.letters.map((letter, index) => {
      const styles = {
        top: `${Math.abs(Math.random() * box.clientHeight - 100) + 50}px`,
        left: `${Math.abs(Math.random() * box.clientWidth - 400) + 200}px`,
        fontSize: `${Math.random() * 15.5 + 1.0}rem`
      };
      return <p key={ `${letter}_${index}` } style={ styles }>{ letter }</p>
    });
    return (
      <div>{ spread_letters }</div>
    );
  } else {
    return null;
  }
};

class EssayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      letters: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ letters: this.state.value.split("") });
  }

  handleClear(event) {
    this.setState({ letters: [] });
  }

  handleGenerator(event) {
    const g = generator();
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
  }


  render() {
    return(
      <div className="grid-component">
        <div id="send_form">
          <form>
            <label>
              <textarea value={ this.state.value } onChange={ this.handleChange }/>
            </label>
            <button onClick={ this.handleSubmit } type="button" value="ぶっこむ">ぶっこむ</button>
            <button onClick={ this.handleClear } type="button" value="クリア">クリア</button>
          </form>
        </div>
        <div id="form_result">
          <Words letters={ this.state.letters }/>
        </div>
      </div>
    )
  }
}

function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

ReactDOM.render(
  <EssayForm />,
  document.getElementById('grid-root')
)
