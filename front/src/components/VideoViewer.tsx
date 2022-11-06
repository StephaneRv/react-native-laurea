import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import YOUTUBE_API_KEY from "../../env";

const MAX_RESULT = 5;

export default function VideoViewer( params: any ) {

  const [videoTitle, setVideoTitle] = useState();
  const [searched, setSearched] = useState(false);

  return (
    <>
			<VideoView>
				<YoutubePlayer
					height={270}
					play={false}
					videoId={params.route.params.videoUri}
					/>
			</VideoView>
			<ScrollView>
      </ScrollView>
    </>
  );
}

const VideoView = styled.View`
  padding-top: 10px;
`;