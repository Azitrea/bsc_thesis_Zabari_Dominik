import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DynamicFormDirective } from './dynamic-form.directive';

describe('DynamicFormDirective', () => {
  let viewContainerRef: ViewContainerRef;
  let componentFactory: ComponentFactoryResolver;
  
  it('should create an instance', () => {
    const directive = new DynamicFormDirective(componentFactory, viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
