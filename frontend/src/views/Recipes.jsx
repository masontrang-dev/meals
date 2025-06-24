export default function Recipes() {
  return (
    <div style={styles.recipes}>
      <div>Recipes</div>
    </div>
  );
}

const styles = {
  recipes: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
};
