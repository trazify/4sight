import os
from PIL import Image, ImageDraw

def create_cutout_stars():
    # 1. Restore/load the base word-only image (white text on black background)
    base_image_path = r"C:\Users\stany\Downloads\4-sight-website-sitemap\public\images\businesses-logo.png"
    if not os.path.exists(base_image_path):
        print(f"File not found: {base_image_path}")
        return
        
    img = Image.open(base_image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    threshold = 40
    
    # 2. Find bounding box of white pixels to crop
    min_x, min_y = width, height
    max_x, max_y = 0, 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r > threshold or g > threshold or b > threshold:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    padding = 10
    min_x = max(0, min_x - padding)
    min_y = max(0, min_y - padding)
    max_x = min(width, max_x + padding)
    max_y = min(height, max_y + padding)
    
    cropped_img = img.crop((min_x, min_y, max_x, max_y))
    c_width, c_height = cropped_img.size
    c_pixels = cropped_img.load()
    
    # 3. Find the internal loops of B (black pixels surrounded by white text pixels in the B range)
    # B is in range x: [10, 110]
    internal_loop_pixels = []
    for x in range(15, 110):
        for y in range(15, c_height - 15):
            r, g, b, a = c_pixels[x, y]
            # It is a black pixel
            if r <= threshold and g <= threshold and b <= threshold:
                # Check 4 directions for white text
                has_left = any(c_pixels[lx, y][0] > threshold for lx in range(0, x))
                has_right = any(c_pixels[rx, y][0] > threshold for rx in range(x + 1, c_width))
                has_up = any(c_pixels[x, uy][0] > threshold for uy in range(0, y))
                has_down = any(c_pixels[x, dy][0] > threshold for dy in range(y + 1, c_height))
                
                if has_left and has_right and has_up and has_down:
                    internal_loop_pixels.append((x, y))
                    
    # Fill the B loops with solid white in the image
    for x, y in internal_loop_pixels:
        c_pixels[x, y] = (255, 255, 255, 255)
        
    # Calculate loop centroids
    if not internal_loop_pixels:
        print("No internal loops found. Using fallback coordinates.")
        upper_center = (45, 55)
        lower_center = (47, 115)
    else:
        internal_loop_pixels.sort(key=lambda p: p[1])
        mid_idx = len(internal_loop_pixels) // 2
        upper_cluster = internal_loop_pixels[:mid_idx]
        lower_cluster = internal_loop_pixels[mid_idx:]
        
        ux = sum(p[0] for p in upper_cluster) // len(upper_cluster)
        uy = sum(p[1] for p in upper_cluster) // len(upper_cluster)
        lx = sum(p[0] for p in lower_cluster) // len(lower_cluster)
        ly = sum(p[1] for p in lower_cluster) // len(lower_cluster)
        
        upper_center = (ux, uy)
        lower_center = (lx, ly)
        
    print(f"Upper star cutout center: {upper_center}, Lower star cutout center: {lower_center}")
    
    # 4. Make all remaining black pixels (outside the letters) transparent, and make text white
    for y in range(c_height):
        for x in range(c_width):
            r, g, b, a = c_pixels[x, y]
            if r > threshold or g > threshold or b > threshold:
                brightness = max(r, g, b)
                alpha = int(255 * (brightness / 255.0))
                c_pixels[x, y] = (255, 255, 255, alpha)
            else:
                c_pixels[x, y] = (0, 0, 0, 0)
                
    # 5. Draw transparent stars (alpha = 0) at the loop centers to carve them out
    # We use a solid transparent fill to represent the cutout holes.
    draw = ImageDraw.Draw(cropped_img)
    
    def draw_cutout_star(draw, center, r):
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
        draw.polygon(points, fill=(0, 0, 0, 0))

    # Draw cutout stars (radius 10 to fit cleanly inside the filled loops)
    draw_cutout_star(draw, upper_center, 11)
    draw_cutout_star(draw, lower_center, 11)
    
    cropped_img.save(base_image_path, "PNG")
    print(f"Successfully created transparent star cutouts inside B on {base_image_path}")

if __name__ == "__main__":
    create_cutout_stars()
