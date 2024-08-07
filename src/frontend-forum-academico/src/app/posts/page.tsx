import './styles.css';

const Sidebar = () => (
  <div className="sidebar">
    {/* Adicione os ícones e links aqui */}
  </div>
);

const Post = () => (
  <div className="post">
    <div className="header">
      <span className="author">Luiz</span>
      <span className="date">18/07/2024</span>
    </div>
    <div className="content">
      Olá pessoal, tudo bem?
    </div>
    <div className="footer">
      <span className="likes">👍 2</span>
      <span className="comments">💬 17</span>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="container">
    <Sidebar />
    <main className="main">
    <div>
        <h1>Meus posts</h1>
        <Post/>
      </div>
    </main>
  </div>
  );
}
