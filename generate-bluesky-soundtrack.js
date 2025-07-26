import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import wav from 'wav';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const client = new GoogleGenAI({
  apiVersion: 'v1alpha',
  apiKey: process.env.GOOGLE_API_KEY
});

async function generateBlueskySoundtrack() {
  console.log('🎵 Starting Bluesky soundtrack generation...');
  console.log('Target duration: 22 seconds\n');
  
  const audioChunks = [];
  const startTime = Date.now();
  const targetDurationMs = 24000; // 24 seconds to ensure we have enough
  
  try {
    // Create session with proper callback structure
    const session = await client.live.music.connect({
      model: 'models/lyria-realtime-exp',
      callbacks: {
        onmessage: (message) => {
          // Check for audio chunks directly in serverContent
          if (message.serverContent?.audioChunks) {
            const chunks = message.serverContent.audioChunks;
            for (const chunk of chunks) {
              if (chunk.data) {
                const audioData = Buffer.from(chunk.data, 'base64');
                audioChunks.push(audioData);
                const elapsedSeconds = (Date.now() - startTime) / 1000;
                console.log(`⏱️  ${elapsedSeconds.toFixed(1)}s - Received chunk: ${audioData.length} bytes`);
              }
            }
          }
          
          // Also check for audio in model turn (legacy structure)
          if (message.serverContent?.modelTurn?.audioChunks) {
            const chunks = message.serverContent.modelTurn.audioChunks;
            for (const chunk of chunks) {
              if (chunk.data) {
                const audioData = Buffer.from(chunk.data, 'base64');
                audioChunks.push(audioData);
                const elapsedSeconds = (Date.now() - startTime) / 1000;
                console.log(`⏱️  ${elapsedSeconds.toFixed(1)}s - Received chunk (modelTurn): ${audioData.length} bytes`);
              }
            }
          }
        },
        onerror: (error) => {
          console.error('❌ Session error:', error);
        },
        onclose: () => {
          console.log('\n✅ Music generation session closed');
        }
      }
    });

    console.log('📡 Session connected, configuring music...\n');

    // Wait a moment for connection to establish
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Set initial prompts - modern, tech-focused, uplifting
    console.log('Setting initial prompts...');
    await session.setWeightedPrompts({
      weightedPrompts: [
        { text: 'modern electronic', weight: 1.0 },
        { text: 'tech house', weight: 0.8 },
        { text: 'uplifting', weight: 0.7 },
        { text: 'bright synths', weight: 0.6 }
      ],
    });

    // Configure music parameters
    console.log('Configuring music parameters...');
    await session.setMusicGenerationConfig({
      musicGenerationConfig: {
        bpm: 120,              // Energetic but not too fast
        temperature: 1.0,      // Balanced creativity
        guidance: 4.0,         // Good adherence to prompts
        density: 0.7,          // Medium-high density for engaging sound
        brightness: 0.8,       // Bright, modern sound
        scale: 'C_MAJOR_A_MINOR',
        mute_bass: false,
        mute_drums: false,
        only_bass_and_drums: false
      },
    });

    console.log('🎶 Starting music generation...\n');
    await session.play();

    // Generate for 22 seconds
    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= targetDurationMs) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });

    console.log('\n⏹️  Stopping generation...');
    await session.stop();
    
    // Close session
    try {
      await session.close();
    } catch (err) {
      console.error('Error closing session:', err);
    }

    // Save the audio
    if (audioChunks.length > 0) {
      const combinedAudio = Buffer.concat(audioChunks);
      console.log(`\n📊 Total audio data: ${combinedAudio.length} bytes`);
      console.log(`📊 Number of chunks: ${audioChunks.length}`);
      
      // Create output directory
      const outputDir = path.join(process.cwd(), 'public', 'music');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Save as WAV file
      const outputFile = path.join(outputDir, 'bluesky-soundtrack.wav');
      
      try {
        await new Promise((resolve, reject) => {
          const writer = new wav.FileWriter(outputFile, {
            channels: 2,
            sampleRate: 48000,
            bitDepth: 16
          });
          
          writer.on('finish', () => {
            console.log(`\n💾 WAV saved to: ${outputFile}`);
            resolve();
          });
          writer.on('error', reject);
          
          writer.write(combinedAudio);
          writer.end();
        });
        
        // Convert to MP3
        console.log('\n🔄 Converting to MP3...');
        const mp3File = path.join(outputDir, 'soundtrack.mp3');
        
        try {
          await execAsync(`ffmpeg -i "${outputFile}" -acodec libmp3lame -b:a 192k "${mp3File}" -y`);
          console.log('✅ Conversion complete! Music ready at:', mp3File);
          
          // Get duration of generated file
          const durationResult = await execAsync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mp3File}"`);
          const duration = parseFloat(durationResult.stdout.trim());
          console.log(`\n🎵 Final soundtrack duration: ${duration.toFixed(1)} seconds`);
          
          // Remove WAV file to save space
          fs.unlinkSync(outputFile);
          console.log('🗑️  Cleaned up temporary WAV file');
          
        } catch (error) {
          console.error('❌ Error converting to MP3:', error);
          console.log('You can manually convert with:');
          console.log(`ffmpeg -i "${outputFile}" -acodec libmp3lame -b:a 192k "${mp3File}"`);
        }
        
      } catch (saveError) {
        console.error('❌ Error saving audio:', saveError);
        
        // Save raw PCM as fallback
        const pcmFile = path.join(outputDir, 'bluesky-soundtrack.pcm');
        fs.writeFileSync(pcmFile, combinedAudio);
        console.log(`💾 Saved raw PCM to: ${pcmFile}`);
        console.log('Convert manually with:');
        console.log(`ffmpeg -f s16le -ar 48000 -ac 2 -i "${pcmFile}" -acodec libmp3lame -b:a 192k "${path.join(outputDir, 'soundtrack.mp3')}"`);
      }
      
    } else {
      console.log('\n❌ No audio data received!');
      console.log('This could mean:');
      console.log('1. The API key doesn\'t have access to Lyria music generation');
      console.log('2. The model is not available in your region');
      console.log('3. There was a connection issue');
    }

  } catch (error) {
    console.error('\n❌ Error during music generation:', error);
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
  }
}

// Check API key
if (!process.env.GOOGLE_API_KEY) {
  console.error('❌ Please set GOOGLE_API_KEY environment variable');
  process.exit(1);
}

// Run the generation
console.log('🚀 Bluesky Soundtrack Generator');
console.log('================================\n');
generateBlueskySoundtrack().catch(console.error);