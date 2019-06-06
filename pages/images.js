import React from 'react';
import Link from 'next/link';
import Services from '../utils/services.js';
import { withRouter } from 'next/router';

class Images extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      image: {},
      user: {}
    }
  }

  static getInitialProps({query}) {
    return {query}
  }

	componentWillMount(){
		Services.getImages()
		.then((response) => {
	        const images = response.data.results;
	        this.setState({
	        	image : images[this.props.query.id],
	        	user: images[this.props.query.id].user
	        });
      	})
      	.catch((err) => console.error(err));
  	}

	render(){
		const img = this.state.image;
		const user = this.state.user;
		return(
			<div className="image-wrapper"> 
				<link href="./static/index.css" rel="stylesheet" />
				<div className="image-container">
					<img alt="nope" className="img" src={img.links ? img.links.download : ""} />
				</div>
				<div className="image-description">
					<h3>Description: {img.alt_description}</h3>
					<h3>Created at: {img.created_at}</h3>
					<h3>Likes: {img.likes}</h3>
					<h3>User name: {user.name}</h3>
					<h3>User bio: {img.bio}</h3>
					<a href="/">Back</a>
				</div>
			</div>		
		);
	}
}


export default withRouter(Images);