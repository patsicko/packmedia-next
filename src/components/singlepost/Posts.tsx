import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where , Timestamp } from 'firebase/firestore';
import React from 'react';

type Post = {
  id: string;
  image: string;
  caption: string;
  username: string;
  timestamp: Timestamp;
  profileImg: string;
}

type Props = {
  id: string;
}

class Page extends React.Component<Props> {
  state = {
    data: [] as Post[]
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const db = getFirestore(app);
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), where('id', '==', this.props.id));
      const querySnapshot = await getDocs(q);

      const postData: Post[] = [];

      querySnapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() } as Post);
      });

      this.setState({ data: postData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    return (
      <div>
        {this.state.data.map((post) => (
          <div key={post.id}>
            <div>{post.id}</div>
            <span className='font-bold mr-2'>{post.username}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Page;
