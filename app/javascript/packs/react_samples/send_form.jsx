import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class EssayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  spreadWordsInBox(words) {
    return new Promise((resolve, reject) => {
      const box = document.getElementById('form_result');
      const letters = words.split("");
      let p = document.createElement('p');
      letters.map((letter) => {
        let p_cloned = p.cloneNode();
        p_cloned.innerText = letter;
        p_cloned.style.top = `${Math.random() * box.clientHeight}px`;
        p_cloned.style.left = `${Math.random() * box.clientWidth}px`;
        box.appendChild(p_cloned);
      });
      resolve();
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.spreadWordsInBox(this.state.value).then(() => {
      console.log("letters are spread.")
    });
    event.preventDefault();
  }

  handleClear(event) {
    const box = document.getElementById('form_result');
    for(let i = box.children.length - 1; i >=0; i--) {
      box.removeChild(box.childNodes[i]);
    }
  }

  render() {
    return(
      <form>
        <label>
          <textarea value={ this.state.value } onChange={ this.handleChange }/>
        </label>
        <button onClick={ this.handleSubmit } type="button" value="ぶっこむ">ぶっこむ</button>
        <button onClick={ this.handleClear } type="button" value="クリア">クリア</button>
      </form>
    )
  }
}

ReactDOM.render(
  <EssayForm />,
  document.getElementById('send_form')
)
