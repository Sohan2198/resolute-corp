import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAs-...", // This isn't needed for basic admin script if auth allows read/write
  projectId: "resolutecorp-web",
};

// We can just use the web SDK for a quick test since security rules are open
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addTestPost() {
  const testPost = {
    slug: 'test-post-table-and-image',
    title: 'Test Post: Table and Image',
    author: 'AI Agent',
    date: 'August 24, 2026',
    category: 'Test',
    banner: '/assets/blog/BicycleLaunchpad.jpg', // Re-using an existing image
    excerpt: 'This is a test post to verify that tables and images render correctly with Tailwind Typography.',
    content: `
      <h2>Welcome to the Test Post</h2>
      <p>This post verifies that our new <b>Tailwind Typography</b> plugin correctly styles raw HTML elements like tables, lists, and images.</p>
      
      <h3>1. Testing a Table</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          <tr>
            <th style="border: 1px solid #000; padding: 10px; text-align: left;">City</th>
            <th style="border: 1px solid #000; padding: 10px; text-align: left;">Emerging Strength</th>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 10px;">Bengaluru</td>
            <td style="border: 1px solid #000; padding: 10px;">AI, Software, Global Capability Centres</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 10px;">Hyderabad</td>
            <td style="border: 1px solid #000; padding: 10px;">Life Sciences, Pharma, Technology</td>
          </tr>
        </tbody>
      </table>

      <h3>2. Testing an Image</h3>
      <p>Below is an image embedded directly into the content:</p>
      <img src="/assets/blog/SaaS.jpg" alt="SaaS image" />
      
      <p>End of test post.</p>
    `
  };

  try {
    await setDoc(doc(db, "blogs", testPost.slug), testPost);
    console.log("✅ Test post created successfully! Go to http://localhost:3000/blog/test-post-table-and-image");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding test post:", error);
    process.exit(1);
  }
}

addTestPost();
