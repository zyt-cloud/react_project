import React, { Component } from 'react';



export default class PreVersion extends Component {
    componentDidMount() {
      console.log(this.props)
      const preWrapEl = this.preWrapEl = document.getElementById('pre-version')

      preWrapEl.style.display = 'block';
      preWrapEl.nextSibling.style.visibility = 'hidden';
    }
    componentWillUnmount() {
      this.preWrapEl.style.display = 'none';
      this.preWrapEl.nextSibling.style.visibility = 'visible';
    }
    render() {

        return (
            <div></div>
        );
    }
}

