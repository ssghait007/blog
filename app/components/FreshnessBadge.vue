<template>
  <span v-if="tier" class="inline-flex items-center gap-1.5 text-xs font-medium" :style="{ color: tier.color }">
    <span class="inline-block w-[7px] h-[7px] rounded-full" :style="{ backgroundColor: tier.color }" />
    <span>{{ tier.label }}</span>
    <template v-if="variant === 'detailed' && formattedDate">
      <span class="text-gray-400 dark:text-gray-500">&middot;</span>
      <span class="text-gray-500 dark:text-gray-400">Updated {{ formattedDate }}</span>
    </template>
  </span>
</template>

<script setup>
import { differenceInMonths, format } from 'date-fns'

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'compact',
    validator: (v) => ['compact', 'detailed'].includes(v),
  },
})

const TIERS = {
  fresh: { label: 'Fresh', color: '#22c55e' },
  recent: { label: 'Recent', color: '#3b82f6' },
}

const tier = computed(() => {
  if (!props.date) return null

  const parsed = new Date(props.date)
  if (Number.isNaN(parsed.getTime())) return null
  if (parsed > new Date()) return null

  const months = differenceInMonths(new Date(), parsed)

  if (months < 6) return TIERS.fresh
  if (months <= 18) return TIERS.recent
  return null
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  const parsed = new Date(props.date)
  if (Number.isNaN(parsed.getTime())) return ''
  return format(parsed, 'MMM d, yyyy')
})
</script>
