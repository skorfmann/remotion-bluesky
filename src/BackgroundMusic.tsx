import { Audio, staticFile, useVideoConfig, interpolate, useCurrentFrame } from 'remotion';

export const BackgroundMusic: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  
  // Fade in/out for smoother experience
  const fadeInFrames = 30;
  const fadeOutFrames = 60;
  
  const volume = interpolate(
    frame,
    [0, fadeInFrames, durationInFrames - fadeOutFrames, durationInFrames],
    [0, 0.3, 0.3, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <Audio
      src={staticFile('music/soundtrack.mp3')}
      volume={volume}
      startFrom={0}
    />
  );
};