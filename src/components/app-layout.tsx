import { Outlet } from "react-router-dom";

export const AppLayout: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Top Movies</h1>
        <nav>
          <ul>
            <li>
              <a href='/'>Movies</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className='p-4'>
        <Outlet />
      </main>
    </div>
  );
};
