import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ButtonPagination = () => {
  const [photos, setPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const defaultImage = "https://via.placeholder.com/150";
  const photosPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${photosPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Button Pagination</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          photos.map((photo) => (
            <div key={photo.id} className="border rounded-lg overflow-hidden shadow">
              <img
                className="w-full h-40 object-cover"
                src={photo.url}
                alt={photo.title}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <p className="p-2 text-center">{photo.title}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ButtonPagination;
