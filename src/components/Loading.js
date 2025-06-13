export default function Loading() {
  return (
    <div>
      <div className="loader book relative w-[60px] h-[45px] border-4 border-purple-700 mx-auto mt-[5%] mb-[30px] perspective">
        <div className="page absolute w-[30px] h-[45px] border-4 border-purple-700 border-l-purple-400 right-[-4px] top-[-4px] bg-purple-400 page1"></div>
        <div className="page absolute w-[30px] h-[45px] border-4 border-purple-700 border-l-purple-400 right-[-4px] top-[-4px] bg-purple-400 page2"></div>
        <div className="page absolute w-[30px] h-[45px] border-4 border-purple-700 border-l-purple-400 right-[-4px] top-[-4px] bg-purple-400 page3"></div>
      </div>

      <h1 className="text-purple-700 text-center font-sans uppercase text-[20px] relative reading-title">
        Reading...
      </h1>
    </div>
  );
}
