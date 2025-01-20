export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

// Add this helper function to check and format image data
export function formatImageData(imageData: any): string | null {
    if (!imageData) return null;

    // If already a base64 string with data URI prefix, return as is
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
        return imageData;
    }

    // If it's a Buffer (from the backend), convert to base64
    if (imageData instanceof Uint8Array || (typeof Buffer !== 'undefined' && Buffer.isBuffer(imageData))) {
        const base64 = Buffer.from(imageData).toString('base64');
        return `data:image/jpeg;base64,${base64}`;
    }

    return null;
}

export async function compressAndConvertToBase64(file: File, maxWidth = 800, quality = 0.6): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                // Calculate dimensions
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };

            img.src = e.target?.result as string;
        };

        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}