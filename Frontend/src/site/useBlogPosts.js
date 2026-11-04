import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// One Firestore read per visit, shared by the footer, home, media and blog pages.
let request = null;

function loadPosts() {
  if (!request) {
    request = getDocs(query(collection(db, 'blogs'), orderBy('date', 'desc')))
      .then((snapshot) => snapshot.docs
        .map((doc) => doc.data())
        // Same order as the blog page has always used: newest date first.
        .sort((a, b) => new Date(b.date) - new Date(a.date)))
      .catch((error) => {
        console.error('Error fetching blogs from Firebase:', error);
        request = null; // allow a retry on the next page
        return [];
      });
  }
  return request;
}

/** Returns { posts, loading }. Posts are sorted newest first. */
export default function useBlogPosts() {
  const [state, setState] = useState({ posts: [], loading: true });
  useEffect(() => {
    let alive = true;
    loadPosts().then((posts) => { if (alive) setState({ posts, loading: false }); });
    return () => { alive = false; };
  }, []);
  return state;
}

/** "August 24, 2026" -> "2026-08-24" for <time datetime>, or undefined if the date can't be read. */
export function isoDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
