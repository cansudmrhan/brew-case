import { useState } from "react";
import Chevron from "./Chevron";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const normalizeTitle = (title) => {
  if (title.length >= 30) {
    return title.slice(0, 27) + "...";
  }

  return title;
};

const Card = ({ book }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((o) => !o);

  return (
    <>
      <Accordion
        className="bg-zinc-200 rounded-md text-white px-2"
        open={open}
        icon={<Chevron open={open} />}
      >
        <AccordionHeader
          className="truncate text-base"
          onClick={handleOpen}
          title={book.title}
        >
          {normalizeTitle(book.title)}
        </AccordionHeader>
        <AccordionBody
          className={`${open ? "" : "hidden"} text-white text-sm pt-0`}
        >
          <div className="flex justify-between text-xs">
            <div className="bg-green-500 rounded p-1 mb-3">
              {book.edition_count} Editions
            </div>
            <div className="p-1 text-gray-50">
              First Published: {book.first_publish_year}
            </div>
          </div>
          <div className="flex gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              />
            </svg>
            {book.number_of_pages_median} Pages
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );

  /* return (
    <div className="w-100 bg-zinc-200 rounded-md text-white px-2 py-3">
      <div className="flex justify-between">
        <div className="title text-sm truncate font-semibold max-w-sm">
          {book.title}
        </div>
        <ChevronRight />
      </div>

      <div className="flex text-sm text-black">
        {book.edition_count} Editions
      </div>
      <div className="flex text-sm text-white">
        First Published:{book.first_publish_year}
      </div>
      <div className="flex text-sm text-white">
        {book.number_of_pages_median} Pages
      </div>
    </div>
  ) */
};

export default Card;
