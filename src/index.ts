import "reflect-metadata";

export type EasyMetadataEntry<T> = {
  key: PropertyKey | null;
  value: T;
  type: "class" | "property" | "method" | "parameter";
  index?: number;
}

export function setMetadata<T = any>(
  target: any, 
  metadataKey: string,
  metadataValue: T)
{
  Reflect.defineMetadata(metadataKey, metadataValue, target);
}

export function setEasyMetadata<T = any>(
  target: any, 
  metadataValue: T)
{
  setMetadata<T>(target, "easy:metadata", metadataValue);
}

export function getMetadata<T = any>(
  target: any, 
  metadataKey: string)
{
  return <T>Reflect.getMetadata(metadataKey, target);
}

export function getEasyMetadata<T = any>(target: any) {
  return getMetadata<T>(target, "easy:metadata");
}

export function getEasyMetadataEntries<T = any>(target: any, metadataKey: string) {
  const metadata = getEasyMetadata(target) || {};
  return Array.isArray(metadata[metadataKey]) ? 
    <EasyMetadataEntry<T>[]>(metadata[metadataKey]) : null;
}

export function EasyClassDecorator<T = any>(metadataKey: string, metadataValue: T): ClassDecorator {
  return function(target: any){
    let metadata = getEasyMetadata(target.prototype) || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: null, value: metadataValue, type: "class" });
    setEasyMetadata<T>(target, metadata);
    setEasyMetadata<T>(target.prototype, metadata);
  }
}

export function EasyPropertyDecorator<T = any>(metadataKey: string, metadataValue: T): PropertyDecorator {
  return function(target: any, propertyKey: PropertyKey){
    let metadata = getEasyMetadata(target) || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: propertyKey, value: metadataValue, type: "property" });
    setEasyMetadata<T>(target, metadata);
  }
}

export function EasyMethodDecorator<T = any>(metadataKey: string, metadataValue: T): MethodDecorator {
  return function(target: any, propertyKey: PropertyKey){
    let metadata = getEasyMetadata(target) || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: propertyKey, value: metadataValue, type: "method" });
    setEasyMetadata<T>(target, metadata);
  }
}

export function EasyParameterDecorator<T = any>(metadataKey: string, metadataValue: T): ParameterDecorator {
  return function(target: any, propertyKey: PropertyKey, index: number){
    let metadata = getEasyMetadata(target) || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: propertyKey, value: metadataValue, index, type: "parameter" });
    setEasyMetadata<T>(target, metadata);
  }
}
