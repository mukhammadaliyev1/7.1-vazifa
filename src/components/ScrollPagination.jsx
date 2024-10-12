import React, { useState, useEffect } from "react";

const ScrollPagination = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const defaultImage = "https://via.placeholder.com/150";
  const photosPerPage = 10;

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${photosPerPage}`
      );
      const data = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      setLoading(false);
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scroll Pagination</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="border rounded-lg overflow-hidden shadow">
            <img
              className="w-full h-40 object-cover"
              src={photo.url}
              alt={photo.title}
              onError={(e) => (e.target.src = defaultImage)}
            />
            <p className="p-2 text-center">{photo.title}</p>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default ScrollPagination;
