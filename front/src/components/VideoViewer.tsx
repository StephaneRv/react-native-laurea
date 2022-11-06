import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import styled from 'styled-components';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import { VideoAuthor, VideoTitle, VideoDescription } from "../components/VideoUtils";

// import YOUTUBE_API_KEY from "../../env";

const MAX_RESULT = 5;

export default function VideoViewer( params: any ) {

  return (
    <>
			<VideoView>
				<YoutubePlayer
					height={270}
					// play={false}
					videoId={ params.route.params.isFromSearchTab ? params.route.params.video.id.videoId : params.route.params.video.id }
					/>
			</VideoView>
			<VideoTitle>
				{params.route.params.video.snippet.title}
			</VideoTitle>
			<VideoAuthor>
				{params.route.params.video.snippet.channelTitle}
			</VideoAuthor>
			<ScrollView>
				<VideoDescription>
					{params.route.params.video.snippet.description}
				</VideoDescription>
      </ScrollView>
    </>
  );
}

const VideoView = styled.View`
  // padding-top: 10px;
`;