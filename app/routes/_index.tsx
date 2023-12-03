import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";

import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { Portal } from "@ark-ui/react";
import { Select } from "app/components/ui/select";
import { CITIES } from "cities";
import { Container, Stack } from "styled-system/jsx";

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
    <Container>
      <Stack>
        <h1>Search Param</h1>

        <h1>{selectedCity}</h1>

        <Select.Root
          positioning={{ sameWidth: true }}
          width="2xs"
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
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a city" />
              <Select.Indicator>
                <ChevronDownIcon />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content overflow="auto" h="fit-content" maxH={300}>
                <Select.ItemGroup id="framework">
                  {items.map((item) => (
                    <Select.Item key={item.value} item={item} py={4}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Stack>
    </Container>
  );
}
