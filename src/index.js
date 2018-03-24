import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyAREa3ij3iOKLUT37m_LP-BNEMf3qgAAYo'

//Create a new Component. This component should produce some HTML
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      seletedVideo: null,
    }
    this.videoSearch('')
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (response) => {
      this.setState({
        videos: response,
        seletedVideo: response[0]
      })
    })
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.seletedVideo} />
        <VideoList
          // onVideoSelect={(selectedVideo) => { this.setState({ seletedVideo: selectedVideo }) }}
          onVideoSelect={function (selectedVideo) {
            this.setState({ selectedVideo: selectedVideo })
          }.bind(this)}
          videos={this.state.videos} />
      </div>
    )
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'))