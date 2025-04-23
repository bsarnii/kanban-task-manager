import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { LayoutComponent } from '../../ui/layout/layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

type SignUpFormModel = {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  imports: [LayoutComponent, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export default class SignUpComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);

  model = signal<SignUpFormModel>({
    name: '',
    email: '',
    password: ''
  })

  signUpSuccess = signal(false);
  loading = signal(false);


    signUp(form:NgForm) {
      if(form.invalid) {
        return;
      }
      this.loading.set(true);
      this.authService.signUp(this.model(), (success:boolean) => {
        if(success){
          this.signUpSuccess.set(true);
        }
        this.loading.set(false);
      })

    }
}
