import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponents implements OnDestroy{
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closeSub : Subscription;

    authObs: Observable<AuthResponseData>;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form : NgForm) {
        if(!form.valid){return;}

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        if(this.isLoginMode){
            this.authObs = this.authService.login(email,password);
        }
        else{
            this.authObs = this.authService.signup(email,password);
        }
        this.authObs.subscribe((response) => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipe']);
            
        }, errorMessage => {
            console.log(errorMessage);
            this.isLoading = false;
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            
        })
        form.reset();   
    }
    onHandleError(){
        this.error = null;
    }

    private showErrorAlert(message: string) {
        // const alertCom = new AlertComponent();
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}