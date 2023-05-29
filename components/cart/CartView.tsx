import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import ProductCard from "../products/ProductCard";
import { RootState } from "../../redux/store";
import { Product } from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const CartView = () => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const products = useAppSelector((state) => state.productsSlice.products);
  const cart = useAppSelector((state) => state.cartSlice.items);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product.id));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product.id));
  };

  const handleGoBack = () => {
    rootNavigation.goBack();

  };

  useEffect(() => {
    const tempItems = products?.filter((product) => {
      if (product.id in cart) {
        return true;
      }
      return false;
    });

    setFilteredProducts(tempItems);
  }, [cart]);

  const getFinalPrice = () => {
    let totalValue: number = 0
    filteredProducts.map((item: Product) => {
      const itemQuantity = cart[item.id]
      totalValue = totalValue + ((item.price || 0) * itemQuantity)
    })
    return totalValue
  }

  const totalPrice = useMemo(() => getFinalPrice(), [filteredProducts])

  const footer = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>Total: </Text>
        <Text style={styles.titleStyle}>${totalPrice}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Pressable onPress={handleGoBack} testID="back-button">
            <Text>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Text>
          </Pressable>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>My Cart</Text>
          <Text style={styles.subtitle}>
            {filteredProducts?.length} items in your cart
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.rightIcon} />
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            productData={item}
            numberOfProduct={cart[item.id]}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            type="cartPage"
          />
        )}
        ListFooterComponent={filteredProducts.length > 0 ? footer : null}
      />
    </View>
  );
};

export default CartView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "gray",
  },

  navBar: {
    marginTop: 20,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: "contain",
  },
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});
