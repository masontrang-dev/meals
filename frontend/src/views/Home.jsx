export default function Home() {
  return (
    <div style={styles.home}>
      <div style={{ fontSize: 28, color: "white", marginBottom: 24 }}>
        Meal Planner for All
      </div>
      <button style={styles.startButton}>Start Planning</button>
      <div style={{ marginTop: 32 }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              background: i % 2 === 0 ? "#e3e3e3" : "#c3c3c3",
              padding: 16,
              margin: "8px 0",
              borderRadius: 8,
              color: "#222",
              fontWeight: 500,
            }}
          >
            Sample content row {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  home: {
    display: "flex",
    flexDirection: "column",
    // height: "100%",
    // justifyContent: "center",
    backgroundColor: "blue",
  },
  startButton: { color: "red", fontSize: "12px" },
};
