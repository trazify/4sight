import os
from PIL import Image, ImageDraw

def add_stars():
    image_path = r"c:\Users\stany\Downloads\4-sight-website-sitemap\public\images\businesses-logo.png"
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return
        
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Let's find the holes of 'B' in the left portion of the image (x from 0 to 150)
    # We will do a flood-fill from the top-left corner (0,0) to mark all external transparent/background pixels.
    # Any pixel with alpha == 0 that is not marked as external is an internal hole!
    
    visited = [[False for _ in range(height)] for _ in range(width)]
    queue = [(0, 0)]
    visited[0][0] = True
    
    # Fill from border
    border_pixels = []
    for x in range(width):
        border_pixels.append((x, 0))
        border_pixels.append((x, height - 1))
    for y in range(height):
        border_pixels.append((0, y))
        border_pixels.append((width - 1, y))
        
    for x, y in border_pixels:
        if not visited[x][y] and pixels[x, y][3] == 0:
            queue.append((x, y))
            visited[x][y] = True
            
    while queue:
        cx, cy = queue.pop(0)
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if not visited[nx][ny] and pixels[nx, ny][3] == 0:
                    visited[nx][ny] = True
                    queue.append((nx, ny))
                    
    # Now, find all internal transparent pixels in the B letter area (x from 10 to 120)
    internal_pixels = []
    for x in range(10, 120):
        for y in range(10, height - 10):
            # If it is transparent (alpha == 0) and NOT visited (not connected to outside)
            if pixels[x, y][3] == 0 and not visited[x][y]:
                internal_pixels.append((x, y))
                
    if not internal_pixels:
        print("No internal loops found in 'B'. Let's fallback to manual coordinates.")
        # Fallback to typical B loop coordinates if floodfill fails
        # For a 993x177 image, B is around x: 15 to 80.
        upper_center = (45, 55)
        lower_center = (45, 120)
    else:
        # Group internal pixels into two clusters: upper (smaller y) and lower (larger y)
        # Sort by y coordinate
        internal_pixels.sort(key=lambda p: p[1])
        mid_idx = len(internal_pixels) // 2
        upper_cluster = internal_pixels[:mid_idx]
        lower_cluster = internal_pixels[mid_idx:]
        
        # Calculate centroids
        ux = sum(p[0] for p in upper_cluster) // len(upper_cluster)
        uy = sum(p[1] for p in upper_cluster) // len(upper_cluster)
        lx = sum(p[0] for p in lower_cluster) // len(lower_cluster)
        ly = sum(p[1] for p in lower_cluster) // len(lower_cluster)
        
        upper_center = (ux, uy)
        lower_center = (lx, ly)
        
    print(f"Upper loop center: {upper_center}, Lower loop center: {lower_center}")
    
    # Function to draw a 4-pointed star
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
        draw.polygon(points, fill=(255, 255, 255, 255))

    draw = ImageDraw.Draw(img)
    # Draw stars with radius 12 pixels inside the loops
    draw_star(draw, upper_center, 12)
    draw_star(draw, lower_center, 12)
    
    img.save(image_path, "PNG")
    print(f"Successfully drew 2 stars inside B on: {image_path}")

if __name__ == "__main__":
    add_stars()
