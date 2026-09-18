#!/usr/bin/env bash
set -e

# Generate clean clips fast without cpu-heavy zoompan
ffmpeg -y -loop 1 -t 2.0 -i public/assets/mansvi-raw-fibers.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
  -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 25 /tmp/f1.mp4

ffmpeg -y -loop 1 -t 1.8 -i public/assets/mansvi-cotton-boll.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
  -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 25 /tmp/f2.mp4

ffmpeg -y -loop 1 -t 1.8 -i public/assets/mansvi-yarn-ball.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
  -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 25 /tmp/f3.mp4

ffmpeg -y -loop 1 -t 2.2 -i public/assets/mansvi-pattern-cut.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
  -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 25 /tmp/f4.mp4

ffmpeg -y -loop 1 -t 3.0 -i public/assets/mansvi-fabrics-poster.jpg \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
  -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 25 /tmp/f5.mp4

cat << 'CONCAT_EOF' > /tmp/f_list.txt
file '/tmp/f1.mp4'
file '/tmp/f2.mp4'
file '/tmp/f3.mp4'
file '/tmp/f4.mp4'
file '/tmp/f5.mp4'
CONCAT_EOF

# Audio track
ffmpeg -y -f lavfi -i "sine=frequency=320:duration=10.8" \
  -f lavfi -i "sine=frequency=480:duration=10.8" \
  -filter_complex "[0:a][1:a]amix=inputs=2,volume=0.2[a]" -map "[a]" \
  -c:a aac /tmp/f_audio.aac

ffmpeg -y -f concat -safe 0 -i /tmp/f_list.txt -i /tmp/f_audio.aac \
  -c:v copy -c:a aac -movflags +faststart public/assets/mansvi-fabrics-reel.mp4

# Also copy to dist if dist exists
mkdir -p dist/assets
cp public/assets/mansvi-fabrics-reel.mp4 dist/assets/
cp public/assets/*.jpg dist/assets/ 2>/dev/null || true

echo "Fast reel successfully generated!"
