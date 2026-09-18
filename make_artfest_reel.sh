#!/usr/bin/env bash
set -e

# Generate animated clips with slight zoom and panning for 9:16 vertical (720x1280)
ffmpeg -y -loop 1 -t 3.0 -i public/assets/artfest-lawn-paint.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,zoompan=z='min(zoom+0.0015,1.15)':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=720x1280:fps=30" \
  -c:v libx264 -pix_fmt yuv420p -t 3.0 /tmp/af_part1.mp4

ffmpeg -y -loop 1 -t 2.5 -i public/assets/artfest-photo-wall.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,zoompan=z='min(zoom+0.0018,1.2)':d=75:x='iw/2-(iw/zoom/2)':y='ih*0.2':s=720x1280:fps=30" \
  -c:v libx264 -pix_fmt yuv420p -t 2.5 /tmp/af_part2.mp4

ffmpeg -y -loop 1 -t 3.0 -i public/assets/artfest-hall-paint.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,zoompan=z='min(zoom+0.0015,1.15)':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=720x1280:fps=30" \
  -c:v libx264 -pix_fmt yuv420p -t 3.0 /tmp/af_part3.mp4

ffmpeg -y -loop 1 -t 3.0 -i public/assets/artfest-night-live.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,zoompan=z='min(zoom+0.002,1.2)':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=720x1280:fps=30" \
  -c:v libx264 -pix_fmt yuv420p -t 3.0 /tmp/af_part4.mp4

# Concatenate video parts
cat << 'EOF' > /tmp/af_list.txt
file '/tmp/af_part1.mp4'
file '/tmp/af_part2.mp4'
file '/tmp/af_part3.mp4'
file '/tmp/af_part4.mp4'
EOF

ffmpeg -y -f concat -safe 0 -i /tmp/af_list.txt -c copy /tmp/af_video_raw.mp4

# Generate festival synth beat audio track (11.5s)
ffmpeg -y -f lavfi -i "anoisesrc=d=11.5:c=pink:r=44100:a=0.03" \
  -f lavfi -i "sine=frequency=220:duration=11.5" \
  -f lavfi -i "sine=frequency=330:duration=11.5" \
  -f lavfi -i "sine=frequency=440:duration=11.5" \
  -filter_complex "[1:a]volume=0.3,tremolo=f=4:d=0.7[a1]; [2:a]volume=0.25,tremolo=f=8:d=0.8[a2]; [3:a]volume=0.2,tremolo=f=2:d=0.6[a3]; [0:a][a1][a2][a3]amix=inputs=4:duration=first,volume=1.8,highpass=f=80,lowpass=f=6000,afade=t=in:ss=0:d=0.5,afade=t=out:st=10.5:d=1.0[outa]" \
  -map "[outa]" -c:a aac -b:a 128k /tmp/af_audio.aac

# Mux final video and audio
ffmpeg -y -i /tmp/af_video_raw.mp4 -i /tmp/af_audio.aac -c:v copy -c:a aac -shortest public/assets/artfest-reels.mp4

echo "Art Fest reel successfully created at public/assets/artfest-reels.mp4"
