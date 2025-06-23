import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/meals" style={styles.link}>
            Meals
          </Link>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Meals App</p>
      </footer>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: "#282c34",
    padding: "1rem",
  },
  nav: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  main: {
    // padding: "2rem",
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
  },
};
