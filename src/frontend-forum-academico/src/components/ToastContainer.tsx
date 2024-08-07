import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css'; // Importando os estilos personalizados

const CustomToastContainer: React.FC = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default CustomToastContainer;

// exemplo de uso
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//     const notifySuccess = () => toast.success("Login realizado com sucesso!");
//     const notifyError = () => toast.error("Erro ao realizar login!");
//     const notifyWarning = () => toast.warn("Atenção! Verifique seus dados.");
