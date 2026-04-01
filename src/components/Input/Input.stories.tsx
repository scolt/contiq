import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const Error: Story = {
  args: { variant: "error", placeholder: "Invalid value", defaultValue: "bad input" },
};

export const Small: Story = {
  args: { size: "sm", placeholder: "Small input" },
};

export const Large: Story = {
  args: { size: "lg", placeholder: "Large input" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "Password" },
};
