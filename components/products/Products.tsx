import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from "react-native";
import { setProducts } from "../../redux/productsSlice";
import ProductCard from "./ProductCard";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../redux/store";
import { getNumItems } from "../../redux/cartSlice";
import axios, { AxiosResponse } from "axios";
import { Product } from "../../models/Product";


interface Props {
  onNavigateToCart: () => void;
}


export function ProductsView({ onNavigateToCart }: Props) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productsSlice.products);
  const numItems = useSelector(getNumItems);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product.id));
  };

  useEffect(() => {
    const getData = async () => {
      axios.get('https://my-json-server.typicode.com/benirvingplt/products/products').then((response: AxiosResponse<Product[]>) => {

        const products: Product[] = response.data;
        dispatch(setProducts(products));
      });
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Pressable onPress={onNavigateToCart} testID="navigate-to-cart-button">
            <Text>🛒&nbsp;&nbsp;{numItems ? numItems : "Cart"}</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard productData={item} onAddToCart={handleAddToCart} />
        )}
        style={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F8",
    height: "100%",
  },
});
