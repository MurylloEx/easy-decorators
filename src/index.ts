import "reflect-metadata";

export function setMetadata(
  target: any, 
  metadataKey: string,
  metadataValue: any)
{
  Reflect.defineMetadata(metadataKey, metadataValue, target);
}

export function getMetadata(
  target: any, 
  metadataKey: string)
{
  return Reflect.getMetadata(metadataKey, target);
}

export function getEasyMetadata(target: any){
  return getMetadata(target, 'easy:metadata');
}

export function EasyClassDecorator(metadataKey: string, metadataValue: any): ClassDecorator {
  return function(target: any){
    let metadata = getMetadata(target.prototype, 'easy:metadata') || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: null, value: metadataValue, type: 'class' });
    setMetadata(target, 'easy:metadata', metadata);
    setMetadata(target.prototype, metadataKey, metadataValue);
  }
}

export function EasyPropertyDecorator(metadataKey: string, metadataValue: any): PropertyDecorator {
  return function(target: any, propertyKey: PropertyKey){
    let metadata = getMetadata(target, 'easy:metadata') || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: propertyKey, value: metadataValue, type: 'property' });
    setMetadata(target, 'easy:metadata', metadata);
  }
}

export function EasyMethodDecorator(metadataKey: string, metadataValue: any): MethodDecorator {
  return function(target: any, propertyKey: PropertyKey){
    let metadata = getMetadata(target, 'easy:metadata') || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ key: propertyKey, value: metadataValue, type: 'method' });
    setMetadata(target, 'easy:metadata', metadata);
  }
}

export function EasyParameterDecorator(metadataKey: string, metadataValue: any): ParameterDecorator {
  return function(target: any, propertyKey: PropertyKey, parameterIndex: number){
    let metadata = getMetadata(target, 'easy:metadata') || {};
    if (!Array.isArray(metadata[metadataKey]))
      metadata[metadataKey] = [];
    metadata[metadataKey].push({ 
      key: propertyKey, 
      value: metadataValue, 
      index: parameterIndex, 
      type: 'method' 
    });
    setMetadata(target, 'easy:metadata', metadata);
  }
}