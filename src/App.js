import React from 'react';
import './App.css';
import myTextFile from "./text.txt"
import marked from 'marked'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch(myTextFile).then(response => response.text())
                     .then(data => this.setState({
                       text: data
                     }))
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  getMarkdownText() {
    //const marked = require("marked");
    marked.setOptions({
      breaks: true
    });
    var rawMarkup = marked(this.state.text, {sanitize: true});
    return { __html: rawMarkup };
  }

  render() {
  return (
    <div className="App">
      <div className="editor-header"><h3>Editor</h3></div>
      <textarea id="editor" value={this.state.text} onChange={this.handleChange}></textarea>
      <div className="preview-header"><h3>Preview</h3></div>
      <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()}></div>
    </div>
  );
  }
}

export default App;
