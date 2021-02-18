import React, { Component } from 'react';

import './style.css';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

class ChessBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstQueenPos: '',
			secondQueenPos: '',
		};
	}

	tilesClickHandler = (event) => {
		const tilePosition = event.target.getAttribute('tilepos');
		const firstQueenPosition = this.state.firstQueenPos;
		const greenCircle = '<i class="fa fa-circle green-circle" aria-hidden="true"></i>';
		const crossIcom = '<i class="fa fa-times cross-icon" aria-hidden="true"></i>';
		if (firstQueenPosition === '') {
			event.target.innerHTML += greenCircle;
			this.setState({ firstQueenPos: tilePosition });
		} else {
			this.setState({ secondQueenPos: tilePosition });
			if (
				tilePosition[0] === firstQueenPosition[0] ||
				tilePosition[1] === firstQueenPosition[1] ||
				Math.abs(horizontalAxis.indexOf(tilePosition[0]) - horizontalAxis.indexOf(firstQueenPosition[0])) ===
					Math.abs(verticalAxis.indexOf(tilePosition[1]) - verticalAxis.indexOf(firstQueenPosition[1]))
			) {
				const temp = event.target;
				temp.innerHTML += crossIcom;
				setTimeout(() => {
					temp.innerText = '';
				}, 2000);
			} else {
				event.target.innerHTML += greenCircle;
			}
		}
	};

	render() {
		let board = [];
		for (let i = verticalAxis.length - 1; i >= 0; i--) {
			for (let j = 0; j < horizontalAxis.length; j++) {
				(i + j) % 2 === 0
					? board.push(
							<div
								className="tile white-tile"
								tilepos={horizontalAxis[j] + verticalAxis[i]}
								key={horizontalAxis[j] + verticalAxis[i]}
								onClick={(event) => this.tilesClickHandler(event)}
							></div>
					  )
					: board.push(
							<div
								className="tile black-tile"
								tilepos={horizontalAxis[j] + verticalAxis[i]}
								key={horizontalAxis[j] + verticalAxis[i]}
								onClick={(event) => this.tilesClickHandler(event)}
							></div>
					  );
			}
		}
		return <div className="chessboard">{board}</div>;
	}
}

export default ChessBoard;
