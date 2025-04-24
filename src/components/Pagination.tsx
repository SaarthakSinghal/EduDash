"use client";

import { useRouter } from "next/navigation";
import { ITEM_PER_PAGE } from "src/lib/settings";

const Pagination = ({ page, count }: { page: number; count: number }) => {

  const router = useRouter();

  // Here, we have extracted all the params from the current URL so that we can update the page number when the user clicks on a page number. but not change the other parameters.
  const changePage = (newPage: number) => {
    console.log("Page:", newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
      <button
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {/* The Array.from() method creates a new array from an iterable object, the first argument is the length of the array, then the second argument is the callback function whose arguments are value and index. In out example, we are creating an array of numbers from 1 to Math.ceil(count / ITEM_PER_PAGE), and the (_,i) syntax is a destructuring assignment that assigns the current value to _ and the index to i. We denoted the value by _ because we don't need to use it in the callback function.  */}
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => {

          const Page = i + 1;

          return (
            <button
              key={Page}
              className={`rounded-full px-4 py-2 ${page === Page ? "bg-lamaSky" : ""}`}
              onClick={() => changePage(Page)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <button
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page + 1)}
        disabled={page === Math.ceil(count / ITEM_PER_PAGE) || count === 0}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
