import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import { hot } from 'react-hot-loader';
import Sidebar from '../Sidebar/Sidear'
import NewPost from '../NewPost/NewPost'
import EditPost from '../EditPost/EditPost'
import Comments from '../Comments/Comments'
import NewPostContainer from '../NewPost/NewPostContainer'
import Config from '../Config/Config'

class App extends Component {
	state = {
		categories: [],
		comments: [],
		lastAccess: new Date('2018-07-29T18:04:21.050Z'),
		admin: {
			name: 'Mati',
			avatar: '/images/avatar.jpg'
		}
	}

	componentDidMount = () => {
		fetch('/api/posts?categories=true')
			.then(res => res.json())
			.then(res => {
				const categories = []
				res.forEach(cat => categories.push(...cat.categories))
				this.setState({categories: [...new Set(categories)]})
			})
			.catch(console.error)
	}

	handleComments = () => {
		fetch('/api/comments')
			.then(res => res.json())
			.then(comments => {
				comments.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
				const dict = {}
				comments.forEach(comment => dict[comment._id] = comment)
				this.setState({comments: dict})
			})
			.catch(console.error)
	}

	handleState = (newState) => {
		this.setState(newState)
	}

	handleNewCategory = (category) => {
		const categories = [...this.state.categories, category]
		this.setState({categories})
	}

  render() {
		const { categories, comments, lastAccess, admin } = this.state
    return (
      <div className="admin">
				<Route path={`/`} component={Sidebar} />
				<Route path={`/new-post`} render={(props) => <NewPostContainer {...props} categories={categories} handleNewCategory={this.handleNewCategory} />} />
				<Route path={`/edit-post`} render={(props) => <EditPost {...props} categories={categories}/>} />
				<Route path={`/comments`} render={(props) =>
					<Comments {...props}
										handleState={this.handleState}
										admin={admin}
										lastAccess={lastAccess}
										comments={comments}
										handleComments={this.handleComments}
					/>}
				/>
				<Route path={`/config`} render={(props) => <Config {...props} admin={admin} lastAccess={lastAccess} />} />
      </div>
    );
  }
}

export default hot(module)(App);
