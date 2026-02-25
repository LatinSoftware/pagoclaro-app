/**
 * Merges two image files vertically into a single image.
 * @param frontFile The front ID image file
 * @param backFile The back ID image file
 * @returns A Promise that resolves to the merged Blob
 */
export async function mergeIdImages(
  frontFile: File,
  backFile: File,
): Promise<Blob> {
  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  try {
    const [frontImg, backImg] = await Promise.all([
      loadImage(frontFile),
      loadImage(backFile),
    ]);

    // Calculate dimensions
    const width = Math.max(frontImg.width, backImg.width);
    const height = frontImg.height + backImg.height + 20; // 20px gap

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    // Fill white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // Draw images centered
    const frontX = (width - frontImg.width) / 2;
    ctx.drawImage(frontImg, frontX, 0);

    const backX = (width - backImg.width) / 2;
    ctx.drawImage(backImg, backX, frontImg.height + 20);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas to Blob failed"));
        },
        "image/jpeg",
        0.8,
      );
    });
  } catch (error) {
    console.error("Error merging images:", error);
    throw error;
  }
}
