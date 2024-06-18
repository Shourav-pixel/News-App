import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
  static defaultProps ={
    country: 'in',
    pageSize: 8,
    category:'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props){
    
    super(props);
    //console.log("Hello..This is from constructot");
    this.state = {
   
      articles : [],
      loading : true,
      page:1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHippo`;
  }
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews()
  {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    //console.log(parseData);
    this.setState({
      articles: parseData.articles,totalResults:parseData.totalResults,loading:false
    });
    this.props.setProgress(100);
  }

  async componentDidMount()
  {
    this.updateNews();

  }
 
  handlePrev = async ()=>{

    this.setState({page:this.state.page+1});
    this.updateNews();
  }
  handleNext = async ()=>{

    this.setState({page: this.state.page-1});
    this.updateNews();
  } 
  fetchMoreData = async () => {
   this.setState({page:this.state.page+1});
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
 
   let data = await fetch(url);
   let parseData = await data.json();
  //  console.log(parseData);
   this.setState({
     articles: this.state.articles.concat(parseData.articles),
     totalResults:parseData.totalResults
   });

  };
  render() {
    return (
      <>
       
        <h1  className="text-center my-2 " style = {{color:"black", margin:"70px"}}>NewsHippoo-{this.capitalizeFirstLetter(this.props.category)}</h1>
        <hr />
        <br />
      {this.state.loading && <Spinner/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

        
        <div className="row">
        { this.state.articles.map((element)=>{

          return  <div className="col-md-3" key = {element.url}>
          <NewsItem  title={element.title.slice(0,20)} author= {element.author} source = {element.source.name} publishedAt={element.publishedAt} description={element.description ? element.description.slice(0, 45) : "No Description"} urlImage = {element.urlToImage } newsUrl={element.url} /> 
          </div>

        })}
        
        </div>
        </div>
        </InfiniteScroll>
        
      
       
      </>
    )
  }
}
