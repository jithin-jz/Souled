const Loader = () => {
    return (
      <div className="flex justify-center items-end py-20 space-x-1">
        <div className="w-1 h-4 bg-red-500 animate-[bounce_0.6s_infinite]"></div>
        <div className="w-1 h-6 bg-red-500 animate-[bounce_0.6s_infinite_100ms]"></div>
        <div className="w-1 h-8 bg-red-500 animate-[bounce_0.6s_infinite_200ms]"></div>
        <div className="w-1 h-6 bg-red-500 animate-[bounce_0.6s_infinite_300ms]"></div>
        <div className="w-1 h-4 bg-red-500 animate-[bounce_0.6s_infinite_400ms]"></div>
      </div>
    );
  };
  
  
  export default Loader;
  