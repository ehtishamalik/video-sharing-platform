"use client";

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFileInput } from "@/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { addVideoDetails } from "@/lib/actions/video";

const Upload = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    visibility: "public" | "private";
  }>({
    title: "",
    description: "",
    visibility: "public",
  });

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const abortController = new AbortController();

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const checkForRecordedVideo = async () => {
      try {
        const stored = sessionStorage.getItem("recordedVideo");
        if (!stored) return;

        const { url, name, type } = JSON.parse(stored);
        const blob = await fetch(url).then((res) => res.blob());

        const file = new File([blob], name, { type, lastModified: Date.now() });

        if (video.inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          video.inputRef.current.files = dataTransfer.files;

          const event = new Event("change", { bubbles: true });
          video.inputRef.current.dispatchEvent(event);

          video.handleFileChange({
            target: { files: dataTransfer.files },
          } as ChangeEvent<HTMLInputElement>);
        }
        sessionStorage.removeItem("recordedVideo");
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error accessing recorded video:", error);
      }
    };

    checkForRecordedVideo();
  }, [video]);

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!video.file || !thumbnail.file) {
      setError("Both video and thumbnail files are required");
      return;
    }
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setIsSubmitting(true);
      const thumbnailAuth = await authenticator();
      const thumbnailUploadResponse = await upload({
        expire: thumbnailAuth.expire,
        token: thumbnailAuth.token,
        signature: thumbnailAuth.signature,
        publicKey: thumbnailAuth.publicKey,
        file: thumbnail.file,
        fileName: thumbnail.file.name,
        onProgress: (event) => {
          setProgress((prev) => (prev += (event.loaded / event.total) * 100));
        },
        abortSignal: abortController.signal,
      });

      const videoAuth = await authenticator();
      const videoUploadResponse = await upload({
        expire: videoAuth.expire,
        token: videoAuth.token,
        signature: videoAuth.signature,
        publicKey: videoAuth.publicKey,
        file: video.file,
        fileName: video.file.name,
        onProgress: (event) => {
          setProgress((prev) => (prev += (event.loaded / event.total) * 100));
        },
        abortSignal: abortController.signal,
      });
      await addVideoDetails({
        title: formData.title,
        description: formData.description,
        thumbnailUrl: thumbnailUploadResponse.url || "",
        videoUrl: videoUploadResponse.url || "",
        videoId: videoUploadResponse.fileId || "",
        visibility: formData.visibility,
        duration:
          "duration" in videoUploadResponse
            ? (videoUploadResponse.duration as number)
            : null,
      });
      console.log(thumbnailUploadResponse);
      console.log(videoUploadResponse);

      thumbnail.resetFile();
      video.resetFile();
      setProgress(0);
      setFormData({
        title: "",
        description: "",
        visibility: "public",
      });
      setSuccess("Video uploaded successfully!");
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
      setError("Failed to upload video. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>

      {!success && error && <div className="error-field">{error}</div>}
      {success && <div className="success-field">{success}</div>}

      <form
        onSubmit={handleSubmit}
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
      >
        <FormField
          id="title"
          label="Title"
          placeholder="Enter a clear and concise title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <FormField
          id="description"
          label="Description"
          placeholder="Describe what this video is about"
          as="textarea"
          value={formData.description}
          onChange={handleInputChange}
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="Visibility"
          placeholder="Select the visibility of the video"
          as="select"
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
          value={formData.visibility}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload Video"}
        </button>
        {isSubmitting && (
          <progress
            value={progress - 10}
            max={200}
            className="w-full"
          ></progress>
        )}
      </form>
    </div>
  );
};

export default Upload;
