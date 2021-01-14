import React from 'react';
//import Oc from './../crypt/obeecrypt.js';

class ScoreBoard extends React.Component {
	/**
		props:
			scores
	*/

	constructor(props){
		super(props);
	}

	render(){
		let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
		return (
			<div className="row-minesweeper-score-frame">
				<h4>Score Record</h4>
				<table
                  id="user_table"
                  className="table table-borderless table-dark"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Difficulty</th>
                      <th scope="col">Total Time Spent</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.start}</td>
                        <td>{item.end}</td>
                        <td>{item.diff}</td>
                        <td>{item.total}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
			</div>
		);
	}
}

export default ScoreBoard;