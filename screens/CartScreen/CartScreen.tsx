import { SafeAreaView } from "react-native-safe-area-context";
import CartView from "../../components/cart/CartView";


const CartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <CartView />
    </SafeAreaView>
  );
};

export default CartScreen;
