import React from 'react';

export class Body extends React.Component {

  render(){

    if (this.props.data){
      if (this.props.data.length){
        return (

          <tbody>
          { this.props.data.map((row, index) => {

            return (
              <Row
                key={ index }
                data={ row }
                badge={ this.props.badge }
                showIds={ this.props.showIds }
                actions={ this.props.actions }
              />
            );

          })}
          </tbody>
        );
      }
    }

    return (
      <tbody>
        <tr>
          <td colSpan='10'>No results found</td>
        </tr>
      </tbody>
    );
  }
}

export class Row extends React.Component {

  render(){

    // inject the actions
    if (this.props.actions)
      this.props.data.actions = this.props.actions;

    return(
      <tr data-id={ this.props.data.id }>
        { Object.keys(this.props.data).map((cell, index) => {

          const value = this.props.data[cell];

          // render the ids?
          if (cell === 'id' && !this.props.showIds)
            return false;

          // does this cell have a badge?
          if (this.props.badge){
            if (cell === this.props.badge.col){

              return (
                <td key={ index }>
                <span className={ this.props.badge.color ? 'badge ' + this.props.badge.color : 'badge' }>
                { value }
                </span>
              </td>
              );

            }
          }

          // create the actions
          if (cell === 'actions'){

            let buttons = [];

            if (this.props.data.id){
              value.props.children.map((action, index) => {

                let button =  React.cloneElement(action, { params: this.props.data, key: index });
                buttons.push(button);
                return false;

              });

              return <td key={ index } className='actions'>{ buttons }</td>

            }
            else {
              return <td key={ index } className='actions'>{ value }</td>
            }
          }

          // standard cell
          return <td key={ index }>{ value }</td>

        })}
      </tr>
    );
  }
}
