import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'

function Words(props) {
  const words = props.letters.map((letter, i) => {
    return <p style={ props.styles[i] } >{ letter }</p>
  })
  return ( <div>{ words }</div> )
};

class EssayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      letters: [],
      styles: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const letters = this.state.value.split("");
    const box = document.getElementById('form_result');
    let styles = [];
    for(let i = 0; i < letters.length; i++) {
      styles.push({
        top: `${Math.abs(Math.random() * box.clientHeight - 100) + 50}px`,
        left: `${Math.abs(Math.random() * box.clientWidth - 400) + 200}px`,
        fontSize: `${Math.random() * 15.5 + 1.0}rem`
      });
    };
    this.setState({ letters: letters });
    this.setState({ styles: styles });
  }

  handleClear(event) {
    this.setState({ letters: [] });
    this.setState({ styles: [] });
  }

  // handleGenerator(event) {
  //   const g = generator();
  //   console.log(g.next());
  //   console.log(g.next());
  //   console.log(g.next());
  // }


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
          <Words styles={ this.state.styles } letters={ this.state.letters }/>
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
