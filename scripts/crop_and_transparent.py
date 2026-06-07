import os
from PIL import Image

def process_image():
    input_path = r"c:\Users\stany\Downloads\4-sight-website-sitemap\public\images\businesses-logo.png"
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
        
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Find bounding box of non-black pixels
    min_x, min_y = width, height
    max_x, max_y = 0, 0
    
    pixels = img.load()
    threshold = 40 # Threshold to detect non-black pixel
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If the pixel is not black
            if r > threshold or g > threshold or b > threshold:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if max_x < min_x or max_y < min_y:
        print("No text detected in the image.")
        return
        
    # Add a small padding
    padding = 10
    min_x = max(0, min_x - padding)
    min_y = max(0, min_y - padding)
    max_x = min(width, max_x + padding)
    max_y = min(height, max_y + padding)
    
    # Crop the image
    cropped_img = img.crop((min_x, min_y, max_x, max_y))
    c_width, c_height = cropped_img.size
    c_pixels = cropped_img.load()
    
    # Make the background transparent and text pure white
    for y in range(c_height):
        for x in range(c_width):
            r, g, b, a = c_pixels[x, y]
            if r > threshold or g > threshold or b > threshold:
                # Keep it as white text (or smooth anti-aliased gray)
                # We can scale the alpha based on brightness
                brightness = max(r, g, b)
                alpha = int(255 * (brightness / 255.0))
                # Set pixel to white with proportional alpha
                c_pixels[x, y] = (255, 255, 255, alpha)
            else:
                c_pixels[x, y] = (0, 0, 0, 0)
                
    cropped_img.save(input_path, "PNG")
    print(f"Successfully cropped and made transparent: {input_path} (new size: {c_width}x{c_height})")

if __name__ == "__main__":
    process_image()
