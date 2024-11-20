# cn-lib

A utility for merging Tailwind CSS classes with support for multiple frontend frameworks (React, Vue, Svelte, Next.js).

## Credits and Origin

I discovered the `cn()` utility while using [shadcn/ui](https://ui.shadcn.com/) for the first time, a popular open-source component system for React.

## Features

- 🎨 Merges Tailwind CSS classes intelligently
- 🔄 Handles conditional classes
- ⚡ Framework agnostic
- 📦 Tiny footprint
- 🔧 TypeScript ready
- 🛠️ Built on top of [clsx](https://github.com/lukeed/clsx) and [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## Installation

```bash
# npm
npm install cn-lib

# pnpm
pnpm add cn-lib

# yarn
yarn add cn-lib

# bun
bun add cn-lib
```

## Usage

### React/Next.js

```tsx
import { cn } from 'cn-lib';

function Button({ className, ...props }) {
  return (
    <button 
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        className
      )} 
      {...props} 
    />
  );
}

// With conditions
function Card({ isActive, className }) {
  return (
    <div className={cn(
      "p-4 rounded-lg",
      isActive ? "bg-blue-500 text-white" : "bg-gray-100",
      className
    )}>
      Content
    </div>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { cn } from 'cn-lib';

const props = defineProps<{
  disabled?: boolean,
  className?: string
}>();

const buttonClass = computed(() => cn(
  'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
  props.disabled && 'opacity-50 cursor-not-allowed',
  props.className
));
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### Svelte

```svelte
<script lang="ts">
  import { cn } from 'cn-lib';
  
  export let active = false;
  export let className = '';
  
  $: classes = cn(
    'p-4 rounded-lg transition-colors',
    active ? 'bg-red-500 text-white' : 'bg-gray-100',
    className
  );
</script>

<div class={classes}>
  <slot />
</div>
```

## API Reference

### cn(...inputs: ClassValue[]): string

The `cn` function accepts any number of arguments that can be:
- Strings
- Objects where keys are class names and values are booleans
- Arrays of class names
- Nested arrays
- undefined or null (these are ignored)

```typescript
import { cn } from 'cn-lib';

// Basic usage
cn('font-bold', 'text-center')
// => 'font-bold text-center'

// With conditions
cn('p-4', {
  'bg-blue-500': true,
  'bg-red-500': false
})
// => 'p-4 bg-blue-500'

// With arrays
cn(['p-4', 'font-bold'], 'text-center')
// => 'p-4 font-bold text-center'

// Tailwind conflict resolution
cn('p-2 p-4', 'px-6')
// => 'p-4 px-6'
```

## TypeScript Support

This package includes built-in TypeScript declarations and supports all major frontend frameworks. The `cn` function is fully typed and will provide proper type hints in your IDE.

```typescript
import { cn } from 'cn-lib';

// ClassValue type is exported if you need it
import type { ClassValue } from 'cn-lib';

function createClasses(...inputs: ClassValue[]) {
  return cn(...inputs);
}
```

## Dependencies

This utility is built on top of:
- [clsx](https://github.com/lukeed/clsx) - A tiny utility for constructing className strings
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Utility function to efficiently merge Tailwind CSS classes

## License

MIT
