"use client";

import { cn } from "@/lib/utils"
import type { PutBlobResult } from '@vercel/blob';

import { useState, useRef } from "react";

export default function FileInput({ required, className, disabled, value, accept, index, setFile } : { required?: boolean, className?: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, disabled?: boolean, value?: string, accept?: string, index?: number, setFile?: Function }) {
  const [loading, setLoading] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <input
    type="file"
    value={value}
    accept={accept}
    required={required}
    ref={inputFileRef}
    disabled={disabled || loading}
    className={cn("file:bg-black disabled:cursor-not-allowed file:text-white file:p-2 file:text-sm hover:file:bg-off-black file:disabled:bg-off-black file:disabled:cursor-not-allowed file:font-heading file:border-none file:transition-all", className)}
    onChange={async (event) => {
      event.preventDefault();

      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const response = await fetch(
        `/api/jobs/upload?filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        },
      );

      const newBlob = (await response.json()) as PutBlobResult;

      setFile && setFile("Resume", newBlob.url, index, "F");
      setLoading(false);
    }}
    />
  )
}