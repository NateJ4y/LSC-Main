# CRITICAL IMAGE ASSET PRESERVATION RULE

This is a strict implementation requirement for the entire website.

## ORIGINAL IMAGES MUST NEVER BE ALTERED

Any image, logo, photograph, product image, seat-cover image, vehicle image, texture, icon, or other visual asset that the user provides must be used **exactly as supplied**.

You are NOT allowed to:

* Redraw the image
* Regenerate the image
* Recreate the image
* AI-enhance the image
* Retouch the image
* Modify the colours
* Change the contrast
* Change the brightness
* Change the saturation
* Change the sharpness
* Remove or add objects
* Change the background
* Change the shape
* Change the proportions
* Change the logo
* Change text contained inside an image
* Change stitching, materials, patterns or details in product photographs
* Create an AI-generated replacement
* Apply an artistic style
* Apply filters
* Apply generative fill
* Apply image-to-image transformation
* "Improve" or "clean up" the image using AI

### THE ORIGINAL FILE IS THE SOURCE OF TRUTH.

If the user uploads a logo, use that exact logo.
If the user uploads a photograph of a seat cover, use that exact photograph.
If the user uploads a photograph of a vehicle interior, use that exact photograph.
If the user uploads a product image, use that exact product image.

Do not attempt to recreate these assets.

---

# IMAGE HANDLING

Images must be implemented as normal website assets/files.

Use the original asset directly through the website's image/file path or asset reference.

For example:

```html
<img src="/assets/seat-cover.jpg" alt="Custom vehicle seat cover">
```

Do NOT generate a new image to represent the asset.
Do NOT pass the image through an AI image-generation or image-editing model.
Do NOT use CSS filters that visually alter the original image.

Avoid:

```css
filter: brightness(...);
filter: contrast(...);
filter: saturate(...);
filter: blur(...);
```

unless the user explicitly requests it.

---

# CROPPING AND RESPONSIVE DESIGN

You ARE allowed to change how the image is displayed on different screen sizes, but you must NOT change the underlying image.

You may:

* Resize the image proportionally
* Scale it
* Place it inside containers
* Use responsive sizing
* Use `object-fit: contain` or `object-fit: cover` when appropriate
* Position the image within its container
* Create rounded corners around the image
* Add shadows around the image
* Place text beside or over the image
* Create image galleries
* Create carousels
* Use responsive layouts

However:

**THE ACTUAL PIXELS OF THE SOURCE IMAGE MUST REMAIN UNCHANGED.**

For logos specifically, prioritise:

```css
object-fit: contain;
```

and preserve the original aspect ratio. Never stretch or distort the logo.

---

# LOGO — SPECIAL RULE

The company logo is a protected brand asset.
The logo must be displayed **exactly as supplied**.

Do not:

* Redesign it
* Modernise it
* Simplify it
* Vectorise it using AI
* Change its typography
* Change its colours
* Recreate it
* Add effects to it
* Remove elements
* Change proportions
* Generate an alternative version

If the logo is supplied as PNG, use the PNG.
If it is supplied as SVG, use the SVG.
If it has a transparent background, preserve the transparency.
The logo should simply be positioned, sized and displayed correctly.

---

# PRODUCT PHOTOGRAPHS — SPECIAL RULE

Product photographs are also protected assets.
A photograph of a seat cover must remain the photograph of that exact seat cover.
Do not generate a "better-looking" version.
Do not replace it with an AI-generated seat cover.

Do not change:

* Material texture
* Stitching
* Colour
* Shape
* Seat contours
* Patterns
* Branding
* Embroidery
* Vehicle interior
* Lighting
* Background

The customer must see the **actual product**, not an AI interpretation of the product.

---

# WEBSITE DESIGN VS IMAGE EDITING

Design the website around the supplied images.
Do NOT redesign the images.
Think of the images as **locked assets**.
The website can change around the image.
The image cannot change because of the website.

---

# NO IMAGE GENERATION UNLESS EXPLICITLY REQUESTED

Do not call, invoke, simulate or use any image-generation process for an existing supplied asset.

If a visual does not exist, use a neutral placeholder and clearly identify it as a placeholder.
Do not silently generate a replacement.

Only generate a new image when the user explicitly requests:
"Generate a new image."
"Create a new hero image."
"Make an illustration."
"Generate a background."

Otherwise, **USE THE ORIGINAL ASSET.**

---

# IMAGE INTEGRITY CHECK

Before implementing every supplied image:
1. Is this an existing asset supplied by the user?
2. If yes, am I using the original file?
3. Have I altered the pixels?
4. Have I generated a replacement?
5. Have I changed the logo or product?
6. Have I applied an automatic filter or enhancement?

If the answer to any of questions 3–6 is yes:
**STOP AND USE THE ORIGINAL ASSET INSTEAD.**

---

# PRIORITY RULE

This instruction has higher priority than aesthetic improvements.
If an image looks low-resolution, slightly dark, oddly cropped or imperfect:
**DO NOT FIX IT AUTOMATICALLY.**
Use the original. The website design must adapt to the supplied assets — the assets must not be altered to fit the design.

**ORIGINAL ASSET IN → ORIGINAL ASSET OUT.**
Treat every supplied logo and product photograph as a **LOCKED BRAND/PRODUCT ASSET**.
