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
`;

const VideoChannel = styled.Text`
  font-size: 14px;
  color: #999;
`;

export { VideoThumbnail, VideoTitle, VideoChannel };