import { 
  EasyClassDecorator, 
  EasyMetadataEntry, 
  EasyMethodDecorator, 
  getEasyMetadataEntries
} from "../";

describe("Method decorator tests", () => {
  
  const ClassDecoratorTest = () => EasyClassDecorator<string>("class:test", "Test!");
  const MethodDecoratorTest = () => EasyMethodDecorator<string>("method:test", "Wohoo!");

  @ClassDecoratorTest()
  class MyClass {

    @MethodDecoratorTest()
    public method(){
      //Do something
    }

  }

  test("check if class object has metadata", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "class:test") || [];
    expect(entries.length).toBeGreaterThanOrEqual(1);
  });

  test("check if class object has correct metadata value", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "class:test") || [];
    expect(entries[0]?.value).toBe("Test!");
  });

  test("check if method has metadata", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "method:test") || [];
    expect(entries.length).toBeGreaterThanOrEqual(1);
  });

  test("check if method has correct metadata value", () => {
    const entries: EasyMetadataEntry<string>[] = getEasyMetadataEntries(new MyClass(), "method:test") || [];
    expect(entries[0]?.value).toBe("Wohoo!");
  });

});
