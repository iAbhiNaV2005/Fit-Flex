import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

const ExerciseCard = ({ exercise }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      setError(false);
      try {
        const endpoint = `image?resolution=360&exerciseId=${exercise.id}`;
        const response = await apiFetch(endpoint);

        if (!response || typeof response.blob !== "function") {
          throw new Error("Invalid response object for image");
        }

        const imageBlob = await response.blob();
        if (imageBlob.size < 100) {
          throw new Error("Image data is too small or invalid");
        }

        const localUrl = URL.createObjectURL(imageBlob);
        setImageUrl(localUrl);
      } catch (err) {
        console.error(
          `Could not fetch image for exercise ${exercise.id}:`,
          err.message
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // The dependency array ensures this effect runs only when the exercise ID changes.
  }, [exercise.id]);

  const renderImage = () => {
    if (loading)
      return (
        <div className="w-full h-56 flex items-center justify-center bg-gray-200 animate-pulse">
          <p className="text-gray-500 text-sm">Loading Image...</p>
        </div>
      );
    // If an error occurred, we now show the "Image Failed" placeholder.
    if (error || !imageUrl)
      return (
        <img
          src={`https://placehold.co/300x300/e0e0e0/757575?text=Image+Failed`}
          alt={exercise.name}
          className="w-full h-56 object-cover"
        />
      );
    return (
      <img
        src={imageUrl}
        alt={exercise.name}
        className="w-full h-56 object-cover"
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group">
      <div className="relative">{renderImage()}</div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 capitalize mb-2 flex-grow">
          {exercise.name}
        </h3>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            {exercise.bodyPart}
          </span>
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            {exercise.target}
          </span>
          <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            {exercise.equipment}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
