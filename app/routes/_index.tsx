import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";

import { ChevronDownIcon } from "lucide-react";

import { Portal } from "@ark-ui/react";
import { Select } from "app/components/ui/select";
import { CITIES } from "cities";

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

  const items = CITIES.map((city) => {
    return {
      label: city.city,
      value: city.city,
    };
  });

  return (
    <div>
      <Select.Root
        items={items}
        value={selectedCity ? [selectedCity] : []}
        onValueChange={({ value }) =>
          setSearchParams((params) => {
            if (value[0]) {
              params.set("city", value[0]);
            } else {
              params.delete("city");
            }
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
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
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
