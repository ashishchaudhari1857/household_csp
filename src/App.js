import './App.css';
import { get, post } from './services/base';

function App() {

  async function createPost(authToken) {
    try {
      const body = { title: 'New Post', body: 'This is a new post.', userId: 1 };
      const data = await post(authToken, '/posts', body);
      console.log('Created Post:', data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  async function fetchPostById(postId) {
    try {
      const data = await get(null, `/posts/${101}`);
      console.log(`Post ${postId}:`, data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }
  
  createPost();
  fetchPostById()
  return (
    <div >
     <h1 className='text-red-100 '>ashish</h1>
    </div>
  );
}

export default App;
