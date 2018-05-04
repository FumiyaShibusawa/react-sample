import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const status = ["draft", "open", "members_only"];

class SearchBar extends Component {
  render() {
    return(
      <div className="form-cont">
        <div className="form-input">
          <input type="text" name="q[id_eq]" placeholder="id" className="query-params" onChange={ this.props.onChange } />
        </div>
        <div className="form-input">
          <input type="text" name="q[title_cont]" placeholder="title" className="query-params" onChange={ this.props.onChange } />
        </div>
        <div className="form-input">
          <input type="text" name="q[desc_cont]" placeholder="desc" className="query-params" onChange={ this.props.onChange } />
        </div>
        <div className="form-input">
          <select type="text" name="q[status_eq]" placeholder="status" className="query-params" onChange={ this.props.onChange }>
            <option value="">status</option>
            {status.map((type, i) => (
              <option key={ `${type}_${i}` } value={ type }>{ type }</option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <button type="button" name="article_status" onClick={ this.props.onClick }>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    )
  }
}

class ArticleTable extends Component {
  render() {
    const rows = this.props.rows;
    return(
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={ `${row}_${i}` }>
              <td>{ row["id"] }</td>
              <td>{ row["title"] }</td>
              <td>{ row["content"].slice(0, 70) }</td>
              <td>{ row["status"] }</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

// 型チェック
ArticleTable.propTypes = {
  rows: (props, propName, ComponentName) => {
    if (Array.isArray(props[propName])) {
      return console.log(`Typechecking of prop: ${propName} in Component: ${ComponentName} is passed.`);
    } else {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      )
    }
  }
}


class ArticleTableWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      rows: [],
      error: null
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch('/articles.json')
    .then((response) => response.json())
    .then(
      (result) => {
        this.setState({ rows: result })
      },
      (error) => {
        this.setState({ error: error })
      }
    );
  }

  handleSearch(event) {
    const form_inputs = document.getElementsByClassName("query-params");
    let params = "";
    for (let i = 0; i < form_inputs.length; i++) {
      params += form_inputs[i].name + "=" + form_inputs[i].value + "&";
    }
    params = encodeURI(params); // GETパラメータに乗せるためにエンコード
    fetch('/articles.json?' + params + "q[page]=1")
    .then((response) => response.json())
    .then(
      (result) => {
        this.setState({ rows: result })
        this.setState({ query: params })
      },
      (error) => {
        this.setState({ error: error })
      }
    );
  }

  render() {
    return(
      <div>
        <SearchBar query= { this.state.query } onClick={ this.handleSearch } onChange={ this.handleSearch }/>
        <ArticleTable rows= { this.state.rows }/>
      </div>
    )
  }
}

ReactDOM.render(
  <ArticleTableWrapper />,
  document.getElementById('article-table-root')
)
