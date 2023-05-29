
import { Image, View, Text, StyleSheet, Button, Pressable } from "react-native";
import { Product } from "../../models/Product";
import { Ionicons } from "@expo/vector-icons";


interface Props {
  productData: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void;
  numberOfProduct?: number,
  type?: string
}

const ProductCard = ({ productData, onAddToCart, onRemoveFromCart, numberOfProduct, type = "productList" }: Props) => {
  const handleAddToCart = () => {
    onAddToCart(productData);
  };

  const handleRemoveFromCart = () => {
    if (onRemoveFromCart) {
      onRemoveFromCart(productData);
    }
  };

  return (
    <View style={styles.container}>
      {productData?.img && (
        <Image style={styles.image} source={{ uri: productData.img }} />
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{productData?.name}</Text>
        <Text style={styles.price}>Price: ${productData?.price}/Pc</Text>
        {
          type === 'cartPage' &&
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable onPress={handleRemoveFromCart} testID="remove-button">
                <Text>
                  <Ionicons
                    name="remove-circle-outline"
                    size={45}
                    color="black"
                  />
                </Text>
              </Pressable>
              <Text style={{ marginHorizontal: 20, fontSize: 21 }}>
                {numberOfProduct}
              </Text>
              <Pressable onPress={handleAddToCart} testID="add-button">
                <Text>
                  <Ionicons name="add-circle-outline" size={45} color="black" />
                </Text>
              </Pressable>
            </View>
          </View>
        }
      </View>

      {
        type === 'productList' &&
        <View style={styles.buttonContainer}>
          <Button title="Add to Cart" onPress={handleAddToCart} testID="add-to-cart-button" />
        </View>
      }
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 120,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 10,
    flex: 1
  },
  contentContainer: {
    marginTop: 10,
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 8
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    marginRight: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "55%",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
