import React from 'react';

const MovieCard = ({
  movie: {
    title,
    poster_path,
    vote_average,
    release_date,
    original_language,
    // overview,
    // popularity,
  },
}) => {
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Months are 0-indexed in JavaScript
    return date.toLocaleString('default', { month: 'long' });
  };
  const getFormattedDate = (dateString) => {
    if (!dateString) return 'N/A';

    const [year, month] = dateString.split('-');
    const monthName = getMonthName(parseInt(month, 10));
    return `${monthName} ${year}`;
  };
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? ` https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/no-movie.png'
        }
        alt={title}
      />
      {/* <p className="text-white">{title}</p>; */}
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="staricon" />
            <p> {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>.</span>
          <p className="lang">{original_language}</p> <span>.</span>
          {/* <p className="year">
            {' '}
            {release_date ? release_date.split('-')[0 , 1] : 'N/A'}
          </p> */}{' '}
          <p className="year">{getFormattedDate(release_date)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
