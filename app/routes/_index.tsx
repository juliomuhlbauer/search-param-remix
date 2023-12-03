import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";

import { Portal, Select } from "@ark-ui/react";
import { ChevronDownIcon } from "lucide-react";

import "styles/select.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city");

  console.log("search param value:", selectedCity);

  const items = ["React", "Solid", "Vue"];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Select.Root
        items={items}
        value={selectedCity ? [selectedCity] : []}
        onValueChange={({ value }) =>
          setSearchParams((params) => {
            params.set("city", value[0]);
            return params;
          })
        }
      >
        <Select.Label>Framework</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <Select.Indicator>
              <ChevronDownIcon />
            </Select.Indicator>
          </Select.Trigger>
          <Select.ClearTrigger>Clear</Select.ClearTrigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup id="framework">
                <Select.ItemGroupLabel htmlFor="framework">
                  Frameworks
                </Select.ItemGroupLabel>
                {items.map((item) => (
                  <Select.Item key={item} item={item}>
                    <Select.ItemText>{item}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </div>
  );
}
