import React from 'react';

import UploadFiles from './components/UploadFiles'

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (<>

    <div className="App">
      <div className="container" style={{ width: "600px" }}>
        <div >
          <img style={{ width: '100px', height: '100px' }} src={require('./assets/logo.png')} alt="" />
        </div>

        <h1>File Upload React Application</h1>



        <div className="my-3">
          <h3>@Oracions</h3>
          <h4>Upload your files</h4>
        </div>

        <UploadFiles />
      </div>

    </div>

  </>)
}

export default App;
