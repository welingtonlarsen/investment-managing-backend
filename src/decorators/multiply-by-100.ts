import { Transform } from 'class-transformer';
import {
  isNumber,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

function multiplyBy100(): PropertyDecorator {
  return Transform((params) => Math.round(params.value * 100));
}

export function MultiplyBy100(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isMultipliedBy100',
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
    multiplyBy100()(object, propertyName);
  };
}
