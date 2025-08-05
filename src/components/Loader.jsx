const Loader = () => {
  return (
    <div
      className="flex justify-center items-end py-20 space-x-1"
      aria-label="Loading..."
    >
      <div className="w-1 h-4 bg-red-500 animate-[stretch_0.8s_ease-in-out_infinite]"></div>
      <div className="w-1 h-6 bg-red-500 animate-[stretch_0.8s_ease-in-out_infinite_0.1s]"></div>
      <div className="w-1 h-8 bg-red-500 animate-[stretch_0.8s_ease-in-out_infinite_0.2s]"></div>
      <div className="w-1 h-6 bg-red-500 animate-[stretch_0.8s_ease-in-out_infinite_0.3s]"></div>
      <div className="w-1 h-4 bg-red-500 animate-[stretch_0.8s_ease-in-out_infinite_0.4s]"></div>
    </div>
  );
};

export default Loader;
