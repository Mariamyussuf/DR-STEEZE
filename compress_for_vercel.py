"""
Compress MOV videos at multiple quality tiers for Vercel deployment.
Outputs: public/videos/480p/, public/videos/720p/, public/videos/1080p/
"""
import os
import subprocess
import sys

import imageio_ffmpeg
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

vdir = os.path.join(os.getcwd(), 'public', 'videos')
mov_files = sorted([f for f in os.listdir(vdir) if f.lower().endswith('.mov')])

QUALITY_TIERS = {
    '480p':  {'scale': '-2:480',  'crf': '32', 'preset': 'slow'},
    '720p':  {'scale': '-2:720',  'crf': '28', 'preset': 'medium'},
    '1080p': {'scale': '-2:1080', 'crf': '24', 'preset': 'medium'},
}

grand_total = 0

for tier_name, settings in QUALITY_TIERS.items():
    out_dir = os.path.join(vdir, tier_name)
    os.makedirs(out_dir, exist_ok=True)
    
    tier_total = 0
    print(f"\n{'='*50}")
    print(f"  TIER: {tier_name} (CRF {settings['crf']}, {settings['scale']})")
    print(f"{'='*50}")
    
    for f in mov_files:
        base = os.path.splitext(f)[0]
        mov_path = os.path.join(vdir, f)
        mp4_path = os.path.join(out_dir, f"{base}.mp4")
        
        print(f"  Compressing {f} -> {tier_name}/{base}.mp4 ...", end=' ', flush=True)
        
        cmd = [
            ffmpeg, '-y',
            '-i', mov_path,
            '-t', '30',
            '-vf', f'scale={settings["scale"]}',
            '-vcodec', 'libx264',
            '-crf', settings['crf'],
            '-preset', settings['preset'],
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            '-an',
            '-profile:v', 'baseline',
            '-level', '3.1',
            mp4_path
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"ERROR")
            print(f"    {result.stderr[-300:]}")
            continue
        
        size_mb = os.path.getsize(mp4_path) / (1024 * 1024)
        tier_total += size_mb
        print(f"{size_mb:.2f} MB")
    
    grand_total += tier_total
    print(f"  --- Tier total: {tier_total:.2f} MB ---")

print(f"\n{'='*50}")
print(f"  GRAND TOTAL: {grand_total:.2f} MB")
print(f"{'='*50}")
print(f"\nDone! Quality tiers saved to public/videos/480p/, 720p/, 1080p/")
