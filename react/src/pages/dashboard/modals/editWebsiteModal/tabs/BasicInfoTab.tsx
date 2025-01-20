interface BasicInfoTabProps {
  formData: {
    businessName: string;
    phoneNumber: string;
    whatsappNumber: string;
    paymentLink: string;
  };
  setFormData: (data: any) => void;
}

export function BasicInfoTab({ formData, setFormData }: BasicInfoTabProps) {
  const getErrorMessage = (fieldName: string, value: string) => {
    if (value.trim()) return ''; // Return empty if field has a value

    switch (fieldName) {
      case 'businessName':
        return 'Business name is required';
      case 'phoneNumber':
        return 'Phone number is required';
      case 'whatsappNumber':
        return 'WhatsApp number is required';
      case 'paymentLink':
        return 'UPI ID is required';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {!formData.businessName.trim() && (
              <p className="mt-1 text-sm text-red-500">
                {getErrorMessage('businessName', formData.businessName)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 10 digit number"
            />
            {!formData.phoneNumber.trim() && (
              <p className="mt-1 text-sm text-red-500">
                {getErrorMessage('phoneNumber', formData.phoneNumber)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              WhatsApp Number *
            </label>
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 10 digit number"
            />
            {!formData.whatsappNumber.trim() && (
              <p className="mt-1 text-sm text-red-500">
                {getErrorMessage('whatsappNumber', formData.whatsappNumber)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              UPI ID *
            </label>
            <input
              type="text"
              value={formData.paymentLink}
              onChange={(e) => setFormData({ ...formData, paymentLink: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {!formData.paymentLink.trim() && (
              <p className="mt-1 text-sm text-red-500">
                {getErrorMessage('paymentLink', formData.paymentLink)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}