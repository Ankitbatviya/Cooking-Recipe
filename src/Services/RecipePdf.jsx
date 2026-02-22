import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: 20,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    color: "#7f8c8d",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e67e22",
    marginTop: 15,
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: "#f39c12",
    width: "100%",
  },
  ingredientsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  ingredientItem: {
    width: "50%",
    marginBottom: 4,
    paddingRight: 10,
  },
  text: {
    lineHeight: 1.6,
    color: "#34495e",
    textAlign: "justify",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: 1,
    borderTopColor: "#eeeeee",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#bdc3c7",
    fontSize: 9,
  },
});

const RecipePdf = ({ meal }) => {
  // Build ingredients list dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Title and Image */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.category}>
              {meal.strArea} • {meal.strCategory}
            </Text>
            <Text style={styles.title}>{meal.strMeal}</Text>
          </View>
          {meal.strMealThumb && (
            <Image src={meal.strMealThumb} style={styles.image} />
          )}
        </View>

        {/* Ingredients Section */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsGrid}>
          {ingredients.map((item, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.text}>• {item}</Text>
            </View>
          ))}
        </View>

        {/* Instructions Section */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>
          {meal.strInstructions.replace(/\r\n/g, "\n")}
        </Text>

        {/* Footer with Your Name */}
        <View style={styles.footer}>
          <Text>Recipe generated from TheMealDB</Text>
          <Text>Created by: Ankit Batviya</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RecipePdf;