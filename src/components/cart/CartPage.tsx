"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Divider,
  TextInput,
  ActionIcon,
  Paper,
  Image,
  Tooltip,
  Badge,
  Collapse,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  Trash2,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react"
import type { Product } from "../../types/index"

// Extended Product type with quantity
interface CartItem extends Product {
  quantity: number
}

const CartPage: React.FC = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
      quantity: 1,
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
      quantity: 2,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [opened, { toggle }] = useDisclosure(false)

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount if promo applied
  const shipping = subtotal > 100 ? 0 : 12.99
  const tax = (subtotal - discount) * 0.08 // 8% tax
  const total = subtotal - discount + shipping + tax

  // Update quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Move to wishlist (just removes from cart in this demo)
  const moveToWishlist = (id: string) => {
    // In a real app, you would add to wishlist here
    removeItem(id)
  }

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true)
    }
  }

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    })
  }

  return (
    <Container size="xl" px={{ base: 16, sm: 24 }} py={48} className="max-w-[1920px]">
      <div className="mb-8">
        <Title order={1} className="font-serif text-3xl font-light tracking-tight text-gray-900 dark:text-gray-100">
          Shopping Cart
        </Title>
        <Text color="dimmed" size="lg" className="mt-2">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </Text>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Paper radius="md" p="md" withBorder className="mb-6 overflow-hidden bg-white dark:bg-gray-900">
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-50 dark:bg-gray-800">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        height={96}
                        width={96}
                        fit="cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <Group justify="space-between" className="mb-1">
                        <Text component="h3" className="text-base font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </Text>
                        <Text className="text-base font-semibold text-gray-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </Text>
                      </Group>

                      {/* Product Metadata */}
                      <Group gap={8} className="mb-2">
                        {item.category && (
                          <Badge
                            color="gray"
                            variant="outline"
                            radius="sm"
                            className="text-xs font-normal uppercase tracking-wider"
                          >
                            {item.category}
                          </Badge>
                        )}
                        {item.sizes && item.sizes.length > 0 && (
                          <Badge
                            color="gray"
                            variant="outline"
                            radius="sm"
                            className="text-xs font-normal uppercase tracking-wider"
                          >
                            Size: {item.sizes[0]}
                          </Badge>
                        )}
                        {item.colors && item.colors.length > 0 && (
                          <Group gap={4}>
                            <Text size="xs" color="dimmed">
                              Color:
                            </Text>
                            <div
                              className="h-3 w-3 rounded-full border border-gray-300 dark:border-gray-700"
                              style={{
                                backgroundColor: item.colors[0].toLowerCase(),
                                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                              }}
                            />
                          </Group>
                        )}
                      </Group>

                      {/* Quantity and Actions */}
                      <Group justify="space-between" className="mt-auto">
                        <Group gap={8}>
                          <ActionIcon
                            size="sm"
                            variant="subtle"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </ActionIcon>
                          <Text className="w-8 text-center">{item.quantity}</Text>
                          <ActionIcon
                            size="sm"
                            variant="subtle"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </ActionIcon>
                        </Group>

                        <Group gap={8}>
                          <Tooltip label="Move to wishlist">
                            <ActionIcon variant="subtle" color="gray" onClick={() => moveToWishlist(item.id)}>
                              <Heart size={18} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Remove from cart">
                            <ActionIcon variant="subtle" color="red" onClick={() => removeItem(item.id)}>
                              <Trash2 size={18} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Paper>

            <Group justify="space-between">
              <Button
                component={Link}
                to="/products"
                variant="subtle"
                leftSection={<ChevronLeft size={16} />}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Continue Shopping
              </Button>

              <Button
                variant="subtle"
                color="red"
                leftSection={<Trash2 size={16} />}
                onClick={() => setCartItems([])}
                className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Clear Cart
              </Button>
            </Group>
          </div>

          {/* Order Summary */}
          <div>
            <Paper radius="md" p="xl" withBorder className="sticky top-4 bg-white dark:bg-gray-900">
              <Title order={3} className="mb-6 text-xl font-medium">
                Order Summary
              </Title>

              <div className="space-y-3">
                <Group justify="space-between">
                  <Text color="dimmed">Subtotal</Text>
                  <Text>{formatPrice(subtotal)}</Text>
                </Group>

                {promoApplied && (
                  <Group justify="space-between" className="text-green-600 dark:text-green-400">
                    <Text>Discount (10%)</Text>
                    <Text>-{formatPrice(discount)}</Text>
                  </Group>
                )}

                <Group justify="space-between">
                  <Text color="dimmed">Shipping</Text>
                  <Text>{shipping === 0 ? "Free" : formatPrice(shipping)}</Text>
                </Group>

                <Group justify="space-between">
                  <Text color="dimmed">Tax (8%)</Text>
                  <Text>{formatPrice(tax)}</Text>
                </Group>

                <Divider my="sm" />

                <Group justify="space-between" className="text-lg font-medium">
                  <Text>Total</Text>
                  <Text>{formatPrice(total)}</Text>
                </Group>

                {/* Promo Code */}
                <div className="mt-6">
                  <Button
                    variant="subtle"
                    className="mb-2 p-0 text-gray-700 dark:text-gray-300"
                    rightSection={opened ? <ChevronRight size={14} /> : <ChevronLeft size={14} className="rotate-90" />}
                    onClick={toggle}
                  >
                    {promoApplied ? "Promo code applied" : "Add promo code"}
                  </Button>

                  <Collapse in={opened}>
                    <Group gap={0} className="mt-2">
                      <TextInput
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.currentTarget.value)}
                        disabled={promoApplied}
                        className="flex-1"
                        rightSection={
                          promoApplied ? (
                            <ActionIcon
                              color="red"
                              onClick={() => {
                                setPromoApplied(false)
                                setPromoCode("")
                              }}
                            >
                              <X size={16} />
                            </ActionIcon>
                          ) : null
                        }
                      />
                      <Button disabled={promoApplied || !promoCode} onClick={applyPromoCode} className="ml-2">
                        Apply
                      </Button>
                    </Group>
                    {promoApplied && (
                      <Text size="xs" color="green" className="mt-1">
                        Promo code applied successfully!
                      </Text>
                    )}
                    {!promoApplied && promoCode && (
                      <Text size="xs" color="dimmed" className="mt-1">
                        Try "DISCOUNT10" for 10% off
                      </Text>
                    )}
                  </Collapse>
                </div>

                {/* Checkout Button */}
                <Button
                  fullWidth
                  size="lg"
                  className="mt-6 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900"
                  rightSection={<ShoppingBag size={18} />}
                >
                  Proceed to Checkout
                </Button>

                {/* Trust Badges */}
                <div className="mt-6">
                  <Group justify="center" gap="xl" className="text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <CreditCard size={20} />
                      <Text size="xs" className="mt-1">
                        Secure Payment
                      </Text>
                    </div>
                    <div className="flex flex-col items-center">
                      <ShieldCheck size={20} />
                      <Text size="xs" className="mt-1">
                        Money-back Guarantee
                      </Text>
                    </div>
                    <div className="flex flex-col items-center">
                      <Truck size={20} />
                      <Text size="xs" className="mt-1">
                        Free Shipping over $100
                      </Text>
                    </div>
                  </Group>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-900">
          <ShoppingBag size={64} className="mb-4 text-gray-400" />
          <Title order={3} className="mb-2 text-xl font-medium text-gray-900 dark:text-gray-100">
            Your cart is empty
          </Title>
          <Text color="dimmed" className="mb-6 max-w-md text-center">
            Looks like you haven't added any products to your cart yet. Browse our collection and find something you'll
            love.
          </Text>
          <Button
            component={Link}
            to="/products"
            size="lg"
            className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </Container>
  )
}

export default CartPage

