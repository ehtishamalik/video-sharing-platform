"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setSearch(initialQuery);
  }, [searchParams]);

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");

    router.push(`?${params.toString()}`);
    setSearch("");
  };

  return (
    <form method="GET" action="/" className="search relative">
      <input
        type="text"
        name="query"
        placeholder="Search for videos, tags, folders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pr-8"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={16}
          height={16}
        />
      </button>
      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
        >
          ✕
        </button>
      )}
    </form>
  );
};

export default SearchInput;
