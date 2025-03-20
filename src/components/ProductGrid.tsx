"use client"

import type React from "react"
import { useState } from "react"
import {
  Tabs,
  Select,
  Group,
  Title,
  Text,
  Container,
  Button,
  Divider,
  ActionIcon,
  Drawer,
  Stack,
  RangeSlider,
  Checkbox,
  ScrollArea,
  Tooltip,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Filter, ChevronDown, X } from "lucide-react"
import ProductCard from "./ProductCard"
import type { Product } from "../types"

const products: Product[] = [
  {
    id: "1",
    name: "Velvet Touch Button-Up",
    price: 120.99,
    description: "Premium quality button-up shirt with velvet touch finish",
    category: "shirts",
    image:
      "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black", "Navy"],
    rating: 4.5,
    reviews: 42,
  },
  {
    id: "2",
    name: "Classic Baseball Cap",
    price: 29.99,
    description: "Timeless baseball cap design",
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["One Size"],
    colors: ["Yellow", "Black", "Navy"],
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "3",
    name: "Urban Hoodie",
    price: 89.99,
    description: "Comfortable urban-style hoodie",
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black", "Navy"],
    rating: 4.6,
    reviews: 89,
  },
]

const categories = [
  { value: "all", label: "All" },
  { value: "shirts", label: "Shirt" },
  { value: "pants", label: "Pant" },
  { value: "hoodies", label: "Hoodies" },
  { value: "jackets", label: "Jacket" },
  { value: "t-shirts", label: "T-Shirt" },
  { value: "denim", label: "Denim" },
  { value: "accessories", label: "Cap" },
]

const sortOptions = [
  { value: "featured", label: "Shop By Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
]

const ProductGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [opened, { open, close }] = useDisclosure(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])

  return (
    <Container
      size="xl"
      px={{ base: 16, sm: 24 }}
      py={48}
      className="max-w-[1920px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      {/* Header Section */}
      <div className="mb-16">
        <Title
          order={1}
          className="mb-3 font-serif text-4xl font-light tracking-tight text-gray-900 dark:text-gray-100"
        >
          Best Sellers Collection
        </Title>
        <Text color="dimmed" size="lg" className="max-w-2xl font-light">
          Discover our most popular pieces, crafted with premium materials and timeless design.
        </Text>
      </div>

      {/* Filters and Categories */}
      <div className="mb-10">
        <Group justify="space-between" className="mb-4">
          <Tabs
            value={activeCategory}
            onChange={(value) => setActiveCategory(value || "all")}
            variant="pills"
            radius="xl"
            classNames={{
              root: "overflow-x-auto",
              list: "flex-nowrap",
              tab: "px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800",
            }}
          >
            <Tabs.List>
              {categories.map((category) => (
                <Tabs.Tab
                  key={category.value}
                  value={category.value}
                  className="data-[active=true]:bg-gray-900 data-[active=true]:text-white"
                >
                  {category.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>

          <Group gap={16}>
            <Button
              variant="subtle"
              leftSection={<Filter size={16} />}
              onClick={open}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Filter
            </Button>

            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value || "featured")}
              data={sortOptions}
              rightSection={<ChevronDown size={14} />}
              classNames={{
                section: "pointer-events-none",
                input: "border-0 bg-transparent font-medium pr-6 text-gray-900 dark:text-gray-100",
                wrapper: "min-w-[180px] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors",
              }}
            />
          </Group>
        </Group>

        <Divider className="shadow-sm" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="transition-all duration-500"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "backwards",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Filter Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title="Filter Products"
        padding="xl"
        position="right"
        size="md"
        classNames={{
          header: "border-b pb-4",
          title: "text-xl font-medium text-gray-900 dark:text-gray-100",
          body: "bg-white dark:bg-gray-900",
        }}
      >
        <ScrollArea h="calc(100vh - 120px)" pr={16}>
          <Stack gap={16}>
            {/* Price Range */}
            <div>
              <Text fw={500} size="lg" mb="md">
                Price Range
              </Text>
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={200}
                step={5}
                minRange={10}
                label={(value) => `$${value}`}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 100, label: "$100" },
                  { value: 200, label: "$200+" },
                ]}
                mb="xl"
                classNames={{
                  thumb: "border-2 border-white shadow-md",
                  track: "h-2",
                  mark: "w-1 h-4",
                  markLabel: "text-xs font-medium text-gray-600 dark:text-gray-400",
                }}
              />
            </div>

            <Divider />

            {/* Categories */}
            <div>
              <Text fw={500} size="lg" mb="md">
                Categories
              </Text>
              <Stack gap={8}>
                {categories.slice(1).map((category) => (
                  <Checkbox
                    key={category.value}
                    label={category.label}
                    checked={activeCategory === category.value}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setActiveCategory(category.value)
                      } else if (activeCategory === category.value) {
                        setActiveCategory("all")
                      }
                    }}
                  />
                ))}
              </Stack>
            </div>

            <Divider />

            {/* Sizes */}
            <div>
              <Text fw={500} size="lg" mb="md">
                Sizes
              </Text>
              <Group gap={10}>
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    radius="xl"
                    size="xs"
                    className="min-w-[40px] border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                  >
                    {size}
                  </Button>
                ))}
              </Group>
            </div>

            <Divider />

            {/* Colors */}
            <div>
              <Text fw={500} size="lg" mb="md">
                Colors
              </Text>
              <Group gap={8}>
                {["Black", "White", "Gray", "Navy", "Brown", "Red"].map((color) => (
                  <Tooltip key={color} label={color} withArrow position="top">
                    <ActionIcon
                      size="lg"
                      radius="xl"
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700 hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                      }}
                    />
                  </Tooltip>
                ))}
              </Group>
            </div>
          </Stack>

          <Group justify="space-between" mt={40} mb={20}>
            <Button
              variant="subtle"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={16} style={{ marginRight: 8 }} />
              Clear All
            </Button>
            <Button
              onClick={close}
              className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 transition-all"
            >
              Apply Filters
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Container>
  )
}

export default ProductGrid

