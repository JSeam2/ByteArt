import type { Meta, StoryObj } from '@storybook/react';

import ByteArt from '../ByteArt';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ByteArt',
  component: ByteArt,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof ByteArt>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    rowCount: 16,
    colCount: 16,
    cellSize: 12,
    borderRadius: 10,
    hexString: "0xdea102f6f2ac65501b2610c36a37e873ada2bdbedcd40f78ca10955455ff9274",
  },
};
