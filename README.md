# Bluesky Promotional Video

A Remotion-based video project showcasing Bluesky's features and decentralized social media platform, with animated UI demonstrations and AI-generated background music.

## 🎬 Overview

This project creates a 22-second promotional video for Bluesky, featuring:
- **Animated scenes** introducing Bluesky's core concepts
- **Interactive UI demonstration** showing how reposts work and go viral
- **Smooth transitions** between scenes using fade and wipe effects
- **AI-generated soundtrack** using Google's Lyria music generation model
- **Comic-style animations** with engaging visual effects

## 🚀 Features

### Video Scenes
1. **Intro Scene** - Animated Bluesky logo with spring effects
2. **What is Bluesky** - Key platform features with animated bullet points
3. **Decentralization Scene** - Visual representation of distributed networks
4. **Features Overview** - Card-based layout showcasing main features
5. **UI Demo** - Interactive demonstration of posting and reposting
6. **Call to Action** - Engaging finale with website reference

### Technical Features
- Built with Remotion v4.0.327 for programmatic video generation
- React components for each scene with frame-based animations
- Tailwind CSS v4 integration for styling
- TypeScript for type safety
- AI-powered soundtrack generation using Google Generative AI

## 📋 Prerequisites

- Node.js 18+ and npm
- ffmpeg (for audio conversion)
- Google API key with Lyria music generation access (optional, for soundtrack generation)

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd bluesky

# Install dependencies
npm install
```

## 🎥 Usage

### Development Mode
Launch the Remotion Studio to preview and edit your video:

```bash
npm run dev
```

### Generate Background Music
To create an AI-generated soundtrack (requires Google API key):

```bash
# Set your API key
export GOOGLE_API_KEY="your-api-key-here"

# Generate soundtrack
node generate-bluesky-soundtrack.js
```

### Render Video
To render the final video:

```bash
# Basic render
npx remotion render MyComp out/video.mp4

# With custom settings
npx remotion render MyComp out/video.mp4 --codec=h264 --crf=18
```

## 🎨 Customization

### Modifying Scenes
Edit the components in `src/`:
- `Composition.tsx` - Main composition and scene structure
- `BlueskyUIDemo.tsx` - Interactive UI demonstration
- `BackgroundMusic.tsx` - Audio component

### Adjusting Timing
- Total duration: 660 frames (22 seconds at 30fps)
- Scene durations are defined in the `TransitionSeries` components
- Modify `durationInFrames` props to adjust scene lengths

### Styling
- Uses Tailwind CSS v4 for utility classes
- Custom styles can be added in `src/index.css`
- Comic-style effects are implemented with inline styles

## 📁 Project Structure

```
bluesky/
├── public/
│   └── music/
│       └── soundtrack.mp3      # Generated background music
├── src/
│   ├── BackgroundMusic.tsx     # Audio component
│   ├── BlueskyUIDemo.tsx      # UI demonstration scene
│   ├── Composition.tsx        # Main video composition
│   ├── Root.tsx              # Remotion root configuration
│   ├── index.css             # Global styles
│   └── index.ts              # Entry point
├── generate-bluesky-soundtrack.js  # AI music generation script
├── remotion.config.ts         # Remotion configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🎵 Soundtrack Generation

The project includes an AI-powered soundtrack generator that creates modern, tech-focused background music:

- **Style**: Electronic/tech house with uplifting vibes
- **Duration**: 22-24 seconds to match video length
- **Parameters**: 120 BPM, bright synths, C Major/A Minor scale
- **Output**: MP3 file at 192kbps

## 📦 Dependencies

### Core
- `remotion` & `@remotion/cli` - Video generation framework
- `react` & `react-dom` - UI components
- `@remotion/transitions` - Scene transition effects
- `@remotion/tailwind-v4` - Tailwind CSS integration

### Audio Generation
- `@google/generative-ai` - Google's AI SDK for music generation
- `wav` - WAV file handling
- `ws` - WebSocket support

## 🔧 Configuration

The video is configured in `src/Root.tsx`:
- **Resolution**: 1280x720 (HD)
- **Frame Rate**: 30 FPS
- **Duration**: 660 frames (22 seconds)
- **Composition ID**: "MyComp"

## 📄 License

This project is UNLICENSED (private use only). For Remotion licensing, see [Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Resources

- [Remotion](https://www.remotion.dev/) - The React framework for programmatic video
- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Bluesky Platform](https://bsky.app)
- [AT Protocol](https://atproto.com/)
- [Google Generative AI](https://ai.google.dev/)
- [Google Music Generation API](https://ai.google.dev/gemini-api/docs/music-generation) - AI-powered soundtrack generation

## 💬 Support

For Remotion-specific help:
- [Discord Server](https://discord.gg/6VzzNDwUwV)
- [GitHub Issues](https://github.com/remotion-dev/remotion/issues)

---

Built with ❤️ using [Remotion](https://www.remotion.dev/) and generated via [Claude Code](https://claude.ai/code)