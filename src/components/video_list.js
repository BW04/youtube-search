import React from 'react'
import VideoListItem from './video_list_item'

const VideoList = (props) => {
  let vidoItems = props.videos
  vidoItems = vidoItems.map((video, index) => {
    return (
      <VideoListItem
        key={video.etag}
        video={video}
        onVideoSelect={props.onVideoSelect} />
    )
  })
  return (
    <ul className="col-md-4 list-group">
      {vidoItems}
    </ul>
  )
}

export default VideoList