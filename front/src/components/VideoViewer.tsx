import React, { useState } from "react";
import { Appearance, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import styled from 'styled-components';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import { VideoAuthor, VideoTitle, VideoDescription } from "./VideoUtils";

// import YOUTUBE_API_KEY from "../../env";

const colorScheme = Appearance.getColorScheme();

const MAX_RESULT = 5;

export default function VideoViewer( params: any ) {

  return (
	<SafeAreaView style={colorScheme == 'light' ? styles.container : styles.container_dark}>
		<VideoView>
			<YoutubePlayer
				height={270}
				// play={false}
				videoId={ params.route.params.isFromSearchTab ? params.route.params.video.id.videoId : params.route.params.video.id }
			/>
		</VideoView>
			
		<VideoTitle style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>
			{params.route.params.video.snippet.title}
		</VideoTitle>
		<VideoAuthor style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>
			{params.route.params.video.snippet.channelTitle}
		</VideoAuthor>
		<ScrollView>
			<VideoDescription style={colorScheme == 'light' ? styles.text_light : styles.text_dark}>
				{params.route.params.video.snippet.description}
			</VideoDescription>
      	</ScrollView>
	</SafeAreaView>

  );
}

const VideoView = styled.View`
  // padding-top: 10px;
`;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	  },
	
	  container_dark: {
		backgroundColor: "#0d253f",
		flex: 1,
		alignItems: "center",
	  },

	  text_light: {
		marginBottom: 20,
		color: '#000',
		
	  },
	
	  text_dark: {
		marginBottom: 20,
		color: "#fff",
		
	  }

});