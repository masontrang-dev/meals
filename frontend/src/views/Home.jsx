export default function Home() {
  return (
    <div style={styles.home}>
      <button style={styles.startButton}>Start</button>
    </div>
  );
}

const styles = {
  home: { display: "flex", justifyContent: "center", backgroundColor: "blue" },
  startButton: { color: "red", fontSize: "90px" },
};
