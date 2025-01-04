
import upload from '../../assets/svg/upload.svg'

function UploadLoader({ currentItem, totalImages }) {
  const progress =
    totalImages.length > 0 ? (currentItem / totalImages) * 100 : 0;

  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <div className="text-primary">
      <img src={upload} alt="" />

      </div>
      <div className="flex flex-col justify-start items-start w-full space-y-2">
        <h1 className="text-lg font-medium text-gray-700">
          Uploading {currentItem}/{totalImages}
        </h1>

        <div className="min-w-[350px] max-w-[350px] h-[10px] bg-[#FAE8EF] rounded-[10px] border relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-[5px] bg-gradient-to-r from-primary to-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadLoader;
