"""
Aggressively compress MOV videos for Vercel deployment.
Target: < 4.5 MB per file, total < 50 MB for all videos.
Strategy: 480p, CRF 32, 30-second max, strip audio, faststart.
"""
import os
import subprocess
import sys

# Use imageio_ffmpeg's bundled ffmpeg
import imageio_ffmpeg
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

vdir = os.path.join(os.getcwd(), 'public', 'videos')
out_dir = os.path.join(os.getcwd(), 'public', 'videos_compressed')
os.makedirs(out_dir, exist_ok=True)

mov_files = sorted([f for f in os.listdir(vdir) if f.lower().endswith('.mov')])

total_size = 0

for f in mov_files:
    base = os.path.splitext(f)[0]
    mov_path = os.path.join(vdir, f)
    mp4_path = os.path.join(out_dir, f"{base}.mp4")

    # Get duration of source file
    probe = subprocess.run(
        [ffmpeg, '-i', mov_path],
        capture_output=True, text=True
    )
    
    print(f"\n--- Compressing {f} -> {base}.mp4 ---")

    # Aggressive compression:
    # - Scale to 480p height (maintains aspect ratio)
    # - CRF 32 (lower quality but much smaller)
    # - No audio (these are background/portfolio videos)
    # - Max 30 seconds
    # - faststart for web streaming
    # - yuv420p for maximum browser compatibility
    cmd = [
        ffmpeg, '-y',
        '-i', mov_path,
        '-t', '30',                          # max 30 seconds
        '-vf', 'scale=-2:480',               # 480p height
        '-vcodec', 'libx264',
        '-crf', '32',                         # aggressive compression
        '-preset', 'slow',                    # better compression ratio
        '-pix_fmt', 'yuv420p',                # browser compatibility
        '-movflags', '+faststart',            # web streaming
        '-an',                                # strip audio
        '-profile:v', 'baseline',             # widest device compatibility
        '-level', '3.0',
        mp4_path
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr[-500:]}")
        continue

    size_mb = os.path.getsize(mp4_path) / (1024 * 1024)
    total_size += size_mb
    print(f"  DONE: {size_mb:.2f} MB")

print(f"\n{'='*50}")
print(f"Total compressed size: {total_size:.2f} MB")
print(f"Files saved to: {out_dir}")
print(f"\nNext steps:")
print(f"  1. Review the compressed videos in {out_dir}")
print(f"  2. If happy, replace the originals:")
print(f"     - Delete old MP4s from public/videos/")
print(f"     - Move compressed MP4s to public/videos/")
print(f"  3. Remove LFS tracking for .mp4 files")
print(f"  4. Commit and push")
