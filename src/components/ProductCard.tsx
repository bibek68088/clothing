"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Badge, Card, Group, Text, Transition, ActionIcon, Tooltip } from "@mantine/core"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false)
  const [favorited, setFavorited] = useState(false)

  // Format price with commas for thousands
  const formattedPrice = product.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })

  return (
    <Card
      className="group relative overflow-hidden border-0 transition-all duration-500 hover:shadow-xl bg-white dark:bg-gray-900"
      radius="md"
      p={0}
      withBorder={false}
      shadow="sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
        />
        {/* Add subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Overlay with actions on hover */}
        <Transition mounted={hovered} transition="fade" duration={400}>
          {(styles) => (
            <div style={styles} className="absolute inset-0 flex flex-col justify-between p-4">
              {/* Top actions */}
              <div className="flex justify-end">
                <Tooltip label={favorited ? "Remove from wishlist" : "Add to wishlist"} position="left">
                  <ActionIcon
                    variant="filled"
                    radius="xl"
                    size="lg"
                    className={`${
                      favorited
                        ? "bg-rose-500 hover:bg-rose-600 shadow-md"
                        : "bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm shadow-sm"
                    } transition-all`}
                    onClick={(e) => {
                      e.preventDefault()
                      setFavorited(!favorited)
                    }}
                  >
                    <Heart className={favorited ? "fill-white text-white" : ""} size={18} />
                  </ActionIcon>
                </Tooltip>
              </div>

              {/* Bottom action - Add to cart */}
              <button
                className="w-full transform bg-gradient-to-r from-gray-900 to-black py-3 text-center font-medium text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 shadow-md"
                onClick={(e) => e.preventDefault()}
              >
                <Group justify="center" gap="xs">
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </Group>
              </button>
            </div>
          )}
        </Transition>

        {/* Category badge */}
        {product.category && (
          <Badge
            className="absolute left-3 top-3 text-xs font-normal uppercase tracking-wider shadow-sm backdrop-blur-sm"
            color="dark"
            variant="filled"
            radius="sm"
          >
            {product.category}
          </Badge>
        )}
      </div>

      {/* Product details */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="space-y-3 p-5">
          {/* Product name */}
          <Text
            component="h3"
            className="text-base font-medium leading-tight tracking-wide text-gray-900 dark:text-gray-100"
            lineClamp={1}
          >
            {product.name}
          </Text>

          {/* Rating */}
          <Group gap={4}>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : i < product.rating
                        ? "fill-amber-400/50 text-amber-400/50"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  } transition-colors`}
                />
              ))}
            </div>
            <Text size="xs" color="dimmed">
              ({product.reviews})
            </Text>
          </Group>

          {/* Price */}
          <Text className="text-base font-semibold text-gray-900 dark:text-white">{formattedPrice}</Text>

          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <Group gap={6} mt={8}>
              {product.colors.map((color) => (
                <Tooltip key={color} label={color} position="top" withArrow>
                  <div
                    className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-700 transition-transform hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                    }}
                  />
                </Tooltip>
              ))}
            </Group>
          )}
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard

