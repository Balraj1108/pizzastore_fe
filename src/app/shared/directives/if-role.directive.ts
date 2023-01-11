import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective{

  // the role the user must have
  @Input() set ifRole(roles: string[]) {
    this.authService.getUserLogged().subscribe(res => {
      for(let role of roles) {
      if(res?.ruoli?.find(ruolo => ruolo === role)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }
    })
  }

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

}
