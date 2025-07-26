import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { wipe } from '@remotion/transitions/wipe';
import { BlueskyUIDemo } from './BlueskyUIDemo';
import { BackgroundMusic } from './BackgroundMusic';

// Scene 1: Intro with Bluesky logo and title
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoScale = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });
  
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return (
    <AbsoluteFill style={{
      backgroundColor: '#00A8E8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        transform: `scale(${logoScale})`,
        width: 200,
        height: 200,
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
      }}>
        <div style={{
          fontSize: 120,
          fontWeight: 'bold',
          color: '#00A8E8',
        }}>🦋</div>
      </div>
      <h1 style={{
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        opacity: titleOpacity,
        margin: 0,
      }}>Bluesky</h1>
      <p style={{
        color: 'white',
        fontSize: 24,
        opacity: titleOpacity,
        marginTop: 10,
      }}>A New Social Network</p>
    </AbsoluteFill>
  );
};

// Scene 2: What is Bluesky?
const WhatIsBluesky: React.FC = () => {
  const frame = useCurrentFrame();
  
  const textItems = [
    { text: "Decentralized social media platform", delay: 0 },
    { text: "Built on the AT Protocol", delay: 20 },
    { text: "Open and transparent", delay: 40 },
    { text: "User-owned identity", delay: 60 },
  ];
  
  return (
    <AbsoluteFill style={{
      backgroundColor: '#F5F8FA',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h2 style={{
        fontSize: 48,
        color: '#00A8E8',
        marginBottom: 40,
      }}>What is Bluesky?</h2>
      {textItems.map((item, index) => {
        const opacity = interpolate(
          frame,
          [item.delay, item.delay + 15],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );
        
        return (
          <div key={index} style={{
            fontSize: 32,
            color: '#333',
            marginBottom: 20,
            opacity,
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: 15 }}>•</span>
            {item.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Scene 3: Decentralization & AT Protocol
const DecentralizationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  
  return (
    <AbsoluteFill style={{
      backgroundColor: '#1A1A2E',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h2 style={{
        fontSize: 48,
        color: '#00A8E8',
        marginBottom: 40,
      }}>Decentralized Network</h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 40,
      }}>
        {[0, 1, 2].map((i) => {
          const delay = i * 10;
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 200,
            },
          });
          
          return (
            <div key={i} style={{
              transform: `scale(${scale})`,
              width: 150,
              height: 150,
              backgroundColor: '#00A8E8',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
                color: 'white',
                fontSize: 60,
              }}>🖥️</div>
            </div>
          );
        })}
      </div>
      
      <Sequence from={40}>
        <p style={{
          color: 'white',
          fontSize: 28,
          textAlign: 'center',
          marginTop: 40,
        }}>
          No single entity controls your data
        </p>
      </Sequence>
    </AbsoluteFill>
  );
};

// Scene 4: Key Features
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const features = [
    { icon: "🔓", title: "Open Source", desc: "Transparent codebase" },
    { icon: "🎯", title: "Custom Feeds", desc: "Control your timeline" },
    { icon: "🛡️", title: "Moderation", desc: "Community-driven safety" },
    { icon: "🌐", title: "Portable", desc: "Take your identity anywhere" },
  ];
  
  return (
    <AbsoluteFill style={{
      backgroundColor: '#F5F8FA',
      padding: 60,
    }}>
      <h2 style={{
        fontSize: 48,
        color: '#00A8E8',
        textAlign: 'center',
        marginBottom: 60,
      }}>Key Features</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        maxWidth: 800,
        margin: '0 auto',
      }}>
        {features.map((feature, index) => {
          const delay = index * 15;
          const scale = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 200,
            },
          });
          
          return (
            <div key={index} style={{
              transform: `scale(${scale})`,
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 16,
              border: '1px solid #e0e0e0',
            }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{feature.icon}</div>
              <h3 style={{
                fontSize: 24,
                color: '#00A8E8',
                marginBottom: 5,
              }}>{feature.title}</h3>
              <p style={{
                fontSize: 18,
                color: '#666',
                margin: 0,
              }}>{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Call to Action
const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const buttonScale = spring({
    fps,
    frame: frame - 20,
    config: {
      damping: 200,
    },
  });
  
  return (
    <AbsoluteFill style={{
      backgroundColor: '#00A8E8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}>
      <h2 style={{
        fontSize: 56,
        marginBottom: 30,
      }}>Join Bluesky Today!</h2>
      
      <p style={{
        fontSize: 28,
        marginBottom: 40,
        opacity: interpolate(frame, [10, 25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}>Be part of the decentralized future</p>
      
      <div style={{
        transform: `scale(${buttonScale})`,
        backgroundColor: 'white',
        color: '#00A8E8',
        padding: '20px 40px',
        borderRadius: 50,
        fontSize: 24,
        fontWeight: 'bold',
      }}>
        bsky.app
      </div>
    </AbsoluteFill>
  );
};


export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={120}>
        <IntroScene />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: 30 })}
        presentation={fade()}
      />
      
      <TransitionSeries.Sequence durationInFrames={150}>
        <WhatIsBluesky />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: 20 })}
        presentation={wipe({ direction: 'from-left' })}
      />
      
      <TransitionSeries.Sequence durationInFrames={120}>
        <DecentralizationScene />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: 30 })}
        presentation={fade()}
      />
      
      <TransitionSeries.Sequence durationInFrames={150}>
        <FeaturesScene />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: 30 })}
        presentation={fade()}
      />
      
      <TransitionSeries.Sequence durationInFrames={150}>
        <BlueskyUIDemo />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: 20 })}
        presentation={wipe({ direction: 'from-bottom' })}
      />
      
      <TransitionSeries.Sequence durationInFrames={120}>
        <CallToAction />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    
    {/* Background music track */}
    <BackgroundMusic />
    </AbsoluteFill>
  );
};
