import { 
  EasyClassDecorator, 
  EasyMetadataEntry, 
  getEasyMetadataEntries 
} from "../src";

describe("Class decorator tests", () => {
  
  const ClassDecoratorTest = () => EasyClassDecorator<string>("class:test", "Test!");
  
  @ClassDecoratorTest()
  class MyClass {

  }

  test("check if class object has metadata", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "class:test") || [];
    expect(entries?.length).toBeGreaterThanOrEqual(1);
  });

  test("check if class object has correct metadata value", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "class:test") || [];
    expect(entries[0]?.value).toBe("Test!");
  });

});
