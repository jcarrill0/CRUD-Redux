import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux 
import { Provider } from 'react-redux';
import store from './store';

// Componentes
import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

function App() {
  return (
    <Router>
      <Provider store={store}>
        {/* El header se necesita en todas las paginas por eso esta fuera del switch */}
          <Header />
          <div className="container">
              {/* Todo lo que esta dentro del switch va ser exclusivo de cada una de las paginas */}
              <Switch>
                  <Route exact path="/" component={Productos} />
                  <Route exact path="/productos/nuevo" component={NuevoProducto} />
                  <Route exact path="/productos/editar/:id" component={EditarProducto} />
              </Switch>
          </div>
      </Provider>
    </Router>
  );
}

export default App;
