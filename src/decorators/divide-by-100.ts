import { Transform } from 'class-transformer';
import {
  isNumber,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

function divide(): PropertyDecorator {
  return Transform((params) => params.value / 100);
}

export function DivideBy100(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'divideBy100',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isNumber(value);
        },
      },
      async: false,
    });
    divide()(object, propertyName);
  };
}
