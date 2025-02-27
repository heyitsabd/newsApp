
const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <img src="./Animation/loading.gif" alt="Loading" className="w-64 h-64" />
      <p className="text-lg font-semibold text-gray-600 mt-4">Fetching the latest news...</p>
    </div>
  );
};

export default LoadingAnimation;
