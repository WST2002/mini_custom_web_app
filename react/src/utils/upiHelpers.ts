export function generateUPILink(upiId: string) {
    const baseUrl = 'upi://pay';
    const params = new URLSearchParams({
      pa: upiId // payee address (UPI ID)
    });
    
    return `${baseUrl}?${params.toString()}`;
  }