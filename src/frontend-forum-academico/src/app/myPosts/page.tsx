import 'stylescss';

const Sidebar = () => (
  <div className="sidebar">
    {/* Adicione os ícones e links aqui */}
  </div>
);

const Post = ({ author, date, content, likes, comments }) => (
  <div className="post">
    <div className="header">
      <span className="author">{author}</span>
      <span className="date">{date}</span>
    </div>
    <div className="content">
      {content}
    </div>
    <div className="footer">
      <span className="likes">👍 {likes}</span>
      <span className="comments">💬 {comments}</span>
    </div>
  </div>
);

const Layout = ({ children }) => (
  <div className="container">
    <Sidebar />
    <main className="main">
      {children}
    </main>
  </div>
);

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Meus posts</h1>
        <Post
          author="Zalter"
          date="04 feb 2024"
          content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
          likes={20}
          comments={17}
        />
        {/* Repita o componente <Post> para outras postagens */}
      </div>
    </Layout>
  );
}
