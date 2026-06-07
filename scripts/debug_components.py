import os
from PIL import Image

def debug():
    image_path = r"c:\Users\stany\Downloads\4-sight-website-sitemap\public\images\businesses-logo.png"
    if not os.path.exists(image_path):
        return
    img = Image.open(image_path)
    width, height = img.size
    pixels = img.load()
    
    # Calculate column density (number of white pixels per column)
    col_density = []
    for x in range(width):
        density = 0
        for y in range(height):
            if pixels[x, y][3] > 128: # opaque pixel
                density += 1
        col_density.append(density)
        
    # Find letter boundaries (where density goes from 0 to >0 and vice versa)
    in_letter = False
    start_x = 0
    letters = []
    for x in range(width):
        if col_density[x] > 0 and not in_letter:
            start_x = x
            in_letter = True
        elif col_density[x] == 0 and in_letter:
            letters.append((start_x, x - 1))
            in_letter = False
    if in_letter:
        letters.append((start_x, width - 1))
        
    print(f"Detected {len(letters)} letter components:")
    for idx, (start, end) in enumerate(letters):
        print(f"  Letter {idx}: x = [{start} to {end}], width = {end - start + 1}")

if __name__ == "__main__":
    debug()
