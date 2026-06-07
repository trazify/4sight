import os
from PIL import Image, ImageDraw

def add_stars():
    # Load and crop/transparent first to ensure correct coordinates
    image_path = r"c:\Users\stany\Downloads\4-sight-website-sitemap\public\images\businesses-logo.png"
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return
        
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # We want to find transparent pixels inside the B letter (x from 10 to 120)
    # A pixel (x,y) is inside a loop if:
    # 1. It is transparent (alpha == 0)
    # 2. There is an opaque pixel (alpha > 100) to its left
    # 3. There is an opaque pixel (alpha > 100) to its right
    # 4. There is an opaque pixel (alpha > 100) above it
    # 5. There is an opaque pixel (alpha > 100) below it
    
    internal_pixels = []
    for x in range(15, 110):
        for y in range(15, height - 15):
            if pixels[x, y][3] == 0:
                # Check left
                has_left = any(pixels[lx, y][3] > 100 for lx in range(0, x))
                # Check right
                has_right = any(pixels[rx, y][3] > 100 for rx in range(x + 1, width))
                # Check up
                has_up = any(pixels[x, uy][3] > 100 for uy in range(0, y))
                # Check down
                has_down = any(pixels[x, dy][3] > 100 for dy in range(y + 1, height))
                
                if has_left and has_right and has_up and has_down:
                    internal_pixels.append((x, y))
                    
    if not internal_pixels:
        print("No internal pixels found. Using fallback coordinates.")
        # Manual fallback based on standard proportions for a 993x177 image
        upper_center = (45, 55)
        lower_center = (47, 115)
    else:
        # Group into upper and lower loops based on Y coordinate
        internal_pixels.sort(key=lambda p: p[1])
        mid_idx = len(internal_pixels) // 2
        upper_cluster = internal_pixels[:mid_idx]
        lower_cluster = internal_pixels[mid_idx:]
        
        ux = sum(p[0] for p in upper_cluster) // len(upper_cluster)
        uy = sum(p[1] for p in upper_cluster) // len(upper_cluster)
        lx = sum(p[0] for p in lower_cluster) // len(lower_cluster)
        ly = sum(p[1] for p in lower_cluster) // len(lower_cluster)
        
        upper_center = (ux, uy)
        lower_center = (lx, ly)
        
    print(f"Detected upper loop center: {upper_center}, lower loop center: {lower_center}")
    
    # Draw stars
    def draw_star(draw, center, r):
        cx, cy = center
        r_in = int(r * 0.35)
        points = [
            (cx, cy - r),
            (cx + r_in, cy - r_in),
            (cx + r, cy),
            (cx + r_in, cy + r_in),
            (cx, cy + r),
            (cx - r_in, cy + r_in),
            (cx - r, cy),
            (cx - r_in, cy - r_in)
        ]
        # Draw pure white star
        draw.polygon(points, fill=(255, 255, 255, 255))

    draw = ImageDraw.Draw(img)
    # Draw stars with radius 11 inside the loops of B
    draw_star(draw, upper_center, 11)
    draw_star(draw, lower_center, 11)
    
    img.save(image_path, "PNG")
    print("Successfully drew 2 stars inside B.")

if __name__ == "__main__":
    add_stars()
