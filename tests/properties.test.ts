import { 
  EasyClassDecorator, 
  EasyMetadataEntry, 
  EasyPropertyDecorator, 
  getEasyMetadataEntries
} from "../src";

describe("Properties decorator tests", () => {
  
  const ClassDecoratorTest = () => EasyClassDecorator<string>("class:test", "Test!");
  const PropertyDecoratorTest = () => EasyPropertyDecorator<string>("parameter:test", "It works!");

  @ClassDecoratorTest()
  class MyClass {

    @PropertyDecoratorTest()
    someProperty: string = "How are u?";

  }

  test("check if class object has metadata", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "class:test") || [];
    expect(entries?.length).toBeGreaterThanOrEqual(1);
  });

  test("check if class object has correct metadata value", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "class:test") || [];
    expect(entries[0]?.value).toBe("Test!");
  });

  test("check if parameter has metadata", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "parameter:test") || [];
    expect(entries?.length).toBeGreaterThanOrEqual(1);
  });

  test("check if parameter has correct metadata value", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "parameter:test") || [];
    expect(entries[0]?.value).toBe("It works!");
  });

});
