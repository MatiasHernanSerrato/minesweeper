import React from 'react';
import { startCase } from 'lodash';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

class LevelSelector extends React.Component {

	constructor (props){
		super(props);
		
		this.state = {
			showcustom: false,
			setting: {"mines": 30, "width": 50, "height": 20}
		}

		this.doSelection = this.doSelection.bind(this);
		this.determineItemClassName = this.determineItemClassName.bind(this);
		this.onSetting = this.onSetting.bind(this);
	}

	determineItemClassName(choice) {
		return classNames('nav-item', { active: choice === this.props.selectedChoice });
	}

	doSelection(dificulty){
		if (dificulty === 'customize') {
			this.setState({showcustom: true});
			this.props.innitCustomGameCallback(dificulty, this.state.setting);
		} else {
			this.setState({showcustom: false});
			this.props.innitGameCallback(dificulty);
		}
	}

	onSetting() {
		let setting = {};
		setting.width = document.getElementById("n").value;
		setting.height = document.getElementById("m").value;
		setting.mines = document.getElementById("x").value;
		this.setState({showcustom: true, setting:setting});
		this.props.innitCustomGameCallback('customize', setting);
	}

	render() {
		const { choices } = this.props;
		return (
			<div className="bg-dark">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-item">
					<h2 className="nav-log">Minesweeper</h2>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav mr-auto">
							{choices.map(choice => (
								<li role="presentation" className={this.determineItemClassName(choice)} 
									onClick={() => this.doSelection(choice)} key={choice}>
									<a className="nav-link" href="#">{startCase(choice)}</a>
								</li>
							))}
						</ul>
						{this.state.showcustom && <div className="nav-form">
							N : 
							<input id="n" type="text" className="ml-1 mr-2 nav-input" defaultValue={this.state.setting.width}/>
							M :
							<input id="m" type="text" className="ml-1 mr-2 nav-input" defaultValue={this.state.setting.height}/>
							X :
							<input id="x" type="text" className="ml-1 mr-2 nav-input" defaultValue={this.state.setting.mines}/>
							<Button onClick={this.onSetting}>Setting</Button>
						</div>}
					</div>
				</nav>
			</div>
			);
	}
}

export default LevelSelector;