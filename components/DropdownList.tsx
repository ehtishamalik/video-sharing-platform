"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const filterOptions = [
  "Most Recent",
  "Oldest First",
  "Most Viewed",
  "Least Viewed",
];

const DropdownList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", option);
    router.push(`?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="filter-trigger">
          <figure>
            <Image
              src="/assets/icons/hamburger.svg"
              alt="menu"
              width={14}
              height={14}
            />
            Most Recent
          </figure>
          <Image
            src="/assets/icons/arrow-down.svg"
            alt="arrow down"
            width={20}
            height={20}
          />
        </div>
      </div>

      {isOpen && (
        <ul className="dropdown">
          {filterOptions.map((option) => (
            <li
              key={option}
              className="list-item cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
