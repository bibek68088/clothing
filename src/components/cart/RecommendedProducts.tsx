import type React from "react";
import { Container, Title, Group, Button, SimpleGrid } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard";
import type { Product } from "../../types/index";

interface RecommendedProductsProps {
  title?: string;
  viewAllLink?: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  title = "You May Also Like",
  viewAllLink = "/products",
}) => {
  // Sample recommended products
  const recommendedProducts: Product[] = [
    {
      id: "3",
      name: "Urban Hoodie",
      price: 89.99,
      description: "Comfortable urban-style hoodie",
      category: "hoodies",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Gray", "Black", "Navy"],
      rating: 4.6,
      reviews: 89,
    },
    {
      id: "4",
      name: "Premium Denim Jacket",
      price: 149.99,
      description: "Classic denim jacket with modern details",
      category: "jackets",
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black", "Gray"],
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "5",
      name: "Slim Fit T-Shirt",
      price: 34.99,
      description: "Comfortable slim fit t-shirt",
      category: "t-shirts",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Black", "Gray", "Navy"],
      rating: 4.5,
      reviews: 210,
    },
    {
      id: "6",
      name: "Leather Belt",
      price: 59.99,
      description: "Premium leather belt with metal buckle",
      category: "accessories",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      sizes: ["S", "M", "L"],
      colors: ["Brown", "Black"],
      rating: 4.7,
      reviews: 78,
    },
  ];

  return (
    <Container
      size="xl"
      px={{ base: 16, sm: 24 }}
      py={48}
      className="max-w-[1920px]"
    >
      <Group justify="space-between" className="mb-8">
        <Title
          order={2}
          className="font-serif text-2xl font-light tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </Title>
        <Button
          variant="subtle"
          rightSection={<ChevronRight size={16} />}
          component="a"
          href={viewAllLink}
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          View All
        </Button>
      </Group>

      <SimpleGrid
        cols={4}
        spacing="lg"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default RecommendedProducts;
