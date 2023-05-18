import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRouter } from "../../src/router/PrivateRouter";
import { MemoryRouter } from "react-router-dom";

describe('pruebas en el PrivateRouter', () => {

  test('debe de mostrar el children si esta autenticado', () => {

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Juaan'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
       <MemoryRouter initialEntries={['/search?q=batman']}>
        <PrivateRouter>
            <h1>Ruta privada</h1>
          </PrivateRouter>
       </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta privada')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
  });

});