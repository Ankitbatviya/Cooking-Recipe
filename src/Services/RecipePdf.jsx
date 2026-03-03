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
    backgroundColor: "#EFECE3",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: "#8FABD4",
    paddingBottom: 20,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    color: "#4A70A9",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: "#8FABD4",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A70A9",
    marginTop: 15,
    marginBottom: 8,
    borderBottom: 2,
    borderBottomColor: "#8FABD4",
    width: "100%",
    paddingBottom: 4,
  },
  ingredientsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 8,
  },
  ingredientCard: {
    width: "48%",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 6,
    borderWidth: 1,
    borderColor: "#8FABD4",
  },
  ingredientImage: {
    width: 30,
    height: 30,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: "#EFECE3",
  },
  ingredientText: {
    flex: 1,
    fontSize: 9,
    color: "#000000",
    lineHeight: 1.4,
  },
  text: {
    lineHeight: 1.6,
    color: "#000000",
    textAlign: "justify",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#8FABD4",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: 2,
    borderTopColor: "#8FABD4",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#4A70A9",
    fontSize: 9,
  },
  footerText: {
    color: "#4A70A9",
  },
  accentText: {
    color: "#8FABD4",
  },
});

// Convert ingredient name to Title Case for MealDB image URLs
// e.g. "soy sauce" → "Soy%20Sauce", "ground ginger" → "Ground%20Ginger"
const toIngredientImageName = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("%20");

const RecipePdf = ({ meal }) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure,
        imageName: toIngredientImageName(ingredient),
      });
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

        {/* Ingredients Section with Images */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsGrid}>
          {ingredients.map((item, index) => (
            <View key={index} style={styles.ingredientCard}>
              <Image
                src={`https://www.themealdb.com/images/ingredients/${item.imageName}-Small.png`}
                style={styles.ingredientImage}
              />
              <Text style={styles.ingredientText}>
                • {item.measure} {item.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Instructions Section */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>
          {meal.strInstructions.replace(/\r\n/g, "\n")}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Recipe generated from TheMealDB</Text>
          <Text style={styles.footerText}>
            Created by: <Text style={styles.accentText}>Ankit Batviya</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default RecipePdf;