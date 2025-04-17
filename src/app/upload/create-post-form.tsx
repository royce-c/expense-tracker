"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { createPost, getSignedURL } from "./actions";

import { Suspense } from "react";
import Loading from "@/components/loading";

export default function CreatePostForm({
  user,
}: {
  user: { name?: string | null; image?: string | null };
}) {
  let [content] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonDisabled = !file || loading;

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const MAX_FILE_SIZE_MB = 3;
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

  const handleFileUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error(
        `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB`
      );
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(
        `File type not allowed. Allowed types are: ${ALLOWED_FILE_TYPES.join(
          ", "
        )}`
      );
    }

    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
    });

    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }

    const { url, id: fileId } = signedURLResult.success;

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    return fileId;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file) {
        throw new Error("Please upload a file before posting.");
      }

      let body = "";
      let value = "Return the text content of the image";
      if (file) {
        const base64 = await convertFileToBase64(file);

        const contentForAI = [
          {
            type: "text",
            text: value,
          },
          {
            type: "image_url",
            image_url: {
              url: base64,
            },
          },
        ];
        body = JSON.stringify({ content: contentForAI });
      } else {
        body = JSON.stringify({ content: value });
      }

      let fileId: number | undefined = undefined;
      if (file) {
        setStatusMessage("Uploading...");
        fileId = await handleFileUpload(file);
      }

      const res = await fetch("/api/messages", {
        method: "POST",
        body: body,
      });
      const completionResult = await res.text();
      console.log("Completion Result:", completionResult);

      if (!res.ok || res.body === null) {
        throw new Error(res.statusText);
      }
      setStatusMessage("Posting post...");

      content = content + completionResult;

      await createPost({
        content,
        fileId: fileId,
      });

      setStatusMessage("Post Successful");
    } catch (error) {
      console.error(error);
      setStatusMessage(`Post failed ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <form
        className="border border-neutral-500 rounded-lg px-6 py-4"
        onSubmit={handleSubmit}
      >
        {statusMessage && (
          <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mb-4 rounded relative">
            {statusMessage}
          </p>
        )}

        <div className="flex gap-4 items-start pb-4 w-full">
          <div className="rounded-full h-12 w-12 overflow-hidden relative">
            <Image
              className="object-cover"
              src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
              alt={user.name || "user profile picture"}
              priority={true}
              fill={true}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div>{user.name}</div>

            {previewUrl && file && (
              <div className="mt-4">
                {file.type.startsWith("image/") ? (
                  <img src={previewUrl} alt="Selected file" />
                ) : file.type.startsWith("video/") ? (
                  <video src={previewUrl} controls />
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Separate section for file upload buttons to ensure proper centering */}
        <div className="flex flex-col items-center w-full mt-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="receipt-upload"
              className="flex flex-col gap-2 items-center"
            >
              <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl px-6 py-2 inline-flex items-center cursor-pointer transition-colors w-[220px] justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                {file ? "Change Receipt Image" : "Select Receipt Image"}
              </div>
              {!file && (
                <span className="text-sm text-neutral-500 text-center">
                  Make sure the photo is clear and the total amount is in frame.
                  Upload a clear photo of your receipt.
                </span>
              )}
              {file && (
                <span className="text-sm text-green-600 text-center">
                  ✓ Receipt selected: {file.name}
                </span>
              )}
            </label>
            <input
              id="receipt-upload"
              className="hidden"
              name="media"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col items-center mt-5 gap-3">
            <button
              type="submit"
              className={twMerge(
                "bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl px-6 py-2 transition-colors w-[220px] justify-center",
                buttonDisabled &&
                  "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
              )}
              disabled={buttonDisabled}
              aria-disabled={buttonDisabled}
            >
              {loading
                ? "Processing..."
                : !file
                ? "Please Select Receipt First"
                : "Upload Receipt"}
            </button>
          </div>
        </div>
      </form>
    </Suspense>
  );
}
