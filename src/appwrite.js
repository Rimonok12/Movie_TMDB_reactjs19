import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

// export const updateSearchCount = async (searchTerm, movie) => {
//   // 1. Use Appwrite SDK to check if the search term exists in the database
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.equal('searchTerm', searchTerm),
//     ]);

//     // 2. If it does, update the count
//     if (result.documents.length > 0) {
//       const doc = result.documents[0];

//       await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//         popularity: doc.popularity + 1,
//       });
//       // 3. If it doesn't, create a new document with the search term and count as 1
//     } else {
//       await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         searchTerm,
//         popularity: 1,
//         movie_id: movie.id,
//         poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Check if the searchTerm exists in the database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    console.log('Search Term Result:', result); // Log the result of the query

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      console.log('Found Document:', doc); // Log the document being updated

      // Update the popularity count
      const updatedDoc = await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        {
          popularity: doc.popularity + 1,
        }
      );
      console.log('Updated Document:', updatedDoc); // Log the updated document
    } else {
      // Create a new document with popularity = 1
      const createdDoc = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          popularity: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
      console.log('Created Document:', createdDoc); // Log the created document
    }
  } catch (error) {
    console.error('Error in updateSearchCount:', error); // Log any errors
  }
};

export const getTrendingMovies = async () => {
  try {
    console.log('Fetching trending movies...'); // Debugging line
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('popularity'),
    ]);

    console.log('Fetched trending movies result:', result); // Debugging line
    return result.documents || []; // Return an empty array if no documents
  } catch (error) {
    console.error('Error fetching trending movies:', error); // Improved error message
    return []; // Ensure it returns an empty array if error occurs
  }
};
