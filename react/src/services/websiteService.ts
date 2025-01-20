import { compressAndConvertToBase64 } from "@/utils/imageUtils";

interface WebsiteResponse {
  data: any;
  error?: string;
}

export async function fetchWebsiteDetails(params: string): Promise<WebsiteResponse> {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/mini-website/${params}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Website not found! Please upgrade your subscription if this website exists."
          : "Failed to load website details"
      );
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: null, error: "An unexpected error occurred" };
  }
}

export async function incrementWebsiteViews(params: string): Promise<void> {
  try {
    await fetch(`${import.meta.env.VITE_BASE_URL}/mini-website/${params}/increase-views`, {
      method: 'POST'
    });
  } catch (error) {
    console.error('Failed to increment views:', error);
  }
}

export async function editWebsite(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Prepare the request payload
    const payload: any = {
      params: formData.get('params'),
      businessName: formData.get('businessName'),
      phoneNumber: formData.get('phoneNumber'),
      whatsappNumber: formData.get('whatsapp'),
      paymentLink: formData.get('paymentLink'),
    };

    // Handle logo
    const logo = formData.get('logo');
    if (logo instanceof File) {
      payload.logo = await compressAndConvertToBase64(logo, 500, 0.7);
    }

    // Handle photo gallery
    const photoGallery = formData.getAll('photoGallery');
    payload.photoGallery = await Promise.all(
      photoGallery
        .filter((photo): photo is File => photo instanceof File)
        .map(photo => compressAndConvertToBase64(photo))
    );

    // Handle products
    const productsData = formData.get('products');
    if (productsData && typeof productsData === 'string') {
      const products = JSON.parse(productsData);
      const productImages = formData.getAll('products')
        .filter((item): item is File => item instanceof File);
      
      // Create a map of compressed images
      const compressedImagesMap = new Map();
      
      for (const image of productImages) {
        const compressed = await compressAndConvertToBase64(image);
        compressedImagesMap.set(image.name, compressed);
      }
      
      // Map products with their corresponding images
      payload.products = products.map((product: any) => ({
        ...product,
        image: product.image && compressedImagesMap.get(product.image)
      }));
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/edit-mini-website`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    console.error('Error updating website:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}