import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function MainLayout() {
  const [showFooter, setShowFooter] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setShowFooter(false); // scrolling down
      } else {
        setShowFooter(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="main-layout" style={styles.layout}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/meals" style={styles.link}>
            Meals
          </Link>
          <Link to="/recipes" style={styles.link}>
            Recipes
          </Link>
          <Link to="/groceries" style={styles.link}>
            Groceries
          </Link>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>

      <footer
        style={{
          ...styles.footer,
          transform: showFooter ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
          height: "auto",
        }}
      >
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Meals App</p>
      </footer>
    </div>
  );
}

const styles = {
  layout: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  header: {
    backgroundColor: "#282c34",
    padding: "1rem",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
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
    padding: "1rem",
    paddingTop: "5rem", // space for header
    paddingBottom: "1rem", // space for footer
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  footer: {
    textAlign: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#f5f5f5",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    boxSizing: "border-box",
  },
};
