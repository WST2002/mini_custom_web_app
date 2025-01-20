interface ErrorMessageProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/50 text-red-100 p-8 rounded-lg max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{message}</p>
        </div>
      </div>
    );
  }