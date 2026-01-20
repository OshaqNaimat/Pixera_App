import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNavbar from "./BottomNavbar";

const { width, height } = Dimensions.get("window");

const MarketPlace = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mform, setMForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Products data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviewCount: 234,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop",
      category: "electronics",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life.",
      inStock: true,
      features: [
        "Bluetooth 5.0",
        "Noise Cancellation",
        "30hr Battery",
        "Foldable Design",
      ],
      tags: ["bestseller", "sale"],
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.2,
      reviewCount: 89,
      image: "https://m.media-amazon.com/images/I/71WqMgeCMlL._AC_SL1500_.jpg",
      category: "clothing",
      description:
        "Soft, breathable organic cotton t-shirt available in multiple colors.",
      inStock: true,
      features: ["100% Organic Cotton", "Machine Washable", "Multiple Colors"],
      tags: ["eco-friendly"],
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviewCount: 412,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop",
      category: "electronics",
      description:
        "Track your fitness goals with heart rate monitoring, GPS, and sleep tracking.",
      inStock: true,
      features: [
        "Heart Rate Monitor",
        "GPS",
        "Water Resistant",
        "7-day Battery",
      ],
      tags: ["bestseller", "new"],
    },
    {
      id: 4,
      name: "Ceramic Coffee Mug Set",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviewCount: 156,
      image:
        "https://lemonadeindia.com/cdn/shop/files/personalized-gift-box-pastel-neu-ceramic-coffee-mug-set-signaturehomelemonade-387193.png?v=1747335193",
      category: "home",
      description:
        "Set of 4 elegant ceramic mugs, perfect for your morning coffee or tea.",
      inStock: true,
      features: ["Set of 4", "Microwave Safe", "Dishwasher Safe"],
      tags: ["sale"],
    },
    {
      id: 5,
      name: "Leather Backpack",
      price: 149.99,
      rating: 4.4,
      reviewCount: 203,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop",
      category: "fashion",
      description:
        "Genuine leather backpack with laptop compartment and multiple pockets.",
      inStock: false,
      features: ["Genuine Leather", "Laptop Compartment", "Water Resistant"],
      tags: ["premium"],
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.6,
      reviewCount: 187,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6QU1r_I5jnQhr7m0d93jo09bs-22-QtA8sw&s",
      category: "sports",
      description:
        "Non-slip, eco-friendly yoga mat with carrying strap for easy transport.",
      inStock: true,
      features: ["Non-slip Surface", "Eco-friendly Material", "6mm Thickness"],
      tags: ["eco-friendly"],
    },
    {
      id: 7,
      name: "Wireless Mouse",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.3,
      reviewCount: 321,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop",
      category: "electronics",
      description:
        "Ergonomic wireless mouse with silent click and long battery life.",
      inStock: true,
      features: ["Wireless", "Ergonomic Design", "Silent Click", "2.4Ghz"],
      tags: ["sale"],
    },
    {
      id: 8,
      name: "Desk Lamp",
      price: 45.99,
      rating: 4.5,
      reviewCount: 98,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop",
      category: "home",
      description:
        "Modern LED desk lamp with adjustable brightness and color temperature.",
      inStock: true,
      features: [
        "Adjustable Brightness",
        "Color Temperature Control",
        "Touch Controls",
      ],
      tags: ["new"],
    },
  ];

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    {
      id: "electronics",
      name: "Electronics",
      count: products.filter((p) => p.category === "electronics").length,
    },
    {
      id: "clothing",
      name: "Clothing",
      count: products.filter((p) => p.category === "clothing").length,
    },
    {
      id: "home",
      name: "Home",
      count: products.filter((p) => p.category === "home").length,
    },
    {
      id: "fashion",
      name: "Fashion",
      count: products.filter((p) => p.category === "fashion").length,
    },
    {
      id: "sports",
      name: "Sports",
      count: products.filter((p) => p.category === "sports").length,
    },
  ];

  // Filter products based on category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render Stars for rating
  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name={i <= Math.floor(rating) ? "star" : "star-outline"}
            size={16}
            color="#FFD700"
          />
        ))}
        <Text style={styles.ratingText}>({rating})</Text>
      </View>
    );
  };

  // Product Card Component
  const ProductCard = ({ product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => setSelectedProduct(product)}
      activeOpacity={0.9}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </Text>
          </View>
        )}
        {product.tags?.includes("bestseller") && (
          <View style={styles.bestsellerBadge}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )}
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productCategory}>
            {product.category.toUpperCase()}
          </Text>
          {renderStars(product.rating)}
        </View>

        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.productFooter}>
          <View>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>
                ${product.price.toFixed(2)}
              </Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
            <Text style={styles.reviewCount}>
              {product.reviewCount} reviews
            </Text>
          </View>

          <View style={styles.productActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSelectedProduct(product)}
            >
              <Icon name="eye-outline" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.addToCartButton]}
              onPress={() => addToCart(product)}
              disabled={!product.inStock}
            >
              <Icon
                name="cart-plus"
                size={20}
                color={product.inStock ? "#fff" : "#999"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Cart Sidebar Component
  const CartSidebar = () => (
    <Modal
      visible={isCartOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsCartOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.cartContainer}>
          <View style={styles.cartHeader}>
            <View style={styles.cartTitleContainer}>
              <Icon name="shopping" size={24} color="#333" />
              <Text style={styles.cartTitle}>Your Cart</Text>
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{cartCount} items</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setIsCartOpen(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <Icon name="cart-remove" size={80} color="#ddd" />
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
              <TouchableOpacity onPress={() => setIsCartOpen(false)}>
                <Text style={styles.continueShoppingText}>
                  Continue Shopping
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cartItemImage}
                  />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.cartItemPrice}>
                      ${item.price.toFixed(2)}
                    </Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Icon name="minus" size={16} color="#666" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Icon name="plus" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cartItemRight}>
                    <Text style={styles.cartItemTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Icon
                        name="trash-can-outline"
                        size={20}
                        color="#ff4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}

          {cart.length > 0 && (
            <View style={styles.cartFooter}>
              <View style={styles.cartSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>
                    ${cartTotal.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Shipping</Text>
                  <Text style={styles.summaryValue}>
                    {cartTotal > 50 ? "FREE" : "$5.99"}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    ${(cartTotal + (cartTotal > 50 ? 0 : 5.99)).toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.cartActions}>
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => {
                    Alert.alert(
                      "Order Placed!",
                      `Total: $${(cartTotal + (cartTotal > 50 ? 0 : 5.99)).toFixed(2)}`,
                    );
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                >
                  <Text style={styles.checkoutButtonText}>Checkout Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => setIsCartOpen(false)}
                >
                  <Text style={styles.continueButtonText}>
                    Continue Shopping
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  // Product Detail Modal
  const ProductDetailModal = () => (
    <Modal
      visible={!!selectedProduct}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedProduct(null)}
    >
      <View style={styles.productModalOverlay}>
        <ScrollView style={styles.productModal}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setSelectedProduct(null)}
          >
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>

          {selectedProduct && (
            <>
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.modalProductImage}
              />
              <View style={styles.modalProductInfo}>
                <View style={styles.tagContainer}>
                  {selectedProduct.tags?.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.modalProductName}>
                  {selectedProduct.name}
                </Text>

                <View style={styles.modalRating}>
                  {renderStars(selectedProduct.rating)}
                  <Text style={styles.modalReviewCount}>
                    ({selectedProduct.reviewCount} reviews)
                  </Text>
                </View>

                <View style={styles.modalPriceContainer}>
                  <Text style={styles.modalPrice}>
                    ${selectedProduct.price.toFixed(2)}
                  </Text>
                  {selectedProduct.originalPrice && (
                    <>
                      <Text style={styles.modalOriginalPrice}>
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </Text>
                      <Text style={styles.saveText}>
                        Save $
                        {(
                          selectedProduct.originalPrice - selectedProduct.price
                        ).toFixed(2)}
                      </Text>
                    </>
                  )}
                </View>

                <Text style={styles.modalDescription}>
                  {selectedProduct.description}
                </Text>

                <View style={styles.featuresSection}>
                  <Text style={styles.featuresTitle}>Features:</Text>
                  {selectedProduct.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Icon name="check-circle" size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.shippingInfo}>
                  <View style={styles.shippingItem}>
                    <Icon name="truck-fast" size={20} color="#666" />
                    <Text style={styles.shippingText}>
                      {cartTotal > 50 ? "Free Shipping" : "Shipping: $5.99"}
                    </Text>
                  </View>
                  <View style={styles.shippingItem}>
                    <Icon name="shield-check" size={20} color="#666" />
                    <Text style={styles.shippingText}>
                      30-day return policy
                    </Text>
                  </View>
                  <View style={styles.shippingItem}>
                    <Icon name="refresh" size={20} color="#666" />
                    <Text style={styles.shippingText}>Easy exchanges</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[
                      styles.addToCartModalButton,
                      !selectedProduct.inStock && styles.disabledButton,
                    ]}
                    onPress={() => {
                      addToCart(selectedProduct);
                      Alert.alert(
                        "Added to Cart",
                        `${selectedProduct.name} added to cart!`,
                      );
                    }}
                    disabled={!selectedProduct.inStock}
                  >
                    <Text style={styles.addToCartModalButtonText}>
                      {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.buyNowButton,
                      !selectedProduct.inStock && styles.disabledButton,
                    ]}
                    onPress={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    disabled={!selectedProduct.inStock}
                  >
                    <Text style={styles.buyNowButtonText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );

  // MarketPlaceForm Component (simplified version)
  const MarketPlaceForm = ({ onClose }) => (
    <Modal visible={mform} animationType="fade" transparent={true}>
      <View style={styles.formOverlay}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Sell Your Product</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.formContent}>
            <Text style={styles.formLabel}>Product Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter product name"
            />

            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.formInput, styles.formTextArea]}
              placeholder="Enter product description"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.formLabel}>Price</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter price"
              keyboardType="numeric"
            />

            <Text style={styles.formLabel}>Category</Text>
            <TextInput style={styles.formInput} placeholder="Select category" />

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Product</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              style={styles.menuButton}
            >
              <Icon
                name={isMenuOpen ? "close" : "menu"}
                size={24}
                color="#333"
              />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>
                Shop<Text style={styles.logoHighlight}>Easy</Text>
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setMForm(true)}
              style={styles.sellButton}
            >
              <Text style={styles.sellButtonText}>Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsCartOpen(true)}
              style={styles.cartButton}
            >
              <Icon name="cart" size={24} color="#333" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="magnify"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        {isMenuOpen && (
          <View style={styles.categoriesMenu}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryMenuItem,
                  selectedCategory === category.id &&
                    styles.selectedCategoryMenuItem,
                ]}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setIsMenuOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.categoryMenuText,
                    selectedCategory === category.id &&
                      styles.selectedCategoryMenuText,
                  ]}
                >
                  {category.name}
                </Text>
                <Text style={styles.categoryCount}>({category.count})</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Hero Section */}
        {/* <View style={styles.hero}>
          <Text style={styles.heroTitle}>Summer Sale is Live!</Text>
          <Text style={styles.heroSubtitle}>
            Up to 50% off on premium products. Limited time offer!
          </Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => setSelectedCategory("all")}
          >
            <Text style={styles.heroButtonText}>Shop Now →</Text>
          </TouchableOpacity>
        </View> */}

        {/* Features */}
        {/* <View style={styles.features}>
          {[
            {
              icon: "truck-fast",
              title: "Free Shipping",
              desc: "On orders over $50",
            },
            {
              icon: "shield-check",
              title: "Secure Payment",
              desc: "100% secure",
            },
            {
              icon: "credit-card-refund",
              title: "Easy Returns",
              desc: "30-day policy",
            },
            {
              icon: "headset",
              title: "24/7 Support",
              desc: "Always here to help",
            },
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name={feature.icon} size={32} color="#4F46E5" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          ))}
        </View> */}

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.selectedCategoryTab,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === category.id &&
                    styles.selectedCategoryTabText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <Text style={styles.sectionTitle}>
          {filteredProducts.length} of {products.length} products
        </Text>

        {filteredProducts.length > 0 ? (
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        ) : (
          <View style={styles.noProducts}>
            <Icon name="emoticon-sad-outline" size={64} color="#ddd" />
            <Text style={styles.noProductsTitle}>No products found</Text>
            <Text style={styles.noProductsText}>
              Try adjusting your search or filter criteria
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              style={styles.clearFiltersButton}
            >
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <Icon name="store" size={32} color="#fff" />
              <Text style={styles.footerLogoText}>
                Shop<Text style={styles.footerLogoHighlight}>Easy</Text>
              </Text>
            </View>
            <Text style={styles.footerDescription}>
              Your trusted online shopping destination for quality products.
            </Text>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>
              © 2026 ShopEasy. All rights reserved.
            </Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Terms</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Privacy</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Cookies</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Quick Action Buttons */}
      <View style={styles.quickActions}>
        {cartCount > 0 && (
          <TouchableOpacity
            style={styles.quickCartButton}
            onPress={() => setIsCartOpen(true)}
          >
            <Icon name="cart" size={24} color="#fff" />
            <Text style={styles.quickCartText}>${cartTotal.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity
          style={styles}
          onPress={() => {
            // Scroll to top functionality would require a ref to ScrollView
          }}
        >
          <Icon name="arrow-up" size={24} color="#fff" />
        </TouchableOpacity> */}
      </View>

      {/* Components */}
      <CartSidebar />
      <ProductDetailModal />
      <MarketPlaceForm onClose={() => setMForm(false)} />
      <View>
        <BottomNavbar />
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 12,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  logoHighlight: {
    color: "#4F46E5",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sellButton: {
    backgroundColor: "linear-gradient(90deg, #4F46E5, #9333EA)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sellButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 10,
  },
  cartButton: {
    position: "relative",
    padding: 8,
    backgroundColor: "#4F46E5",
    borderRadius: 10,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoriesMenu: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 8,
  },
  categoryMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedCategoryMenuItem: {
    backgroundColor: "#4F46E5",
  },
  categoryMenuText: {
    fontSize: 16,
    color: "#374151",
  },
  selectedCategoryMenuText: {
    color: "#fff",
    fontWeight: "600",
  },
  categoryCount: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: "linear-gradient(90deg, #4F46E5, #9333EA)",
    padding: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    opacity: 0.9,
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
  },
  heroButtonText: {
    color: "#4F46E5",
    fontSize: 18,
    fontWeight: "bold",
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    padding: 16,
  },
  featureItem: {
    width: "25%",
    alignItems: "center",
    padding: 12,
  },
  featureTitle: {
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 12,
  },
  featureDesc: {
    color: "#666",
    fontSize: 10,
    marginTop: 4,
  },
  categoryTabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  categoryTab: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryTab: {
    backgroundColor: "#4F46E5",
  },
  categoryTabText: {
    color: "#374151",
    fontSize: 14,
  },
  selectedCategoryTabText: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  productsGrid: {
    // flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  productCard: {
    width: "full",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  productImageContainer: {
    position: "relative",
    height: 160,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  bestsellerBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#F59E0B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestsellerText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  outOfStockText: {
    fontWeight: "600",
    color: "#333",
  },
  productInfo: {
    padding: 12,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 10,
    color: "#6B7280",
    textTransform: "uppercase",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  originalPrice: {
    fontSize: 12,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },
  productActions: {
    flexDirection: "row",
    gap: 4,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#4F46E5",
  },
  noProducts: {
    alignItems: "center",
    padding: 48,
  },
  noProductsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    color: "#374151",
  },
  noProductsText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  clearFiltersButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  clearFiltersText: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: "#111827",
    marginTop: 24,
    padding: 24,
  },
  footerContent: {
    alignItems: "center",
  },
  footerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  footerLogoHighlight: {
    color: "#60A5FA",
  },
  footerDescription: {
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 24,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingTop: 16,
  },
  footerCopyright: {
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 12,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  footerLink: {
    color: "#60A5FA",
  },
  quickActions: {
    position: "absolute",
    bottom: 24,
    right: 16,
    gap: 8,
  },
  quickCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  quickCartText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  scrollToTopButton: {
    backgroundColor: "#374151",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  cartContainer: {
    backgroundColor: "#fff",
    height: height * 0.85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cartTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  cartCountBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cartCountText: {
    fontSize: 12,
    color: "#374151",
  },
  closeButton: {
    padding: 4,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 48,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 24,
  },
  continueShoppingText: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9fafb",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  cartItemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  cartItemRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  cartFooter: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    padding: 16,
  },
  cartSummary: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  cartActions: {
    gap: 12,
  },
  checkoutButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  productModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  productModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: height * 0.9,
  },
  closeModalButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalProductImage: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalProductInfo: {
    padding: 24,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: "#374151",
  },
  modalProductName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  modalRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  modalReviewCount: {
    marginLeft: 8,
    color: "#6B7280",
  },
  modalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  modalPrice: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    marginRight: 12,
  },
  modalOriginalPrice: {
    fontSize: 20,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    marginRight: 12,
  },
  saveText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  modalDescription: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4B5563",
  },
  shippingInfo: {
    gap: 12,
    marginBottom: 32,
  },
  shippingItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  shippingText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#6B7280",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  addToCartModalButton: {
    flex: 1,
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addToCartModalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buyNowButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4F46E5",
    alignItems: "center",
  },
  buyNowButtonText: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  formOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: height * 0.8,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  formContent: {
    padding: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 16,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  formTextArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MarketPlace;
