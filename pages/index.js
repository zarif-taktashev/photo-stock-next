import React from 'react';
import Services from '../utils/services.js';
import Link from 'next/link';

class Home extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      images: [],
      filteredImages: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

	componentWillMount(){
		Services.getImages()
		.then((response) => {
	        const images = response.data.results;
	        this.setState({
	        	images : images,
	        	filteredImages: images
	        });
      	})
      	.catch((err) => console.error(err));
  	}

  	handleChange(e) {
	    let currentList = [];
	    let newList = [];

	    if (e.target.value !== "") {
	      	currentList = this.state.images;
	      	newList = currentList.filter(item => {
		        const lc = item.alt_description.toLowerCase();
		        const filter = e.target.value.toLowerCase();
		        return lc.includes(filter);
	      });
	    } else {
	      newList = this.state.images;
	    }
	    this.setState({
	      filteredImages: newList
	    });
	}

	render(){
		return(
			<div className="image-wrapper">
			<link href="./static/index.css" rel="stylesheet" />
				<div className="image-search">
					<label>Search:</label>
					<input onChange={this.handleChange} id="search" type="text" />
				</div>
				{ this.state.filteredImages.map((item, index) => {
					return( 
						<div className="image-container" key={index}>
							<Link href={`/images?id=${index}`}>
								<a><img alt="nope" className="img" src={item.links.download} /></a>
							</Link>
							<div className="img-cont">
								<h3 className="img-name">
									<span>{item.alt_description}</span>
								</h3>
							</div>
						</div>
					)
				  })
				}
			</div>		
		);
	}
}


export default Home;