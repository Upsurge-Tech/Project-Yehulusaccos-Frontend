import { useTranslations } from "next-intl";
import Image from "next/image";
import FadeIn from "../animation/FadeIn";
import SlideFrom from "../animation/SlideFrom";

const SavingServices = () => {
  const tSavingServices = useTranslations("Services.SavingServices");
  const tSavingList = useTranslations(
    "Services.SavingServices.SavingServicesList"
  );
  const savingServices = [
    "service1",
    "service2",
    "service3",
    "service4",
    "service5",
    "service6",
    "service7",
    "service8",
  ];

  return (
    <div className="flex flex-col w-full gap-y-10 mt-16">
      <div className="flex flex-col  items-center w-full">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {tSavingServices("Header")}
        </div>
        <FadeIn className="">
          <h2 className="font-semibold text-center mt-5 text-2xl lg:text-4xl max-w-xl">
            {tSavingServices("Title")}
          </h2>
        </FadeIn>
        <div className="hidden lg:flex relative -rotate-45 bottom-10 top-0 left-[130px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={60}
            height={100}
          />
        </div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-10 mt-10  gap-y-7 xl:gap-x-36 xl:gap-y-16">
          {savingServices.map((ss, i) => (
            <SlideFrom
              className=""
              key={i}
              from={i % 2 === 0 ? "left" : "right"}
            >
              <div
                key={tSavingList(`${ss}.title`)}
                className="flex justify-center  items-center lg:items-start gap-5 xl:gap-y-20 w-full "
              >
                <div className=" flex w-3/4 xl:w-full gap-x-4">
                  <Image
                    src={tSavingList(`${ss}.image`)}
                    width={40}
                    height={30}
                    className="self-start"
                    alt="three circles"
                  />
                  <div className="flex flex-col gap-y-2">
                    <h3 className="text-lg font-semibold">
                      {tSavingList(`${ss}.title`)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {tSavingList(`${ss}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            </SlideFrom>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingServices;
