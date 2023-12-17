export const ToolTip = ({ text, icon }) => {
  return (
    <>
      <div className="relative">
        <button
          type="button"
          data-placement="top"
          data-target="tooltip_trigger"
          className="inline-block peer px-6 py-3 "
        >
          {icon}
        </button>
        <div className="hidden transition-all duration-100 z-50 w-[5rem] px-2 py-1 text-center text-white globle-bg rounded-lg max-w-46 text-sm  peer-hover:block -top-10 right-0 absolute">
          <div className="" id="tooltip" role="tooltip" data-target="tooltip">
            {text}
            <div
              id="arrow"
              className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
              data-popper-arrow
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
