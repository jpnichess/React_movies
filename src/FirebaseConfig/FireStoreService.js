// src/FireStoreService.js
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  limit,
  setDoc,
} from "firebase/firestore";
import { db } from "./FireBase";
import { Query } from "appwrite";

const searchesCollection = collection(db, "searches");

export async function updateSearchCount(searchTerm, movie) {
  try {
    const q = query(searchesCollection, where("searchTerm", "==", searchTerm));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docData = querySnapshot.docs[0].data();
      await updateDoc(docRef, {
        count: docData.count + 1,
      });
    } else {
      await setDoc(doc(searchesCollection), {
        searchTerm,
        count: 1,
        movie,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar a contagem de buscas:", error);
  }
}


export const getTrendingMovies = async () => {
  try {
    const q = query(collection(db, "searches"), orderBy("count", "desc"), limit(5));
    const querySnapshot = await getDocs(q);

    const movies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return movies;
  } catch (error) {
    console.error("Erro ao encontrar os filmes mais buscados:", error);
    return [];
  }
};