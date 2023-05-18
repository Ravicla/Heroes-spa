const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../src/auth/context/AuthContext");
const { PublicRouter } = require("../../src/router/PublicRouter");
const { MemoryRouter, Route, Routes } = require("react-router-dom");

describe('pruebas en PublicRouter', () => {

  test('debe de mostrar el children si no esta autenticado', () => {

    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRouter>
          <h1>Ruta publica</h1>
        </PublicRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta publica')).toBeTruthy();
  });

  test('debe de navegar si esta autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        name: 'Strider',
        id: 'ABC123'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>

          <Routes>
            <Route path="login" element={
              <PublicRouter>
                <h1>Ruta publica</h1>
              </PublicRouter>
            } />
            <Route path='marvel' element={ <h1>Pagina Marvel</h1> } />
          </Routes>

        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Pagina Marvel')).toBeTruthy();

    

  })

});