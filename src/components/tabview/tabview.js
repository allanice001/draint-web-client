/***
 *
 *   TAB VIEW
 *   Create a tabbed view by wrapping each view element in a <TabView> component.
 *
 *   PROPS
 *   name: specify a name if you want to store the active tab state
 *   labels: array of strings for the tab labels
 *
 **********/

import './tabview.scss';

import React from 'react';

export class TabView extends React.Component {
  constructor(props) {
    super(props);

    // initialise the states
    let activeStates = [];
    for (let i = 0; i < this.props.children.length; i++)
      activeStates.push(false);

    // is there a view saved in storage?
    const savedViewIndex = localStorage.getItem(this.props.name + 'Tabs');

    // loaded the saved view, or the initial view
    // first view as default
    if (savedViewIndex) {
      activeStates[savedViewIndex] = true;
    } else if (this.props.initialView) {
      activeStates[this.props.initialView] = true;
    } else {
      activeStates[0] = true;
    }

    this.state = {
      activeStates: activeStates,
      views: [],
    };

    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(index) {
    let state = Object.assign({}, this.state);
    for (let i = 0; i < state.activeStates.length; i++)
      state.activeStates[i] = false;

    state.activeStates[index] = true;
    this.setState(state);

    // save the tab
    if (this.props.name) localStorage.setItem(this.props.name + 'Tabs', index);
  }

  render() {
    return (
      // render the tabs then the child views
      <div className="tabView">
        <nav className="tabs">
          {this.props.labels &&
            this.props.labels.map((label, index) => {
              return (
                <Tab
                  key={label}
                  active={this.state.activeStates[index]}
                  click={event => this.switchTab(index)}
                >
                  {label}
                </Tab>
              );
            })}
        </nav>

        {this.props.children.map((view, index) => {
          let visible = 'hide';
          if (this.state.activeStates[index]) visible = 'show';
          let newView = React.cloneElement(view, {
            className: visible,
            key: index,
          });
          return newView;
        })}
      </div>
    );
  }
}

class Tab extends React.Component {
  render() {
    let cssClass = 'inactive';
    if (this.props.active) cssClass = 'active';

    return (
      <button className={cssClass} onClick={this.props.click}>
        {this.props.children}
      </button>
    );
  }
}
