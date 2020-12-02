import './App.css';
import './budgetFormatting.css'
//import './bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <body>
        <br></br>
        <br></br>
        <h1>Budget Manager</h1>
        <h1>Pro</h1>
        <br></br>

        <h6>A place to organize finances to ensure that they are within their financial scopes.</h6>
        <div className="white-box">
            <form className="box" action="" method="post">
              <p id="loginResult"></p>
            
              <input type="text" id="loginName" placeholder="email"></input>
              <input type="password" id="loginPassword" placeholder="Password"></input>
            
              <a href>Forgot password...</a>
              <br></br>
              <a href>Sign up</a>

              <button id="loginButton" onclick="return alert('WOOOHOOO');">Login</button>
            </form>
        </div>
        </body>
      </div>
  );
}

export default App;
