import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "resolutecorp-web",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testDelete() {
  try {
    const slug = 'test-post-table-and-image';
    await deleteDoc(doc(db, "blogs", slug));
    console.log("✅ Successfully deleted document:", slug);
  } catch (error) {
    console.error("❌ Error deleting document:", error);
  }
  process.exit(0);
}

testDelete();
