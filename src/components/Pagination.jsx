import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import { useRouter, useSearchParams } from "next/navigation";
import next from "next";

export const Paginator = ({ totalPages = 5 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("page") || 1;

  const handleNextPage = () => {
    const nex_page = Number(current);
    if (current < totalPages) {
      router.push(`?page=${nex_page + 1}`);
    }
  };

  const handlePreviousPage = () => {
    const previous = Number(current);
    if (previous !== 1) {
      router.push(`?page=${previous - 1}`);
    }
  };

  return (
    <>
      <div className="flex p-2 gap-x-2 items-center">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-500 flex gap-2 items-center group rounded-md px-4 font-bold text-white py-1"
        >
          <VscArrowLeft className="group-hover:-translate-x-1 transition-all" />{" "}
          Previous
        </button>
        <div className="">
          <span className="bg-gray-500 hover:bg-blue-300 cursor-pointer transition-all rounded-md  p-2">
            1
          </span>
        </div>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 flex gap-2 items-center group rounded-md px-4 font-bold text-white py-1"
        >
          Next{" "}
          <VscArrowRight className="group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </>
  );
};
