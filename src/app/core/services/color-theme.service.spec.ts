import {TestBed} from '@angular/core/testing';
import { ColorThemeService } from './color-theme.service';


describe('ColorThemeService', () => {
  let service: ColorThemeService;
  beforeEach(() => {
    service = TestBed.inject(ColorThemeService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeTheme method', () => {
    it('should set colorTheme property to the value from localStorage if it is valid', () => {
      localStorage.setItem('colorTheme', 'dark');
      service.initializeTheme();
      expect(service.colorTheme).toBe('dark');
    });

    it('should set colorTheme property to "light" if the value in localStorage is invalid', () => {
      localStorage.setItem('colorTheme', 'invalid-theme');
      service.initializeTheme();
      expect(service.colorTheme).toBe('light');
    });

    it('should set colorTheme property to "light" if there is no value in localStorage', () => {
      localStorage.removeItem('colorTheme');
      service.initializeTheme();
      expect(service.colorTheme).toBe('light');
    });

    it('should set data-theme attribute on document.documentElement', () => {
      localStorage.setItem('colorTheme', 'dark');
      service.initializeTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

     it('should add my-app-dark class to document.documentElement if theme is dark', () => {
      localStorage.setItem('colorTheme', 'dark');
      service.initializeTheme();
      expect(document.documentElement.classList.contains('my-app-dark')).toBe(true);
    });

    it('should remove my-app-dark class from document.documentElement if theme is light', () => {
      localStorage.setItem('colorTheme', 'light');
      service.initializeTheme();
      expect(document.documentElement.classList.contains('my-app-dark')).toBe(false);
    });
  });

  describe('switchTheme method', () => {
    it('should toggle colorTheme property between "light" and "dark"', () => {
      service.colorTheme = 'light';
      service.switchTheme();
      expect(service.colorTheme).toBe('dark');
      service.switchTheme();
      expect(service.colorTheme).toBe('light');
    });

    it('should update localStorage with the new theme', () => {
      service.colorTheme = 'light';
      service.switchTheme();
      expect(localStorage.getItem('colorTheme')).toBe('dark');
      service.switchTheme();
      expect(localStorage.getItem('colorTheme')).toBe('light');
    });

    it('should update data-theme attribute on document.documentElement', () => {
      service.colorTheme = 'light';
      service.switchTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      service.switchTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('setTheme method', () => {
    it('should set the theme in localStorage', () => {
      service.setTheme('dark');
      expect(localStorage.getItem('colorTheme')).toBe('dark');
      service.setTheme('light');
      expect(localStorage.getItem('colorTheme')).toBe('light');
    });
  });

});