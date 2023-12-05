const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#8080806e]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 bg-[#8080806e]"></div>
    </div>
  );
};

export default LoadingSpinner;
