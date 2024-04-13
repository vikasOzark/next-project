const PricingBgGradient = ({ children, isFocused = false }) => {
    return (
        <>
            <div className="relative inline-flex  group">
                <div
                    className={`absolute z-[-171] transition-all duration-1000 inset-[1.75rem] bg-gradient-to-tl from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-xl group-hover:opacity-50 group-hover:-inset-1 group-hover:duration-200`}
                ></div>
                {children}
            </div>
        </>
    );
};

export default PricingBgGradient;
