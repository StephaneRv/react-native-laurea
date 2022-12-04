import styled from 'styled-components';

const VideoThumbnail = styled.Image`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

const VideoTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px;
  padding-bottom: 10px;
  text-align: center;
`;

const VideoChannel = styled.Text`
  font-size: 14px;
  color: #999;
`;

const VideoAuthor = styled.Text`
	font-size: 13px;
	color: #555;
	margin: 10px 10px;
`;

const VideoDescription = styled.Text`
	font-size: 15px;
	color: #999;
	margin: 10px 10px;
`;


export { VideoThumbnail, VideoTitle, VideoChannel, VideoDescription, VideoAuthor };