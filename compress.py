import os
import subprocess
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
vdir = os.path.join(os.getcwd(), 'public', 'videos')
idir = os.path.join(os.getcwd(), 'public', 'images')

mov_files = [f for f in os.listdir(vdir) if f.lower().endswith('.mov')]

for f in sorted(mov_files):
    base = os.path.splitext(f)[0]
    mov_path = os.path.join(vdir, f)
    mp4_path = os.path.join(vdir, f"{base}.mp4")
    poster_path = os.path.join(idir, f"poster_{base}.jpg")
    
    print(f"Compressing {f} -> {base}.mp4...")
    
    # 1. Poster JPG
    subprocess.run([
        ffmpeg, '-y', '-i', mov_path, '-ss', '00:00:00.5',
        '-vframes', '1', '-q:v', '2', poster_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # 2. Optimized MP4 (CRF 26, faststart, 720p/1080p)
    subprocess.run([
        ffmpeg, '-y', '-i', mov_path,
        '-vcodec', 'libx264', '-crf', '26', '-preset', 'fast',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
        '-acodec', 'aac', '-b:a', '128k', mp4_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    size_mb = os.path.getsize(mp4_path) / (1024 * 1024)
    print(f"DONE: {base}.mp4 ({size_mb:.2f} MB)")

print("ALL_COMPRESSED_SUCCESSFULLY")
