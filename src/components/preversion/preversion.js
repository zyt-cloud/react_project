import React, { Component } from 'react';

import { setRefresh, removeRefresh } from 'UTILS/utils';

export default class PreVersion extends Component {
    componentDidMount() {
      const { location, addTab } = this.props
      const preWrapEl = this.preWrapEl = document.getElementById('pre-version')

      preWrapEl.style.display = 'block';
      preWrapEl.nextSibling.style.visibility = 'hidden';

      this.prePath = location.pathname;
      this.sendMessage(preWrapEl.children[0].contentWindow, 'openTab', location.pathname)

      preWrapEl.children[0].onload = () => {
        // if(location.pathname === this.prePath) return
        this.sendMessage(preWrapEl.children[0].contentWindow, 'openTab', location.pathname)
      }


      setRefresh(() => {
        this.sendMessage(preWrapEl.children[0].contentWindow, 'refreshTab')
      });

      if(addTab && location.state){
        addTab({
          isActive: true,
          name: location.state.name,
          path: location.state.path,
          url: location.pathname
        })
      }
    }

    sendMessage(win, type, path){
      win.postMessage(JSON.stringify({
          type: type,
          content: path
      }), '*');
    }
    componentWillUnmount() {
      removeRefresh();
      this.preWrapEl.style.display = 'none';
      this.preWrapEl.nextSibling.style.visibility = 'visible';
    }
    render() {

        return (
            <div></div>
        );
    }
}

