import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Footer(props) {
  return (
    <div>
      <a href="/" className="goBack">トップに戻る</a>
    </div>
  )
}

ReactDOM.render(
  <Footer />,
  document.getElementById('footer-root')
)
