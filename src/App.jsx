// // import LandingPage from './components/landing-page'
// import LoginScreen from './components/login'
// // import Navbar from './components/navbar'
// import './App.css'
// import Footer from './components/footer'
// // import 'bootstrap/dist/css/bootstrap.min.css';



// function App() {

//   return (
//     <div className="App">
//       {/* <div className='app1'>
//      <Navbar/>
//       </div> */}
      
//       <div className='app2'>
//       <LoginScreen/>
//       </div>

//       <div className='app3'>
//       <Footer/>
//       </div>

//     </div>
//   )
// }

// export default App

//---------------------------

// import { AnimatePresence, motion } from "framer-motion";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import LoginScreen from "./components/login";
// import Dashboard from "./components/Dashboard";
// // import Leitores from "./components/Leitores";
// import Emprestimos from "./components/Emprestimos";
// // import Acervo from "./components/Acervo";
// import Devolucoes from "./components/Devolucoes";

// // import Footer from "./components/footer";
// import "./App.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">

//         <Routes>
//           <Route path="/" element={<LoginScreen />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* <Route path="/leitores" element={<Leitores />} /> */}
//           <Route path="/emprestimos" element={<Emprestimos />} />
//           {/* <Route path="/acervo" element={<Acervo />} /> */}
//           <Route path="/devolucoes" element={<Devolucoes />} />
//         </Routes>

//         {/* <Footer /> */}
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LoginScreen from "./components/login";
import Dashboard from "./components/Dashboard";
import Emprestimos from "./components/Emprestimos";
import Usuarios from "./components/Usuarios";
// import Usuarioss from "./components/";

import AcervoPage from "./components/AcervoPage";



// import Acervo from "./components/Acervo";
import Devolucoes from "./components/Devolucoes";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // key={location.pathname}
        // initial={{ opacity: 0, x: 30 }}
        // animate={{ opacity: 1, x: 0 }}
        // exit={{ opacity: 0, x: -30 }}
        // transition={{ duration: 0.3 }}

        key={location.pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/Leitores" element={<Usuarios />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/Acervo" element={<AcervoPage />} />
          <Route path="/devolucoes" element={<Devolucoes />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;