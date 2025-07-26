import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';

interface PostProps {
  avatar: string;
  name: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
  isRepost?: boolean;
  repostBy?: string;
}

const Post: React.FC<PostProps> = ({ avatar, name, handle, content, likes, reposts, isRepost, repostBy }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      border: '2px solid #333',
      position: 'relative',
    }}>
      {isRepost && (
        <div style={{
          fontSize: 14,
          color: '#666',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{ fontSize: 16 }}>🔁</span>
          {repostBy} reposted
        </div>
      )}
      
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#00A8E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          flexShrink: 0,
          border: '3px solid #333',
        }}>
          {avatar}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</span>
            <span style={{ color: '#666', fontSize: 14 }}>@{handle}</span>
          </div>
          
          <div style={{
            fontSize: 18,
            lineHeight: 1.4,
            marginBottom: 12,
            color: '#333',
          }}>
            {content}
          </div>
          
          <div style={{ display: 'flex', gap: 24 }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              color: '#666',
            }}>
              <span style={{ fontSize: 18 }}>💬</span>
              12
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              color: '#666',
            }}>
              <span style={{ fontSize: 18 }}>🔁</span>
              {reposts}
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              color: '#666',
            }}>
              <span style={{ fontSize: 18 }}>❤️</span>
              {likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlueskyUIDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // Animation for the repost
  const repostScale = spring({
    fps,
    frame: frame - 60,
    config: {
      damping: 200,
    },
  });
  
  const repostOpacity = interpolate(frame, [60, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Animate the repost counter
  const repostCount = frame > 50 ? 24 : 23;
  
  // Viral spread animation - posts multiply and fill screen
  const viralStartFrame = 80;
  const isViralPhase = frame >= viralStartFrame;
  
  // Comic-style background
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(45deg, #FFE5B4 25%, #FFDAB9 25%, #FFDAB9 50%, #FFE5B4 50%, #FFE5B4 75%, #FFDAB9 75%, #FFDAB9)',
      backgroundSize: '20px 20px',
    }}>
      {/* Comic style title */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        padding: '8px 24px',
        borderRadius: 20,
        border: '3px solid #333',
        boxShadow: '4px 4px 0 #333',
      }}>
        <h2 style={{
          fontSize: 28,
          margin: 0,
          fontWeight: 'bold',
          color: '#00A8E8',
        }}>See How Bluesky Works!</h2>
      </div>
      
      {/* Phone mockup */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 700,
        backgroundColor: '#1a1a1a',
        borderRadius: 40,
        padding: 8,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          backgroundColor: '#F5F8FA',
          borderRadius: 32,
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Status bar */}
          <div style={{
            height: 40,
            backgroundColor: 'white',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 16, fontWeight: 'bold', color: '#00A8E8' }}>Bluesky</span>
          </div>
          
          {/* Feed */}
          <div style={{ padding: 16 }}>
            <Post
              avatar="🎨"
              name="Creative Coder"
              handle="creativecoder"
              content="Just discovered Bluesky! 🦋 Love that I actually own my data here. The future of social media is decentralized! #Bluesky #Decentralized"
              likes={42}
              reposts={repostCount}
            />
            
            <Sequence from={60}>
              <div style={{
                transform: `scale(${repostScale})`,
                opacity: repostOpacity,
              }}>
                <Post
                  avatar="🚀"
                  name="Tech Explorer"
                  handle="techexplorer"
                  content="Just discovered Bluesky! 🦋 Love that I actually own my data here. The future of social media is decentralized! #Bluesky #Decentralized"
                  likes={42}
                  reposts={24}
                  isRepost={true}
                  repostBy="Tech Explorer"
                />
              </div>
            </Sequence>
          </div>
          
          {/* Action bubble */}
          <Sequence from={40} durationInFrames={40}>
            <div style={{
              position: 'absolute',
              top: 180,
              right: 60,
              backgroundColor: '#00A8E8',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 'bold',
              transform: `scale(${interpolate(frame - 40, [0, 10], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
              boxShadow: '2px 2px 0 #333',
              border: '2px solid #333',
            }}>
              Click to repost! ✨
            </div>
          </Sequence>
        </div>
      </div>
      
      {/* Comic style action words */}
      <Sequence from={50} durationInFrames={20}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: 48,
          fontWeight: 'bold',
          color: '#FF6B6B',
          transform: `rotate(-15deg) scale(${interpolate(frame - 50, [0, 5], [0, 1.2], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })})`,
          textShadow: '3px 3px 0 #333',
        }}>
          WOW!
        </div>
      </Sequence>
      
      <Sequence from={70} durationInFrames={20}>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          fontSize: 36,
          fontWeight: 'bold',
          color: '#4ECDC4',
          transform: `rotate(10deg) scale(${interpolate(frame - 70, [0, 5], [0, 1.2], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })})`,
          textShadow: '3px 3px 0 #333',
        }}>
          REPOST!
        </div>
      </Sequence>
      
      {/* Viral spread animation */}
      {isViralPhase && (
        <AbsoluteFill style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          opacity: interpolate(frame, [viralStartFrame, viralStartFrame + 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const delay = i * 2;
            const startFrame = viralStartFrame + delay;
            const progress = Math.max(0, frame - startFrame);
            
            // Random positions and scales for viral spread
            const randomX = (i * 277) % width;
            const randomY = (i * 173) % height;
            const randomScale = 0.3 + (i % 3) * 0.1;
            const randomRotation = (i * 37) % 30 - 15;
            
            const scale = spring({
              fps,
              frame: progress,
              config: { damping: 100 },
            }) * randomScale;
            
            const opacity = interpolate(progress, [0, 5], [0, 0.9], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            
            if (progress <= 0) return null;
            
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: randomX,
                  top: randomY,
                  transform: `scale(${scale}) rotate(${randomRotation}deg)`,
                  opacity,
                  width: 300,
                }}
              >
                <Post
                  avatar="🦋"
                  name="Viral Post"
                  handle="everyone"
                  content="Just discovered Bluesky! 🦋 Love that I actually own my data here. The future of social media is decentralized! #Bluesky #Decentralized"
                  likes={42 + i * 10}
                  reposts={24 + i * 5}
                  isRepost={true}
                  repostBy={`User${i + 1}`}
                />
              </div>
            );
          })}
          
          {/* Viral text overlay */}
          <Sequence from={viralStartFrame + 30}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}>
              <h1 style={{
                fontSize: 64,
                color: '#00A8E8',
                textShadow: '0 0 20px rgba(0, 168, 232, 0.8)',
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
                GOING VIRAL!
              </h1>
              <p style={{
                fontSize: 24,
                color: 'white',
              }}>
                Your ideas spread across the network
              </p>
            </div>
          </Sequence>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};