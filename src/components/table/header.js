import React from 'react';

export class Header extends React.Component {

  constructor(props){

    super(props);

    let sortDirections = [];

    // initialise sort directions
    for (let i = 0; i < this.props.data.length; i++)
      sortDirections[i] = '';

    this.state = {

      sortDirections: sortDirections

    }
  }

  sort(index, cell){

    if (!this.props.data[index].sort)
      return false;

    let state = Object.assign({}, this.state);
    let direction = state.sortDirections[index];

    // update this column
    if (direction === 'asc') direction = 'desc';
    else if (direction === 'desc') direction = 'asc';
    else direction = 'asc';

    // reset sorting on all columns
    for (let i = 0; i < this.props.data.length; i++)
      state.sortDirections[i] = '';

    state.sortDirections[index] = direction;
    this.props.callback(cell, direction);
    this.setState(state);

  }

  render(){

    let cols = this.props.data.length-1;

    // add the actions
    if (this.props.actions){
      if (this.props.data[cols]){
        if (this.props.data[cols].name !== 'actions'){
          this.props.data.push({ name: 'actions', title: 'Actions', sort: false });
        }
      }
    }

    // show the ids?
    if (this.props.showIds){
      if (this.props.data[0]){
        if (this.props.data[0].name !== 'id'){
          this.props.data.unshift({ name: 'id', title: 'Id', sort: true });
        }
      }
    }

    return(

      <thead>
      <tr>
        { this.props.data.map((cell, index) => {

          let cssClass = '';
          if (cell.name) cssClass = cell.name;
          if (cell.sort) cssClass += ' sort ' + this.state.sortDirections[index];

          return (
            <th
              key={ index }
              className={ cssClass }
              onClick={ event => this.sort(index, cell.name) }>
              { cell.title }
            </th>
          );
        })}
      </tr>
      </thead>
    );
  }
}
