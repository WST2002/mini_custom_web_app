export const isBuffer = (data: unknown): boolean => {
  return data instanceof Uint8Array || 
    (typeof data === 'object' && data !== null && 'type' in data && data.type === 'Buffer');
};

export const bufferToDataUrl = (buffer: unknown): string => {
  try {
    let uint8Array: Uint8Array;
    
    if (buffer instanceof Uint8Array) {
      uint8Array = buffer;
    } else if (typeof buffer === 'object' && buffer !== null && 'data' in buffer && Array.isArray(buffer.data)) {
      uint8Array = new Uint8Array(buffer.data);
    } else {
      throw new Error('Invalid buffer data');
    }

    // Convert chunks to avoid call stack issues
    const chunkSize = 8192;
    const chunks: string[] = [];
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize);
      // Convert Uint8Array to regular array for String.fromCharCode
      chunks.push(String.fromCharCode.apply(null, Array.from(chunk)));
    }
    
    return `data:image/jpeg;base64,${btoa(chunks.join(''))}`;
  } catch (error) {
    console.error('Error converting buffer to data URL:', error);
    throw error;
  }
};