import { SafeAreaView } from "react-native-safe-area-context";
import { ProductsView } from "../../components/products/Products";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const ProductScreen = () => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigateToCart = () => {
    rootNavigation.navigate("CartScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ProductsView onNavigateToCart={handleNavigateToCart} />
    </SafeAreaView>
  );
};

export default ProductScreen;
