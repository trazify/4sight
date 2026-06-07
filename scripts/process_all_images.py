import os
import shutil
from PIL import Image

def process_single_image(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return False
        
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Sample the corners to determine background type
    corner_colors = [
        pixels[0, 0],
        pixels[width - 1, 0],
        pixels[0, height - 1],
        pixels[width - 1, height - 1]
    ]
    avg_brightness = sum(max(c[0], c[1], c[2]) for c in corner_colors) / 4.0
    
    is_white_background = avg_brightness > 128
    print(f"Image {os.path.basename(input_path)} detected as {'white' if is_white_background else 'black'} background (avg corner brightness: {avg_brightness:.1f})")
    
    min_x, min_y = width, height
    max_x, max_y = 0, 0
    
    threshold = 128
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            brightness = max(r, g, b)
            if is_white_background:
                # Foreground is dark
                if brightness < threshold:
                    if x < min_x: min_x = x
                    if x > max_x: max_x = x
                    if y < min_y: min_y = y
                    if y > max_y: max_y = y
            else:
                # Foreground is light
                if brightness > threshold:
                    if x < min_x: min_x = x
                    if x > max_x: max_x = x
                    if y < min_y: min_y = y
                    if y > max_y: max_y = y
                    
    if max_x < min_x or max_y < min_y:
        print(f"No text detected in the image: {input_path}")
        return False
        
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
            brightness = max(r, g, b)
            if is_white_background:
                # Text is dark, background is white.
                if brightness < 240:
                    alpha = int(255 * (1.0 - brightness / 255.0))
                    c_pixels[x, y] = (255, 255, 255, alpha)
                else:
                    c_pixels[x, y] = (0, 0, 0, 0)
            else:
                # Text is light, background is black.
                if brightness > 15:
                    alpha = int(255 * (brightness / 255.0))
                    c_pixels[x, y] = (255, 255, 255, alpha)
                else:
                    c_pixels[x, y] = (0, 0, 0, 0)
                    
    # Create target directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cropped_img.save(output_path, "PNG")
    print(f"Successfully processed: {input_path} -> {output_path} (size: {c_width}x{c_height})")
    return True

def main():
    brain_dir = r"C:\Users\stany\.gemini\antigravity-ide\brain\5c1da9ac-17f5-403a-84bb-c2d740fd6e0e"
    public_dir = r"c:\Users\stany\Downloads\4-sight-website-sitemap\public\images"
    
    mappings = {
        "build_logo_word_1780813969821.png": "build-logo.png",
        "results_logo_word_1780815991974.png": "results-logo.png",
        "process_logo_word_1780815203331.png": "process-logo.png",
        "engineer_logo_word_1780815221174.png": "engineer-logo.png"
    }
    
    for src_name, dest_name in mappings.items():
        src_path = os.path.join(brain_dir, src_name)
        dest_path = os.path.join(public_dir, dest_name)
        process_single_image(src_path, dest_path)

if __name__ == "__main__":
    main()
