import Button from "../Button";

const HeadCard = ({ item }) => {
  return (
    <div
      key={item.id}
      className="bg-gradient-to-br from-[#2b4162] to-[#12100e] w-[19rem] max-lg:w-full h-full max-sm:px-4 px-6 py-10 border-2 border-n-8 rounded-3xl lg:w-auto even:py-14 odd:py-10 odd:my-6 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <h4 className="h4 mb-6 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
        {item.title}
      </h4>

      {item.price && (
        <div className="mb-6 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white px-4 py-2 rounded-full text-sm font-semibold text-center animate-pulse">
          🎉 Special Price Valid for 24 Hours Only! 🎉
        </div>
      )}

      <div className="flex items-center h-[5.5rem] mb-8">
        {item.price && (
          <>
            <div className="h3 text-white">$</div>
            <div className="text-[5.5rem] leading-none font-bold bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
              {item.price}
              <span className="text-[3rem] text-gray-300">/mon</span>
            </div>
          </>
        )}
      </div>

      {item.originalPrice && (
        <div className="text-lg text-gray-400 line-through mb-4">
          Original Price: ${item.originalPrice}
        </div>
      )}

      {item.price && (
        <div className="animate-bounce text-lg text-green-400 font-semibold mb-6">
          Special Price: ${item.price} (Save ${item.originalPrice - item.price})
        </div>
      )}

      <a
        href="#pricing"
        className="border-2 text-center block w-full bg-gradient-to-r from-[#1a2a6c] to-[#b21f1f] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#1a2a7c] hover:to-[#b21f2f] transition-all duration-300 transform hover:scale-105"
      >
        Start Now
      </a>
    </div>
  );
};

export default HeadCard;
