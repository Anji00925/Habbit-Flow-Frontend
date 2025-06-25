// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Dashboard from './pages/Dashboard';
// // import AppNavbar from './components/Navbar';
// // import History from './pages/History';


// // function App() {
// //   return (
// //    <Router>
// //     <AppNavbar/>
// //       <Routes>
// //         <Route path="/" element={<Dashboard />} />
// //         <Route path="/history" element={<History />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Dashboard from './pages/Dashboard';
// import AppNavbar from './components/Navbar';
// import History from './pages/History';

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <Router>
//       <AppNavbar/>
//       <Routes>
//         <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
//         <Route path="/signin" element={token ? <Navigate to="/dashboard" /> : <SignIn />} />
//         <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <SignUp />} />
//         <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
//         <Route path="/history" element={<History />} />
//         {/* Add more protected routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AppNavbar from './components/Navbar';
import History from './pages/History';

import { AuthContext } from './context/AuthContext';

function App() {
  const { token } = useContext(AuthContext); // Live token from context

  return (
    <Router>
      {token && <AppNavbar />}
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/signin"} />} />
        <Route path="/signin" element={!token ? <SignIn /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!token ? <SignUp /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/history" element={token ? <History /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
