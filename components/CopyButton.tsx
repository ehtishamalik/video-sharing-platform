"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const CopyButton = ({ id, size }: { id: string; size: number }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <button className="copy-btn z-20" onClick={handleCopyLink}>
      <Image
        src={copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"}
        alt="copy"
        width={size}
        height={size}
      />
    </button>
  );
};

export default CopyButton;
