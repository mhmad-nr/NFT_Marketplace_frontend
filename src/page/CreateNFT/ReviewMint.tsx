type propsType = {
  image: string;
  name: string;
  description: string;
  onMint: () => void;
  onBack: () => void;
};

export const ReviewMint = ({
  onMint,
  description,
  image,
  name,
  onBack,
}: propsType) => {
  return (
    <>
      <div className="border flex-1 border-t-0 bg-[#3b4654] px-12 pb-8 rounded-xl border-C14 pt-12 relative overflow-hidden">
        <div className="w-full flex h-full justify-between flex-col items-center">
          <div className="w-full flex justify-center">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                <img className="w-60 h-60" src={image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <button onClick={onBack} className="btn btn-outline btn-error">
              Back
            </button>
            <button onClick={onMint} className={`btn btn-active btn-accent `}>
              Mint
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
