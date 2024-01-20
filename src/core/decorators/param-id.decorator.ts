import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    console.log(
      '🚀 ~ file: param-id.decorator.ts:6 ~ Number(context.switchToHttp().getRequest().params.id):',
      Number(context.switchToHttp().getRequest().params.id),
    );
    return Number(context.switchToHttp().getRequest().params.id);
  },
);
