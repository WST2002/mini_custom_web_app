interface ProgressBarProps {
    progress: number;
  }
  
  export const ProgressBar = ({ progress }: ProgressBarProps) => (
    <div className="mb-4">
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-1">Uploading users... {progress}%</p>
    </div>
  );