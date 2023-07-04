import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorage } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean = false;
  private userSub: Subscription;
  constructor(private dataStorageService: DataStorage,private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

}
